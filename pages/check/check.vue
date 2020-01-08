<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class="search">
			<view class="search_box">
				<input type="text" value="" placeholder="请输入关键字" />
				<button>搜索</button>
			</view>
		</view>
		<!-- 查询出的信息 -->
		<view class="info" @tap="tocheckInfo">
			<text>{{main}}</text>
			<m-icon type="forward" color="#dcdcdc"></m-icon>
		</view>
	</view>
</template>

<script>
import mIcon from "@/components/m-icon/m-icon.vue";
export default {
	components: {
		mIcon
	},
	data() {
		return {
			main: '福建环保工程投资有限公司111111111111111111'
		}
	},
	methods:{
		tocheckInfo(){
			uni.navigateTo({
			   url:'/pages/check/checkInfo/checkInfo'
			})
		}
	}
}
</script>

<style>
	.search{
		background:#fff;
		padding:30rpx 40rpx;
		box-sizing:border-box;
		border-bottom:1px solid #e8e8e8;		
	}
	.search_box{
		display:flex;
	}
	.search_box>input{
		border:1px solid #e8e8e8;
		width:75%;
	    height:50rpx;
		padding-left:15rpx;
		box-sizing:border-box;
		font-size:13px;
	}
	.search_box>button{
		width:25%;
        height:50rpx;
		padding:0;
		border:none;
		background:#2e7bfd;
		border-radius:0;
		font-size:14px;
		color:#fff;
		line-height:55rpx;
	}
	.info{
		background:#fff;
		display:flex;
		justify-content:space-between;
		align-items:center;
		padding:20rpx;
		box-sizing:border-box;
	}
	.info>text{
		font-size:15px;
		width:85%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
</style>
