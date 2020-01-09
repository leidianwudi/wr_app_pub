<template>
	<view class="">
<!-- 		自定义导航栏 -->
		<uni-nav-bar background-color="#4f80df" color="#fff">
			<view slot="default" class="content">
				<input type="text" value="" />
				<m-icon type="search" class="search_icon"></m-icon>
				<m-icon type="scan" class="scan_icon"></m-icon>
			</view>
		</uni-nav-bar>	
		<!-- 未读信息 -->
		<view class="head_bar">
			<view class="work_order">
				<view class="head_barImg">
					<image src="/static/img/work_order.png" mode="widthFix" @tap="toworkOrder"></image>
				</view>
				<text>待处理工单<tui-badge :type="level==2?'gray':'danger'" :dot="level==3?true:false" v-if="msgNum>0">{{level!=3?msgNum:""}}</tui-badge></text>
			</view>
			<view class="report">
				<view class="head_barImg">
					<image src="/static/img/report.png" mode="widthFix" @tap="toResort"></image>
				</view>
				<text>待处理报备</text>
				<tui-badge :type="level==2?'gray':'danger'" :dot="level==3?true:false" v-if="msgNum>0">{{level!=3?msgNum:""}}</tui-badge>
			</view>
		</view>
		<!-- 公告 -->
		<view class="Notice">
			<view class="boder-bottom notice_bar">
				<view class="Notice_img">
					<image src="/static/img/warn.png" mode="widthFix"></image>
				</view>
				<text class="test_red">告警：</text>{{warn}}
			</view>
			<view class="notice_bar">
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
			<view class="boder-righr btn_box" @tap="toResort">
				<view class="btn btn_baobei">
					<m-icon type="gear" color="#fff" size="32"></m-icon>
				</view>
				<text>现场报备</text>
			</view>
			<view class="btn_box" @tap="toworkOrder">
				<view class="btn btn_guanli">
					<m-icon type="compose" color="#fff" size="32"></m-icon>
				</view>
				<text>工单管理</text>
			</view>
		</view>
		
		<button type="primary" class="exit_btn" @tap="exit">退出登录</button>
	</view>
</template>

<script>
import tuiBadge from "@/components/badge/badge";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import mIcon from "@/components/m-icon/m-icon.vue";
import storage from '@/api/storage.js';
export default {
	components: {
		uniNavBar,
		mIcon,
		tuiBadge
	},
	data() {
		return {
			level: 1,
			msgNum: 3,
			warn: '无',
			notice: '......................'
		}
	},
	methods:{
		toCheck(){
			if(storage.getMyInfo().isAdmin === 1){
				uni.navigateTo({
					url:'/pages/checkAdminInfo/checkAdminInfo'
				})
			}else{
				uni.navigateTo({
					url:'/pages/checkInfo/checkInfo'
				})
			}
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
		},
		exit(){
			storage.outLogin();
			uni.reLaunch({
				url: '/pages/user/login/login'
			});
		}
	}
}
</script>

<style>
	image{
		width:100%;
		height:auto;
	}
	.content{
       width:100%;
       position:relative;
	   background:#4f80df;
	}
	.content>input{
		width:100%;
		height:80%;
		background:#7196e4;
		border-radius:13px;
		padding:8rpx 0;
		padding-left:90rpx;
		box-sizing:border-box;
	}
	.search_icon{
		position:absolute;
		top:3px;
		left:20px;
	}
	.scan_icon{
		position:absolute;
		right:20px;
		top:3px;
	}
	.head_bar{
		width:100%;
		display:flex;
		flex-direction:row;
		padding:30rpx;
		box-sizing:border-box;
		background:#4f7ddd;
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
		border-bottom:1px solid #dcdcde;
	}
	.boder-bottom{
		border-bottom:1px solid #dcdcde;
	}
	.Notice_img{
		width:60rpx;
		height:70rpx;
	}
	.notice_bar{
		padding:15rpx;
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
	}
	.btn_bar>view{
		width:33.2%;
		background:#fff;
		display:flex;
		justify-content:center;
		align-items:center;
		padding:20rpx 0;
		box-sizing:border-box;
	}
	.boder-righr{
		border-right:1px solid #dcdcde;
	}
	.btn_box{
		display:flex;
		flex-direction:column;
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
		background:#53b2f2;
	}
	.btn_guanli{
		background:#f89959;
	}
	.btn_box>text{
		margin-top:10rpx;
		color:#2E2E2E;
		font-size:15px;
	}
	.exit_btn{
		position:absolute;
		bottom:100rpx;
		left:50%;
		transform: translateX(-50%);
		width:70%;
	}
</style>
