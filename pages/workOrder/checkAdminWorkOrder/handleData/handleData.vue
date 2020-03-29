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
						<radio-group @change="getState">
							<label class="radio"><radio value="0" :checked="state == 0"/>待处理</label>
							<label class="radio"><radio value="1" :checked="state == 1"/>处理完成</label>
							<label class="radio"><radio value="2" :checked="state == 2" />处理终止</label>							
						</radio-group>
					</view>
				</view>
				<!-- 处理反馈 -->
				<view class="people_info">
					<text>处理反馈：</text>
					<textarea v-model="state_msg" placeholder=" " class="textarea_box" autoHeight="true"/>
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
import storage from '@/api/storage.js';
import api from '@/api/api.js';
import tran from '@/common/tran.js';
export default{
	components: {
		mIcon,
	},
	data() {
		return {
			id: null,
			userEn: null,
			operationType: null,
			state_msg: '',  //处理反馈
			state: 0 //处理操作
		}
	},
	onLoad(res) {
		this.id = res.id;
		this.operationType = res.operationType;
		this.userEn = storage.getMyInfo();
		this.state = parseInt(res.state);
		this.state_msg = res.state_msg;
	},
	methods:{
		getState(e){
			this.state = parseInt(e.detail.value);
		},
		//提交处理
		submit(){
			api.editDataReport({
				id: this.id,
				state: this.state,
				handleMsg: this.state_msg,
				operationType: this.operationType,
				pc: this.userEn.pc
			},res=>{
				let code = api.getCode(res);
				if(code === 0){
					
					uni.showModal({
						title:"提示",
						content: "操作成功",
						showCancel: false,
						success(res) {
							if(res.confirm){
								uni.navigateBack({
									delta: 1
								})
							};
						}
					});					
				}
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
	.info radio-group{
		display:flex;
		justify-content:space-between;
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

