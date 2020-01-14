<template>
	<view class="content">
		<view class="info">
			<view class=""><text>账号：</text><text>{{userName}}</text></view>
			<view class=""><text>用户：</text><text>{{userNick}}</text></view>		
		</view>
		<button type="primary" class="exit_btn" @tap="exit">退出登录</button>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
export default{
	data() {
		return {
			userNick: null ,
			userName: null
		}
	},
	methods:{
		exit(){
			storage.outLogin();
			uni.reLaunch({
				url: '/pages/user/login/login'
			});
		}
	},
	onLoad() {
		this.userNick = storage.getMyInfo().nickName;
		this.userName = storage.getMyInfo().userName;
	}
}
</script>

<style>
	.exit_btn{
		margin-top:100rpx;
		width:70%;
	}
	.info{
		width:100%;
		display: flex;
		flex-direction:column;
		margin-top:100rpx;
	}
	.info>view{
		width:100%;
		display:flex;
		justify-content:flex-start;
		font-size:17px;
		font-weight:bold;
		margin-top:50rpx;
		position:relative;
		left:50%;
		transform:translateX(-30%);
	}
	.info>view>text{
		margin-left:30rpx;
	}
</style>
