<template>
	<view class="content">
		<!-- 工单详情信息 -->
		<view class="workOrder_info">
			<!-- 查看报错信息 -->
			<view class="people">
				<view class="title_box">处理信息</view>
				<!-- 当前状态 -->
				<view class="people_info">
					<text>处理操作：</text>
					<view class="info">
						<checkbox-group>
							<label>
							    <checkbox value="cb"/>
								<text>待处理</text>
							</label>
							<label>
							    <checkbox value="cb"/>
								<text>处理完成</text>
							</label>
							<label>
							    <checkbox value="cb"/>
								<text>处理终止</text>
							</label>							
						</checkbox-group>
					</view>
				</view>
				<!-- 处理反馈 -->
				<view class="people_info">
					<text>处理反馈：<textarea :value="state_msg" placeholder="" class="textarea_box" autoHeight="true"/></text>
				</view>
				<view class="people_info">
					<button type="primary" class="submit" @tap="submit">确认处理</button>
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
			phone: "1843284732",
			state_msg: '测试111111111111111111111111111111111111111111111111111111111111111111111111111111111',
			state:"处理完成",
			starTime: '2020-01-15 00:00:00',
			endTime:  '2020-01-15 00:00:00',
			inputMsg:'1'
		}
	},
	methods:{
		//提交处理
		submit(){
			uni.navigateBack({
				delta: 1
			})
		}
	}
}
</script>

<style>
	text{
		word-wrap: break-word;
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
		padding:15rpx 20rpx 30rpx;
	}
	.people_info>text{
		/* color:#949494; */
		color:#000;
	}
	.people_info>text text{
		color:#393939;
	}
	.textarea_box{
		margin-top:10rpx;
		border:1px solid #E6E6E6;
		padding:0 20rpx;
		box-sizing:border-box;
		color:#000000;
	}
	.submit{
		width:40%;
		font-size:14px;
		background:#009688;
	}
	.info checkbox-group{
		display:flex;
		justify-content:flex-start;
		flex-wrap: wrap;
		font-size:15px;
		margin-top:20rpx;
	}
	.info label{
		margin-top:20rpx;
	}
	.info text{
		margin-left:10rpx;
		margin-right:20rpx;
	}
</style>

