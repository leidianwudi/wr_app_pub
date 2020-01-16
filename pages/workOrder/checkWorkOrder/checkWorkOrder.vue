<template>
	<view class="content">
		<!-- 工单详情信息 -->
		<view class="workOrder_info">
			<!-- 查看报错信息 -->
			<view class="people">
				<view class="title_box">审核信息</view>
				<!-- 当前状态 -->
				<view class="people_info">
					<text>当前状态：</text>
					<text style="color:#ff0000; font-weight:bold;" v-if="state === 2">处理终止</text>
					<text style="color:#009688; font-weight:bold;" v-if="state === 1">处理完成</text>
					<text style="color:#FFB800; font-weight:bold;" v-if="state === 0">待处理</text>
				</view>
				<!-- 处理反馈 -->
				<view class="people_info">
					<text>处理反馈：</text>
					<textarea v-model="state_msg" placeholder="" class="textarea_box" autoHeight="true" :disabled="true"/>
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
					<text>报备信息：</text>
					<textarea v-model="info" placeholder="" class="textarea_box" autoHeight="true" :disabled="true"/>
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
							    <checkbox value="cb" :disabled="true" :checked ="operationType === 1? true : false"/>
								<text>设备标定</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true" :checked ="operationType === 2? true : false"/>
								<text>设备清洗</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true" :checked ="operationType === 3? true : false"/>
								<text>设备校准</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true" :checked ="operationType === 4? true : false"/>
								<text>设备故障提示</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true" :checked ="operationType === 5? true : false"/>
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
							    <checkbox value="cb" :disabled="true" :checked="cod"/>
								<text>COD</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true" :checked="andan"/>
								<text>氨氮</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true" :checked="ss"/>
								<text>SS</text>
							</label>
							<label>
							    <checkbox value="cb" :disabled="true" :checked="ph"/>
								<text>PH</text>
							</label>							
						</checkbox-group>
					</view>			
            	</view>
				<!-- 正确值 -->
				<view class="people_info">
					<text>正确值：</text> 
					<view class="correct">
                        <view class="COD"  v-if="cod ? true : false">
                        	<text class="margin_T correct_name">COD：</text>
                            <view class="correct_info">
                            	<text class="margin_T">{{codstartTime}}</text>
                            	<input type="text" value="" v-model="codStartInputMsg" placeholder="输入正确值"  class="margin_T" :disabled="true"/>
                            </view>
                            <view class="correct_info">
                            	<text  class="margin_T">{{codendTime}}</text>
                            	<input type="text" value="" v-model="codEndInputMsg"  class="margin_T" :disabled="true"/>
                            </view>
                        </view>
						<view class=""  v-if="andan ? true : false">
							<text class="margin_T correct_name">氨氮：</text>
                            <view class="correct_info">
                            	<text class="margin_T">{{andanstartTime}}</text>
                            	<input type="text" value="" v-model="andanStartInputMsg" placeholder="输入正确值"  class="margin_T" :disabled="true"/>
                            </view>
                            <view class="correct_info">
                            	<text  class="margin_T">{{andanendTime}}</text>
                            	<input type="text" value="" v-model="andanEndInputMsg"  class="margin_T" :disabled="true"/>
                            </view>
						</view>
						<view class="SS"  v-if="ss ? true : false">
							<text class="margin_T correct_name">SS：</text>
                            <view class="correct_info">
                            	<text class="margin_T">{{ssstartTime}}</text>
                            	<input type="text" value="" v-model="ssStartInputMsg" placeholder="输入正确值"  class="margin_T" :disabled="true"/>
                            </view>
                            <view class="correct_info">
                            	<text  class="margin_T">{{ssendTime}}</text>
                            	<input type="text" value="" v-model="ssEndInputMsg"  class="margin_T" :disabled="true"/>
                            </view>
						</view>
						<view class="PH"  v-if="ph ? true : false">
							<text class="margin_T correct_name">PH：</text>
                            <view class="correct_info">
                            	<text class="margin_T">{{phstartTime}}</text>
                            	<input type="text" value="" v-model="phStartInputMsg" placeholder="输入正确值"  class="margin_T" :disabled="true"/>
                            </view>
                            <view class="correct_info">
                            	<text  class="margin_T">{{phendTime}}</text>
                            	<input type="text" value="" v-model="phEndInputMsg"  class="margin_T" :disabled="true"/>
                            </view>
						</view>
					</view>
				</view>
				<!-- 开始时间 -->
            	<view class="people_info">
					<text>开始时间：<text>{{startTime}}</text></text>            		
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
import storage from '@/api/storage.js';
import api from '@/api/api.js';
export default{
	components: {
		mIcon,
	},
	data() {
		return {
			id: null,
			userEn: null,
			
			// 表单数据
			name: "",  //报备人
			phone: "", //报备人手机
			info: '', //报备信息
			state_msg: '', //处理反馈信息
			state:"",  //当前状态
			operationType: '', //运维类别
			startTime: '', //开始时间
			endTime:  '', //结束时间
			cod: false,  	//cod
			andan: false, 	//氨氮
			ss: false, 		//ss
			ph: false, 		//ph
			codStartInputMsg:'', 	//cod开始时间的值
			codEndInputMsg:'',		//cod结束时间的值
			andanStartInputMsg:'',	//氨氮开始时间的值
			andanEndInputMsg:'',	//氨氮结束时间的值
			ssStartInputMsg:'', 	//ss开始时间的值
			ssEndInputMsg:'',		//ss结束时间的值
			phStartInputMsg:'',	//ph开始时间的值
			phEndInputMsg:'',	//ph结束时间的值	
					
			codstartTime:'', 	//cod开始时间
			codendTime:'',		//cod结束时间
			andanstartTime:'',	//氨氮开始时间
			andanendTime:'',	//氨氮结束时间
			ssstartTime:'', 	//ss开始时间
			ssendTime:'',		//ss结束时间
			phstartTime:'',	//ph开始时间
			phendTime:'',	//ph结束时间
		}
	},
	onLoad(res) {
		this.id = res.id;
		this.userEn = storage.getMyInfo();
	},
	onShow() {
		this.checkZhgyDataHandle();  //获取数据报错详细信息
	},
	methods:{
		//获取数据报错详细信息
		checkZhgyDataHandle(){
			let _this = this;
			api.zhgyDataHandle({
				id: this.id,
				pc: this.userEn.pc
			},res=>{
				let code = api.getCode(res);
				let data = api.getData(res);
				if(code === 0){
					//报备人信息
					_this.name = data.reportName;
					_this.phone = data.reportPhone;
					_this.info = data.reportInfo;
					//状态信息
					_this.state = data.state;
					_this.state_msg = data.handleMsg === null ? '' : data.handleMsg;
                    //开始时间和结束时间
					_this.startTime = data.startTime;
					_this.endTime = data.endTime;
					//运维类别
					_this.operationType = data.operationType;
					//正确值
					data.dataCorrect.forEach(function(item){
						if(item.dataType == "COD"){
							_this.cod = true;
							_this.codStartInputMsg = item.startValue;
							_this.codEndInputMsg = item.endValue;
							_this.codstartTime = item.startTime;
							_this.codendTime = item.endTime;
						}else if(item.dataType == "氨氮"){
							_this.andan = true;
							_this.andanStartInputMsg = item.startValue;
							_this.andanEndInputMsg = item.endValue;
							_this.andanstartTime = item.startTime;
							_this.andanendTime = item.endTime;							
						}else if(item.dataType == "SS"){
							_this.ss = true;
							_this.ssStartInputMsg = item.startValue;
							_this.ssEndInputMsg = item.endValue;
							_this.ssstartTime = item.startTime;
							_this.ssendTime = item.endTime;							
						}else if(item.dataType == "PH"){
							_this.ph = true;
							_this.phStartInputMsg = item.startValue;
							_this.phEndInputMsg = item.endValue;
							_this.phstartTime = item.startTime;
							_this.phendTime = item.endTime;							
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
