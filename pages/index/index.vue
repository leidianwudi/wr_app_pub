<template>
	<view class="content" style="background:#fff;">
		<view class="user">
			<text v-if="!admin">欢迎用户：{{userEn.nickName}}</text>
			<text v-if="admin">欢迎管理员：{{userEn.nickName}}</text>			
		</view>
		<!-- 未读信息 -->
		<view class="head_bar">
			<view class="work_order">
				<view class="head_barImg">
					<image src="/static/img/work_order.png" mode="widthFix" @tap="toworkOrder"></image>
				</view>
				<text>待处理工单</text>
				<tui-badge :type="msgNum>0 ? 'danger':'gray'" :dot="false">{{msgNum}}</tui-badge>			
			</view>
			<view class="report">
				<view class="head_barImg">
					<image src="/static/img/report.png" mode="widthFix"></image>
				</view>
				<text>运行的子服务器数：</text>
				<text class="serverRunCount">{{serverRunCount}}</text>
			</view>
		</view>
		<!-- 公告 -->
		<view class="Notice" v-if="msgNum != 0">
			<view class="boder-bottom notice_bar">
				<view class="Notice_img">
					<image src="/static/img/warn.png" mode="widthFix"></image>
				</view>
				<text class="test_red">告警：</text>
				<view class='tui-notice-board'>
					<view class="tui-scorll-view" @tap='detail'>
						<view class="tui-notice" :class="[animation?'tui-animation':'']" v-if="admin">您有{{msgNum}}条待处理工单，请及时处理！</view>
						<view class="tui-notice" :class="[animation?'tui-animation':'']" v-if="!admin">您有{{msgNum}}条工单正在进行处理。</view>						
					</view>
				</view>
			</view>
			<view class="notice_bar" v-if="false">
				<view class="Notice_img">
					<image src="/static/img/notice.png" mode="widthFix"></image>
				</view>
				<text class="test_blue">公告：</text>{{notice}}
			</view>
		</view>
		<!-- 按钮 -->
		<view class="btn_bar">
			<view class="boder-righr btn_box" @tap="toCheck">
				<view class="btn btn_shuju">
					<m-icon type="search" color="#fff" size="32"></m-icon>
				</view>
				<text>数据调阅</text>
			</view>
			<view class="boder-righr btn_box" @tap="toworkOrder">
				<view class="btn btn_guanli">
					<m-icon type="compose" color="#fff" size="32"></m-icon>
				</view>
				<text>工单管理</text>
			</view>
			<view class="btn_box" @tap="toAbnormal">
				<view class="btn btn_yichang">
					<m-icon type="locked" color="#fff" size="32"></m-icon>
				</view>
				<text>数据异常</text>
			</view>
			<view class="boder-righr btn_box" @tap="toResort" v-if="!admin">
				<view class="btn btn_baobei">
					<m-icon type="gear" color="#fff" size="32"></m-icon>
				</view>
				<text>现场报备</text>
			</view>
			<view class="boder-righr btn_box" @tap="toExit">
				<view class="btn btn_exit">
					<m-icon type="info" color="#fff" size="32"></m-icon>
				</view>
				<text>退出登录</text>
			</view>
		</view>
		
		<view class="data_box">
			<view class="data_bar data_title">
				<view class="data_test data_title">
					最新一条数据：
				</view>
				<view class="data_title">
					<view class="data_title">
						<view class="static_g"></view>
						<text>在线</text>
					</view>
					<view class="data_title">
						<view class="static_g static_w"></view>
						<text>离线</text>
					</view>
				</view>
			</view>
			
			<view class="data_show">
				<view class="data_info">
					<view class="info_type">时间：</view>
					<view class="">{{dataTime}}</view>
				</view>
				
				<view class="data_info">
					<view class="info_type">子服务器：</view>
					<view class="">{{dataServer}}</view>
				</view>
				
				<view class="data_info">
					<view class="info_type">企业：</view>
					<view class="">{{dataEnterpriceName}}</view>
				</view>
				
				<view class="data_info">
					<view class="info_type">累计：</view>
					<view class="">{{dataAddWater}}</view>
				</view>
				
				<view class="data_info">
					<view class="info_type">配额：</view>
					<view class="">{{dataAmount}}</view>
				</view>
				<view class="data_info">
					<view class="info_type">COD：</view>
					<view class="">{{COD}}</view>
				</view>
				<view class="data_info">
					<view class="info_type">氨氮：</view>
					<view class="">{{anDan}}</view>
				</view>
				<view class="data_info">
					<view class="info_type">PH：</view>
					<view class="">{{PH}}</view>
				</view>
				<view class="data_info">
					<view class="info_type">SS：</view>
					<view class="">{{SS}}</view>
				</view>
				<view class="data_info">
					<view class="info_type">余氯：</view>
					<view class="">{{yuLv}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tuiBadge from "@/components/badge/badge";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import mIcon from "@/components/m-icon/m-icon.vue";
import storage from '@/api/storage.js';
import api from "@/api/api.js";
import tranNowList from "@/api/tranNowList.js";
export default {
	components: {
		uniNavBar,
		mIcon,
		tuiBadge
	},
	data() {
		return {
			msgNum: 0,  //待处理工单数
			warn: '',  // 告警文字
			notice: '', //公告文字
			admin: false, //
			userEn: null,
			serverRunCount: 0, //运行的子服务器数
			animation: false,  //跑马灯消息开关
			dataTime: "",  //时间
			dataServer: "",  //子服务器名
			dataEnterpriceName: "",  //企业名
			dataAddWater: "",  //累计
			dataAmount: "",  //配额
			COD: "",  //COD
			anDan: "",//氨氮
			PH:"",//PH
			SS:"",
			yuLv:"",//余氯
			tableList: null //最新一条数据
		}
	},
	onLoad() {
		this.isAdmin();//判断是否为管理员
		this.userEn = storage.getMyInfo();
		this.getNowDataList();
		setTimeout(() => {
			this.animation = true
		}, 600)
	},
	onShow(){
		this.getDrHandleAndServerRun();
	},
	methods:{
		//获取最新一条瞬时数据
		getNowDataList(){
			let _this = this;
			let data = {
				page: 1,
				limit: 200,
				pc: storage.getMyInfo().pc
			}
			api.NowDataList(data, res=>{
				let data1 = api.getData(res);
				let code = api.getCode(res);
				if(code === 0){
					_this.tableList = tranNowList.tranNowList(data1)[0];
					_this.dataTime = _this.tableList.time;
					_this.dataServer = _this.tableList.zhgyServerName;
					_this.dataEnterpriceName = _this.tableList.enterpriceName;
					_this.dataAddWater = _this.tableList.addWater;
					_this.dataAmount = _this.tableList.dayAmount;
					_this.COD = _this.tableList.COD;
					_this.anDan = _this.tableList.anDan;
					_this.PH = _this.tableList.PH;
					_this.SS = _this.tableList.SS;
					_this.yuLv = _this.tableList.yuLv;
				}
			});
		},
		//退出登录
		toExit(){
			uni.showModal({
				title: "退出登录",
				content: "您确定要退出？",
				success(res) {
					if(res.confirm){
						storage.outLogin();
						uni.reLaunch({
							url: '/pages/user/login/login'
						});
					}
				}
			})
		},
		//获取待处理数据报错和子服务器数
		getDrHandleAndServerRun(){
			let _this = this;
			api.getDrHandleAndServerRun({pc: this.userEn.pc},res=>{
				let code = api.getCode(res);
				let data = api.getData(res);
				if(code ===0){
					_this.serverRunCount = data.serverRunCount;
					_this.msgNum = data.drHandleCount;
				}
			});
		},
		//进入数据异常界面(普通用户与管理员的界面不同)
		toAbnormal(){
			if(this.admin){
				uni.navigateTo({
					url:'/pages/abnormal/abnormal?isAdmin=1'
				})
			}else{
				uni.navigateTo({
					url:'/pages/abnormal/abnormal?isAdmin=0'
				})
			}
		},
		//进入报备 or 查看页面
		toCheck(){
			if(this.admin){
				uni.navigateTo({
					// url:'/pages/checkAdminInfo/checkAdminInfo'   
					url: '/pages/checkAdminInfo/concise/concise'
				})
			}else{
				uni.navigateTo({
					// url:'/pages/checkInfo/checkInfo'
					url: '/pages/checkInfo/concise/concise'
				})
			}
		},
		//判断是否为管理员
		isAdmin(){
			if(storage.getMyInfo().isAdmin === 1) this.admin = true;
			else this.admin = false;
		},
		toResort(){
			uni.navigateTo({
				url:'/pages/report/report'
			})
		},
		toworkOrder(){
			uni.navigateTo({
				url:'/pages/workOrder/workOrder'
			})
		},
		toadmin(){
			uni.navigateTo({
				url:'/pages/checkAdminInfo/checkAdminInfo'
			})
		}
	}
}
</script>

<style>
	.data_title{
		display:flex;
		justify-content:space-between;
		align-items: center;
		font-size:15px;
	}
	.data_bar{
		padding:20rpx;
		background:#F2F3F5;
	}
	.data_show{
		padding:40rpx 40rpx 0;
	}
	.static_g{
		width:20rpx;
		height:20rpx;
		background:#13CE67;
		margin-right:10rpx;
		margin-left:20rpx;
	}
	.static_w{
		background:#E5E9F2;
	}
	.data_info{
		padding:20rpx 10rpx;
		border-bottom:1px solid #EEEEF0;
		display:flex;
		font-size:15px;
	}
	.data_info>view{
		width:50%;
	}
	.info_type{
		color:#62ABD1;
	}
	image{
		width:100%;
		height:auto;
	}
	.user{
		font-size:15px;
		padding:10rpx;
	}
	.head_bar{
		width:100%;
		display:flex;
		flex-direction:row;
		padding:30rpx;
		box-sizing:border-box;
		background:#4f7ddd;
		margin-bottom:20rpx;
	}
	.work_order{
		border-right:1px solid #fff;
	}
	.work_order, .report{
		width:50%;
		text-align:center;
		color:#fff;
		font-size:14px;
		height:auto;
	}
	.head_barImg{
		width:100rpx;
		height:100rpx;
		margin:0 auto;
		margin-bottom:25rpx;
	}
	.tui-badge-class{
		display:inline-block;
		margin-left:15rpx;
	}
	.Notice{
		margin-top:20rpx;
		margin-bottom:20rpx;
		width:100%;
		background:#fff;
		border-top:1px solid #dcdcde;
	}
	.boder-bottom{
		border-bottom:1px solid #dcdcde;
	}
	.Notice_img{
		width:60rpx;
		height:70rpx;
	}
	.notice_bar{
		padding:15rpx 0 15rpx 15rpx;
		box-sizing:border-box;
		display:flex;
		align-items:center;
		font-size:15px;
	}
	.notice_bar>text{
		font-weight:bold;
	}
	.test_red{
		color:#da2e2a;
	}
	.test_blue{
		color:#367fdd;
	}
	.btn_bar{
		width:100%;
		display:flex;
		flex-wrap:wrap;
		border-top:1px solid #dcdcde;
		margin-bottom:20rpx;
	}
	.btn_bar>view{
		width:33.2%;
		background:#fff;
		display:flex;
		justify-content:center;
		align-items:center;
		padding:20rpx 0;
		box-sizing:border-box;
		flex-shrink: 0;
	}
	.boder-righr{
		border-right:1px solid #dcdcde;
	}
	.btn_box{
		display:flex;
		flex-direction:column;
		border-bottom:1px solid #dcdcde;
	}
	.btn{
		width:100rpx;
		height:100rpx;
		border-radius:18px;
		display:flex;
		justify-content:center;
		align-items:center;		
	}
	.btn_shuju{
		background:#f781b5;
	}
	.btn_baobei{
		background:#8CC773;
	}
	.btn_guanli{
		background:#f89959;
	}
	.btn_yichang{
		background:#FFB800;
	}
	.btn_exit{
		background:#53b2f2;
	}
	.btn_box>text{
		margin-top:10rpx;
		color:#2E2E2E;
		font-size:15px;
	}
	.serverRunCount{
		font-weight:bold;
	}
	.tui-notice-board {
		width: 79%;
		padding-right: 30upx;
		box-sizing: border-box;
		font-size: 28upx;
		height: 60upx;
		display: flex;
		align-items: center;
	}
	.tui-scorll-view {
		flex: 1;
		line-height: 1;
		white-space: nowrap;
		overflow: hidden;
		color: #f54f46;
	}
	
	.tui-notice {
		transform: translateX(100%);
	}
	
	.tui-animation {
		-webkit-animation: tui-rolling 12s linear infinite;
		animation: tui-rolling 12s linear infinite;
	}
	@-webkit-keyframes tui-rolling {
		0% {
			transform: translateX(100%);
		}
	
		100% {
			transform: translateX(-170%);
		}
	}
	
	@keyframes tui-rolling {
		0% {
			transform: translateX(100%);
		}
	
		100% {
			transform: translateX(-170%);
		}
	}
</style>
