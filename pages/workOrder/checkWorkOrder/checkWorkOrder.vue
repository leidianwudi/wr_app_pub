<template>
	<view class="content" style="padding-bottom:150rpx;">
		<!-- 底部按钮组 -->
		<view class="footer_btn">
			<button type="primary" class="pass">通过审批</button>
			<button type="primary" class="refuse">驳回审批</button>
		</view>
		<!-- 工单详情信息 -->
		<view class="workOrder_info">
			<!-- 报备人的信息 -->
			<view class="people">
				<view class="title_box">报备人信息</view>
				<!-- 报备人 -->
				<view class="people_info">
<!-- 					<m-icon type="contact-filled" size="22px" color="#2F4056"></m-icon> -->
					<text>报备人：<text>{{name}}</text></text>
				</view>
				<!-- 报备人手机 -->
				<view class="people_info">
					<!-- <m-icon type="phone-filled" size="22px" color="#2F4056"></m-icon> -->
					<text>报备人手机：<text>{{phone}}</text></text>
				</view>
			</view>
			<!-- 数据信息 -->
            <view class="people">
				<view class="title_box">数据信息</view>
				<!-- 数据因子 -->
            	<view class="people_info">
					<text>数据因子：<text>{{name}}</text></text>            		
            	</view>
				<!-- 开始至结束时间 -->
            	<view class="people_info">
					<text>持续时间：<text>{{name}}</text></text>            		
            	</view>
				<!-- 报备信息 -->
				<view class="people_info">
					<text>报备信息：<text>{{name}}</text></text>					
				</view>
				<!-- 附件 -->
            	<view class="people_info">
					<text>附件：<text>{{name}}</text></text>            		
            	</view>
            </view>
		</view>
	</view>
</template>

<script>
import mIcon from "@/components/m-icon/m-icon.vue";
export default{
	components: {
		mIcon,
	},
	data() {
		return {
			name: "报备人",
			phone: "1843284732"
		}
	},
}
</script>

<style>
	.footer_btn{
		border-top:1px solid #e3e3e3;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		display:flex;
		align-items:center;
		height:150rpx;
		background:#fff;
	}
	.footer_btn>button{
		width:40%;
	}
	.pass{
		background:#009688;
	}
	.refuse{
		background:#FF5722;
	}
	.workOrder_info{
		padding:10rpx 30rpx;
		box-sizing:border-box;
		overflow:hidden;
	}	
	.people{
		margin-top:20rpx;
		display:flex;
		flex-direction:column;
		background:#fff;
		border-radius:7px;
	}
	.title_box{
		height:50rpx;
		border-bottom:1px dashed #e3e3e3;
		padding:10rpx 20rpx;
		font-size:14px;
		border-radius:7px;
		color:#01AAED;
	}
	.people_info{
		font-size:14px;
		padding:15rpx 20rpx;
	}
	.people_info>text{
		color:#949494;
	}
	.people_info>text text{
		color:#393939;
	}
</style>
