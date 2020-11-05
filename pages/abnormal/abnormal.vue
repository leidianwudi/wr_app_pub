<template>
	<view class="content">
<!-- 		<view class="enterprise_info">
			<view class="day" v-if="isAdmin == 1" style="margin-bottom: 10px;">
				<text>子服务器：</text>
				<picker :range="ZhgyServerNameList" @change="zhgyServerNameListChange" range-key="name">
					<input type="text" value="" v-model="nowZhgyServerName" :disabled="true"/>
				</picker>
			</view>
			<view class="day" v-if="isAdmin == 1" style="margin-bottom: 10px;">
				<text>企业名：</text>
				<picker :range="ZhgyEnterpriceNameList" @change="ZhgyEnterpriceNameListChange" range-key="name">
					<input type="text" value="" v-model="nowEnterpriceName" :disabled="true"/>
				</picker>
			</view>
			<view class="page_num" style="margin-bottom: 5px;">			
				<picker :range="rank" @change="nowRankSelect" range-key="lev">
					<input type="text" value="" v-model="nowRank" :disabled="true" class="rank_ipt"/>
				</picker>
				<button type="primary" @tap="getDataExceptionList">搜索</button>
			</view>
		</view> -->
		<view class="search_column" style="display:flex; align-items:center; justify-content: space-between;" v-if="isAdmin != 1">
			<text style="display: inline-block;width:40%;">每页条数：</text>
			<view class="search_ipt">
				<picker :range="rank" @change="nowRankSelect" range-key="lev">
					<input type="text" value="" v-model="nowRank" :disabled="true" class="rank_ipt"/>
				</picker>
			</view>
			<view class="sea_btn btn_style">
				<button type="default" @tap="getDataExceptionList(0)" hover-class="btn_hover" style="padding: 0;">查询</button>
			</view>
		</view>
		
		<view class="search_column" style="display:flex; align-items:center; justify-content: space-between;" v-if="isAdmin == 1">
			<text style="display: inline-block;width:40%;">子服务器：</text>
			<view class="search_ipt">
				<input type="text" value="" v-model="nowZhgyServerName" placeholder="选择子服务器" :disabled="true" @tap="openDrawer"/>
			</view>
			<view class="sea_btn btn_style">
				<button type="default" @tap="getDataExceptionList(0)" hover-class="btn_hover" style="padding: 0;">查询</button>
			</view>
		</view>
		
		<view class="info_lists">
			<scroll-view scroll-y="true" class="scroll">
				<block class="box">
					<view class="lists" v-for="(item, index) in tableList" :key="index">
						<view class="flex_row">
							<view class="">
								<text>{{item.zhgyServerName}}</text><text>({{item.zhgyEnterpriceName}})</text>
							</view>
							<view :class="item.state == 0 ? 'static_1' : 'static_2' ">{{item.state == 0 ? "待阅读" : "已阅读"}}</view>
							<view class="define" v-if="item.state == 0" @tap="confirmRead(item.id)">确认阅读</view>
						</view>
						
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

						
						<view class="flex_row flex_box">
							<view><text class="test_black">COD</text>：{{item.cod}}</view>
							<view class="">
								<text>{{item.createTime}}</text>
							</view>
							
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
<!-- 		<view class="pagination">
			<uni-pagination :total="total" show-icon="false" @change="getNowPage" :current="pageNum"></uni-pagination>
			<view class="page_skip">
				<view class="page_num">
					到第<input type="text" value="" v-model="current" />页
				</view>
				<view class="page_num">
					<button class="skip" @tap="pageJump">确定</button>
				</view>
			</view>
		</view> -->
		
		
		<tui-drawer mode="right" :visible="rightDrawer" @close="closeDrawer" style="z-index:999;">
			<view class="d-container">
						<view class="" style="width:100%; text-align: center; color:#F57341;"><text>数据异常</text></view>
						<view class="search_time">
							<view class="search_test">
								<text>子服务器</text>
							</view>
							<view class="">
								<picker :range="ZhgyServerNameList" @change="zhgyServerNameListChange" range-key="name">
									<input type="text" value="" v-model="selZhgyServerName" :disabled="true"/>
								</picker>
							</view>
						</view>
						<view class="search_time">
							<view class="search_test">
								<text>企业名</text>
							</view>
							<view class="">
								<picker :range="ZhgyEnterpriceNameList" @change="ZhgyEnterpriceNameListChange" range-key="name">
									<input type="text" value="" v-model="selEnterpriceName" :disabled="true"/>
								</picker>
							</view>
						</view>
						<view class="search_time">
							<view class="search_test">
								<text>每页条数</text>
							</view>
							<view class="">
								<picker :range="rank" @change="nowRankSelect" range-key="lev">
									<input type="text" value="" v-model="nowRank" :disabled="true" class="rank_ipt"/>
								</picker>
							</view>
						</view>
						<view class="search_btn btn_style">
							<button type="default" @tap="getDataExceptionList(0)" hover-class="btn_hover">确定</button>
						</view>
					</view>
		</tui-drawer>
		
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
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
import tuiDrawer from "@/components/tui-drawer/tui-drawer.vue";
import tuiLoadmore from "@/components/tui-loadmore/tui-loadmore.vue";
import tuiNomore from "@/components/tui-nomore/tui-nomore.vue";
export default{
	components:{
		tTable,
		tTh,
		tTr,
		tTd,
		tuiDatetime,
		tTdTime,
		tThTime,
		uniPagination,
		tuiDrawer,
		tuiLoadmore,
		tuiNomore
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
			isAdmin: null,  //判断是否是管理员
			
			
			rightDrawer: false,//抽屉开关
			selZhgyServerName: "",   //抽屉选中的子服务器
			selEnterpriceName: "",   //抽屉选中的企业名
			loadding: false, //加载数据提示
			pullUpOn: true,  //上拉加载数据
		}
	},
	onLoad(res) {
		this.isAdmin = res.isAdmin;
		if(this.isAdmin == 1) this.getNowDataNameList();  //获取子服务器列表和企业列表
	},
	methods:{
		//上拉刷新
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.getDataExceptionList(0);
				this.pullUpOn = true;
				this.loadding = false;
			}, 200)
		},
		
		//关闭抽屉
		closeDrawer(e) {
			this.rightDrawer = false;
		},
		//打开抽屉
		openDrawer() {
			
			this.rightDrawer = true;  //打开抽屉
			this.selZhgyServerName = this.nowZhgyServerName;  //获取子服务器
			this.selEnterpriceName = this.nowEnterpriceName;  //获取企业名
		},
		
		// 瞬时获取选中的子服务器
		zhgyServerNameListChange:function(e){
			this.selZhgyServerName = this.ZhgyServerNameList[e.detail.value].name;
		    this.nowZhgyServerName = this.ZhgyServerNameList[e.detail.value].name;
			this.saveNowServerNameInfo = this.ZhgyServerNameList[e.detail.value];
		},
		// 瞬时获取选中的企业名
		ZhgyEnterpriceNameListChange:function(e){
			this.selEnterpriceName = this.ZhgyEnterpriceNameList[e.detail.value].name;
		    this.nowEnterpriceName = this.ZhgyEnterpriceNameList[e.detail.value].name;
		},
		// 获取当前选中的每页条数
		nowRankSelect:function(e){
		    this.nowRank = this.rank[e.detail.value].lev;
			let nowPage = this.nowRank.substring(0, 2);
			this.limit = parseInt(nowPage);
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
		//获取数据异常列表  type 0:普通查询 1: 获取更多信息
		getDataExceptionList(type){
			this.closeDrawer();  //关闭抽屉
			let page = null;
			if(type == 0) page = 1;
			if(type == 1)
			{
				page = ++this.pageNum;
				this.loadding = true;
			}
			let _this = this;
			let data = {
				page: page,
				limit: this.limit,
				pc: storage.getMyInfo().pc
			}	
			if(!util.isEmpty(this.saveNowServerNameInfo)) data.serverId = this.saveNowServerNameInfo.id;
			if(!util.isEmpty(this.nowEnterpriceName)) data.enterpriceName =  this.nowEnterpriceName;
			uni.showLoading({
				title: "正在加载...",
				success() {
					api.DataExceptionList(data,(res)=>{
						let code = api.getCode(res);
						if(code == 0){
							let data = api.getData(res);
							if(util.isEmpty(data)){
								this.loadding = false;
								this.pullUpOn = false;
							}
							else{
								if(type == 0)
								{
									_this.tableList = data;
									uni.showToast({
										title: '刷新成功',
										icon: "none",
									});
									uni.stopPullDownRefresh();
								}
								else
								{
									_this.loadding = false;
									data.forEach((item) =>{
										_this.tableList.push(item);
									});
								}
							}
							
							_this.total = parseInt(res.data.count / _this.limit);//总页数
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
										_this.getDataExceptionList(0);
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
			this.getDataExceptionList(0);   //根据当前页数重新加载数据
		},
		//跳转页数
		pageJump(){
			if(this.pageNum == this.current) return;  //当跳转页数和当前页数一致时
			this.pageNum = this.current;  //获取输入的跳转页数
			this.getDataExceptionList(0);   //根据当前页数重新加载数据
		}
	},
	//上拉获取更多数据
	onReachBottom(){
		if (!this.pullUpOn) return;
		 this.getDataExceptionList(1);  //查询数据异常
	},
}
</script>

<style>
	.pagination{
		display: flex;
		flex-direction: column;
		/* height:180rpx; */
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
		padding: 30rpx 100rpx 4rpx;
		box-sizing: border-box;
		align-items: center;
		background: #fff;
		border-bottom:6px solid #e3e3e3;
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

	}
	
	
	
	
	
	
	/* 搜索栏 */
	input{
		border:none;
	}
	.search_column{
		display:flex;
		align-items: center;
		justify-content:center;
		font-size:16px;
		padding:20rpx 40rpx 10rpx;
		box-sizing:border-box;
		border-bottom:1px solid #808080;
		background-color: #fff;
	}
	.search_column input{
		text-align:left;
		font-size:14px;
	}
	.sea_btn button{
		font-size:12px;
		color:#fff;
		width:120rpx;
	}
	
	
	
	/* 抽屉 */
	.d-container{
		padding:50rpx;
		font-size:15px;
	}
	.search_time{
		margin-top:40rpx;
	}
	.search_test{
		margin-bottom:20rpx;
	}
	.d-container input{
		border-bottom:1px solid #808080;
		color:#808080;
	}
	.search_btn{
		margin-top:100rpx;
	}
	.search_btn button{
		font-size:14px;
		color:#fff;
		border-radius:10rpx;
		padding:0 !important;
	}
</style>
