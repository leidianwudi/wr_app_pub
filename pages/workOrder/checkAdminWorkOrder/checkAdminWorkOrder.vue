<template>
	<view class="content" style="padding-bottom:150rpx;">
		<!-- 底部按钮组 -->
		<view class="footer_btn">
			<button type="primary" class="pass" @tap="handle">处理</button>
			<button type="primary" class="refuse" @tap="del">删除</button>
		</view>
		<!-- 工单详情信息 -->
		<view class="workOrder_info">
			<!-- 查看报错信息 -->
			<view class="people">
				<view class="title_box">审核信息</view>
				<!-- 当前状态 -->
				<view class="people_info">
					<text>当前状态：<text style="color:#ff0000; font-weight:bold;">{{state}}</text></text>
				</view>
				<!-- 处理反馈 -->
				<view class="people_info">
					<text>处理反馈：<textarea :value="state_msg" placeholder="" class="textarea_box" autoHeight="true" :disabled="true"/></text>
				</view>
<!-- 				<view class="people_info">
					<button type="primary" class="submit">确认处理</button>
				</view> -->
			</view>
			<!-- 报备人的信息 -->
			<view class="people">
				<view class="title_box">报备信息</view>
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
				<!-- 报备信息 -->
				<view class="people_info">
					<text>报备信息：<textarea :value="state_msg" placeholder="" class="textarea_box" autoHeight="true" :disabled="true"/></text>					
				</view>
			</view>
			<!-- 数据信息 -->
            <view class="people">
				<view class="title_box">数据信息</view>
				<!-- 运维类别 -->
				<view class="people_info">
					<text>运维类别：</text>    
					<view class="info">
						<checkbox-group>
							<label>
							    <checkbox value="cb" :disabled="true"/>
								<text>设备标定</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true"/>
								<text>设备清洗</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true"/>
								<text>设备校准</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true"/>
								<text>设备故障提示</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true"/>
								<text>日常运维</text>
							</label>							
						</checkbox-group>
					</view>				
				</view>
				<!-- 数据因子 -->
            	<view class="people_info">
					<text>数据因子：</text>         
					<view class="info">
						<checkbox-group>
							<label>
							    <checkbox value="cb" :disabled="true"/>
								<text>COD</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true"/>
								<text>氨氮</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true"/>
								<text>SS</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true"/>
								<text>PH</text>
							</label>							
						</checkbox-group>
					</view>			
            	</view>
				<!-- 正确值 -->
				<view class="people_info">
					<text>正确值：</text> 
					<view class="correct">
                        <view class="COD">
                        	<text class="margin_T correct_name">COD：</text>
                            <view class="correct_info">
                            	<text class="margin_T">{{starTime}}</text>
                            	<input type="text" value="" v-model="inputMsg" placeholder="输入正确值"  class="margin_T" :disabled="true"/>
                            </view>
                            <view class="correct_info">
                            	<text  class="margin_T">{{endTime}}</text>
                            	<input type="text" value="" v-model="inputMsg"  class="margin_T" :disabled="true"/>
                            </view>
                        </view>
						<view class="氨氮">
							<text class="margin_T correct_name">氨氮：</text>
                            <view class="correct_info">
                            	<text class="margin_T">{{starTime}}</text>
                            	<input type="text" value="" v-model="inputMsg" placeholder="输入正确值"  class="margin_T" :disabled="true"/>
                            </view>
                            <view class="correct_info">
                            	<text  class="margin_T">{{endTime}}</text>
                            	<input type="text" value="" v-model="inputMsg"  class="margin_T" :disabled="true"/>
                            </view>
						</view>
						<view class="SS">
							<text class="margin_T correct_name">SS：</text>
                            <view class="correct_info">
                            	<text class="margin_T">{{starTime}}</text>
                            	<input type="text" value="" v-model="inputMsg" placeholder="输入正确值"  class="margin_T" :disabled="true"/>
                            </view>
                            <view class="correct_info">
                            	<text  class="margin_T">{{endTime}}</text>
                            	<input type="text" value="" v-model="inputMsg"  class="margin_T" :disabled="true"/>
                            </view>
						</view>
						<view class="PH">
							<text class="margin_T correct_name">PH：</text>
                            <view class="correct_info">
                            	<text class="margin_T">{{starTime}}</text>
                            	<input type="text" value="" v-model="inputMsg" placeholder="输入正确值"  class="margin_T" :disabled="true"/>
                            </view>
                            <view class="correct_info">
                            	<text  class="margin_T">{{endTime}}</text>
                            	<input type="text" value="" v-model="inputMsg"  class="margin_T" :disabled="true"/>
                            </view>
						</view>
					</view>
				</view>
				<!-- 开始时间 -->
            	<view class="people_info">
					<text>开始时间：<text>{{starTime}}</text></text>            		
            	</view>
				<!-- 结束时间 -->
            	<view class="people_info">
					<text>结束时间：<text>{{endTime}}</text></text>            		
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
			phone: "1843284732",
			state_msg: '测试111111111111111111111111111111111111111111111111111111111111111111111111111111111',
			state:"处理完成",
			starTime: '2020-01-15 00:00:00',
			endTime:  '2020-01-15 00:00:00',
			inputMsg:'1'
		}
	},
	methods:{
		//处理按钮
		handle(){
			uni.navigateTo({
				url: '/pages/workOrder/checkAdminWorkOrder/handleData/handleData'
			})
		},
		//处理按钮
		del(){
			uni.showModal({
				title:'删除',
				content:'你确定要删除这条数据报错吗？',
				success(res) {
					if(res.confirm) return;
				}
			})
		},
	}
}
</script>

<style>
	text{
		word-wrap: break-word;
	}
	.footer_btn{
		border-top:1px solid #e3e3e3;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		z-index:999;
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
	.correct input{
		border:1px solid #E6E6E6;
		padding-left:10rpx;
	}
	.correct>view{
		display:flex;
		flex-direction:column;
	}
	.margin_T{
		margin-top:10rpx;
	}
	.correct_info{
		display:flex;
		flex-direction:row;
		color:#949494;
	}
	.correct_info>input{
		margin-left:20rpx;
		flex:1;
	}
	.correct_name{
		font-weight:bold;
	}
</style>
