<template>
	<view class="content" style="padding-bottom:250rpx;">
		<view class="enterprise_info">
			<view class="day">
				<text>子服务器名：</text>
				<picker :range="ZhgyServerNameList" @change="zhgyServerNameListChange" range-key="name">
					<input type="text" value="" v-model="nowZhgyServerName" :disabled="true"/>
				</picker>
			</view>
			<view class="day">
				<text>企业名：</text>
				<picker :range="ZhgyEnterpriceNameList" @change="ZhgyEnterpriceNameListChange" range-key="name">
					<input type="text" value="" v-model="nowEnterpriceName" :disabled="true"/>
				</picker>
			</view>
			<button type="primary" @tap="getDataExceptionList">搜索</button>
		</view>
		<view class="info_lists">
			<scroll-view scroll-y="true" class="scroll">
				<block class="box">
					<!-- <t-table>
						<t-tr>
							<t-th>操作</t-th>
							<t-th>子服务器</t-th>
							<t-th>企业</t-th>
							<t-th-time>时间</t-th-time>
							<t-th>状态</t-th>
							<t-th>瞬时流量</t-th>
							<t-th>COD</t-th>
							<t-th>氨氮</t-th>
							<t-th>SS</t-th>
							<t-th>PH</t-th>
						</t-tr>
						<t-tr v-for="(item, index) in tableList" :key="index">
							<t-td>确认阅读</t-td>
							<t-td>{{ item.zhgyServerName }}</t-td>
							<t-td>{{ item.enterpriceName }}</t-td> -->
							<!-- <t-td-time>{{ item.time }}</t-td-time> --> <!-- 时间 -->
							<!-- <t-td>状态</t-td> -->
							<!-- <t-td>{{ item.nowWater }}</t-td> -->  <!-- 瞬时流量 -->
							<!-- <t-td>{{ item.COD }}</t-td> -->
							<!-- <t-td>{{ item.anDan }}</t-td> -->  <!-- 氨氮 -->
<!-- 							<t-td>{{ item.SS }}</t-td>							
							<t-td>{{ item.PH }}</t-td>
						</t-tr>
					</t-table> -->
					<view class="lists" v-for="(item, index) in tableList" :key="index">
						<view class="flex_row">
							<view class="">
								<text class="test_black">子服务器</text>：<text>{{item.zhgyServerName}}</text>
							</view>
							<view :class="item.state == 0 ? 'static_1' : 'static_2' ">{{item.state == 0 ? "待阅读" : "已阅读"}}</view>
						</view>
						
						<view class=""><text class="test_black">企业名称</text>：{{item.zhgyEnterpriceName}}</view>
						
						<view class="flex_row flex_box">
							<view class="">
								<text class="test_black">瞬时流量</text>：<text>{{item.ll}}</text>
							</view>
							<view class="">
								<text class="test_black">PH</text>：<text>{{item.ph}}</text>
							</view>
						</view>
						
						<view class="flex_row flex_box">
							<view class="">
								<text space="emsp" decode="true" class="test_black">氨&emsp;&emsp;氮</text>：<text>{{item.ad}}</text>
							</view>
							<view class="">
								<text class="test_black">SS</text>：<text>{{item.ss}}</text>
							</view>
						</view>
						
						<view class=""><text class="test_black">COD</text>：{{item.cod}}</view>
						
						<view class="flex_row">
							<view class="">
								<text class="test_black">时间</text>：<text>{{item.createTime}}</text>
							</view>
							<view class="define" v-if="item.state == 0" @tap="confirmRead(item.id)">确认阅读</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="pagination">
			<uni-pagination :total="total" show-icon="false" @change="getNowPage" :current="pageNum"></uni-pagination>
			<view class="page_skip">
				<view class="page_num">
					到第<input type="text" value="" v-model="current" />页
				</view>
				<view class="page_num">
					<button class="skip" @tap="pageJump">确定</button>
				</view>
			</view>
			<view class="page_num">
				<view class="">
					共<text class="info_num">{{infoNum}}</text>条
				</view>
				<picker :range="rank" @change="nowRankSelect" range-key="lev">
					<input type="text" value="" v-model="nowRank" :disabled="true" class="rank_ipt"/>
				</picker>
			</view>	
		</view>
	</view>
</template>

<script>
import api from '@/api/api.js';
import storage from '@/api/storage.js';
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tThTime from '@/components/t-table/t-th-time.vue';
import tTdTime from '@/components/t-table/t-td-time.vue';
import tTd from '@/components/t-table/t-td.vue';
import tuiDatetime from "@/components/dateTime/dateTime";
import uniPagination from '@/components/uni-pagination/uni-pagination.vue';
import util from "@/common/util.js";
export default{
	components:{
		tTable,
		tTh,
		tTr,
		tTd,
		tuiDatetime,
		tTdTime,
		tThTime,
		uniPagination
	},
	data() {
		return {
			ZhgyServerNameList: [],		//子服务器列表
			ZhgyEnterpriceNameList: [],	//企业列表
			rank: [
				{"lev": "10条/页"},
				{"lev": "20条/页"},
				{"lev": "30条/页"},
				{"lev": "40条/页"},
				{"lev": "50条/页"},
				{"lev": "60条/页"},
				{"lev": "70条/页"},
				{"lev": "80条/页"},
				{"lev": "90条/页"},
			],  //每页条数选项
			nowZhgyServerName: "" ,		//子服务器搜索框
			nowEnterpriceName: "" ,		//企业搜索框
			saveNowServerNameInfo: null,  	//保存被选中的子服务器信息
			tableList: [],  //数据异常列表
			total: 1, //总页数
			pageNum: 1, //当前页数
			infoNum: null, //数据总量数
			nowRank: "10条/页",  //当前选中的每页条数
			limit: 10, //每页获取数据条数
			current: 1, //跳转页数
		}
	},
	onLoad() {
		this.getNowDataNameList();  //获取子服务器列表和企业列表
		this.getDataExceptionList();  //获取数据异常列表
	},
	methods:{
		// 瞬时获取选中的子服务器
		zhgyServerNameListChange:function(e){
		    this.nowZhgyServerName = this.ZhgyServerNameList[e.detail.value].name;
			this.saveNowServerNameInfo = this.ZhgyServerNameList[e.detail.value];
		},
		// 瞬时获取选中的企业名
		ZhgyEnterpriceNameListChange:function(e){
		    this.nowEnterpriceName = this.ZhgyEnterpriceNameList[e.detail.value].name;
		},
		// 获取当前选中的每页条数
		nowRankSelect:function(e){
		    this.nowRank = this.rank[e.detail.value].lev;
			let nowPage = this.nowRank.substring(0, 2);
			this.limit = parseInt(nowPage);
			this.getDataExceptionList();
		},
		//获取子服务器列表和企业列表
		getNowDataNameList(){
			let _this = this;
			let data1 = {
				size: 100,
				pc: storage.getMyInfo().pc 
			};
			api.NowDataZhgyServerList(data1,res=>{
				let data = api.getData(res);
				let code = api.getCode(res);
				if(code === 0){
					_this.ZhgyServerNameList = data;
				}
			});
			api.NowDataZhgyEnterpriceList(data1,res=>{
				let data = api.getData(res);
				let code = api.getCode(res);
				if(code === 0){
					_this.ZhgyEnterpriceNameList = data;;
				}
			});
		},
		//获取数据异常列表
		getDataExceptionList(){
			let _this = this;
			let data = {
						page: _this.pageNum,
						limit: _this.limit,
						pc: storage.getMyInfo().pc
			}	
			if(!util.isEmpty(this.saveNowServerNameInfo)) data.serverId = this.saveNowServerNameInfo.id;
			uni.showLoading({
				title: "正在加载...",
				success() {
					api.DataExceptionList(data,(res)=>{
						let code = api.getCode(res);
						if(code == 0){
							let data = api.getData(res);
							_this.tableList = data;
							_this.total = parseInt(res.data.count);
							_this.infoNum = res.data.count;
							uni.hideLoading();
						}
					})
				}
			})
		},
		//确认阅读
		confirmRead(id){
			let _this  =  this;
			uni.showModal({
				title: "确认阅读",
				content: "确认已阅读数据？",
				success: function (res) {
				    if (res.confirm) {
				        api.ViewDataException({
							id: id,
							pc: storage.getMyInfo().pc 
						}, (res)=>{
							let code = api.getCode(res);
							let msg = api.getMsg(res);
							if(code == 0){
								uni.showToast({
									title: msg,
									duration: 2000,
									success() {
										_this.getDataExceptionList();
									}
								})
							}else{
								uni.showToast({
									title: msg,
									duration: 2000
								})
							}
						});
				    }
				}
			})
		},
		//获取当前页数
		getNowPage(e){
			this.pageNum = e.current;  //获取当前页数
			this.getDataExceptionList();   //根据当前页数重新加载数据
		},
		//跳转页数
		pageJump(){
			if(this.pageNum == this.current) return;  //当跳转页数和当前页数一致时
			this.pageNum = this.current;  //获取输入的跳转页数
			this.getDataExceptionList();   //根据当前页数重新加载数据
		}
	}
}
</script>

<style>
	.pagination{
		height:250rpx;
		position:fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background:#fff;
	}
	.enterprise_info {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content:center;
		padding: 40rpx 100rpx;
		box-sizing: border-box;
		align-items: center;
		background: #fff;
		border-bottom:10px solid #e3e3e3;
	}
	.date {
		text-align:center;
		background: #e6b16b;
		width: 160rpx;
		height: 50rpx;
		line-height:50rpx;
		font-size: 14px;
		color: #fff;
		border-radius: 5px;
		padding: 15rpx 20rpx;
		margin: 0 auto;
	}

	.enterprise_name {
		margin-top: 20rpx;
		font-size:17px;
		font-weight:bold;
		color:#393D49;
	}

	.info_lists {
		background: #fff;
		overflow: hidden;
	}
	.lists{
		padding:20rpx;
		font-size:14px;
		display:flex;
		flex-direction: column;
		color:#808080;
		border-bottom:1px solid #e3e3e3;
	}
	.lists>view{
		margin-bottom:10rpx;
	}
	.static_1{
		color: #FF5722;
		font-weight:bold;
	}
	.static_2{
		color: #C9C9C9;
		font-weight:bold;
	}	
	.test_black{
		color:#000;
	}
	.flex_row{
		display:flex;
		justify-content:space-between;
		align-items:center;
	}
	.flex_box>view{
		width:50%;
	}
	.define{
		background:#009688;
		padding:10rpx;
		color:#fff;
		border-radius:5px;
		font-size:12px;
	}
	.scroll {
		overflow: hidden;
		white-space: nowrap;
		width: 100%;
	}
	.position{
		font-size:16px;
		color:#01AAED;
		margin-top:10rpx;
	}
	.box{
		width:100%;
		background:#e3e3e3;
		display:inline-block;
		vertical-align:top;
	}
	.scrollbox{
		white-space: nowrap;
	}
	input{
		border: 1px solid #e1e1e1;
		padding-left:10rpx;
	}
	button{
		background:#009688;
		font-size:14px;
		margin:0 auto;
		width:200rpx;
	}
	.day, .month{
		display:flex;
		flex-direction:row;
		align-items:center;
		justify-content:space-between;
		font-size:15px;
		width:100%;
		margin-bottom:40rpx;
	}
	.day>button, .month>button{
		font-size:12px;
	}
	.page_skip{
		display:flex;
		font-size:16px;
		align-items:center;
		justify-content: space-between;
		width:50%;
		margin:0 auto;
	}
	.page_num{
		display: flex;
		align-items:center;
		justify-content: center;
		font-size:16px;
		margin-bottom:20rpx;
	}
	.page_skip input{
		width:50rpx;
		margin:0 20rpx;
	}
	.skip{
		background:#fff;
		color:#000;
		width:120rpx;
		padding:0;
	}
	.info_num{
		margin:0 10rpx;
		font-size:14px;
		font-weight:bold;
	}
	.rank_ipt{
		width:140rpx;
		text-align:center;
		margin-left:20rpx;
	}
</style>
