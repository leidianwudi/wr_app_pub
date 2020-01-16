<template>
	<view class="content">
		<view class="main">
			<!-- 运维类别单选 -->
			<view class="uni-title uni-common-mt title" style="font-size:16px;">*运维类别：</view>
			<view class="info">
				<radio-group @change="getType">
					<label class="radio"><radio value="1" />设备标定</label>
					<label class="radio"><radio value="2" />设备清洗</label>
					<label class="radio"><radio value="3" />备注校准</label>	
					<label class="radio"><radio value="4" />设备故障提示</label>
					<label class="radio"><radio value="5" />日常运维</label>																
				</radio-group>
			</view>
			<!-- 数据因子多选 -->
			<view class="uni-title uni-common-mt title" style="font-size:16px;">*数据因子：</view>
			<view class="info">
				<checkbox-group @change="getDataType">
					<label>
					    <checkbox value="cod"/>
						<text>COD</text>
					</label>
					<label>
					    <checkbox value="andan"/>
						<text>氨氮</text>
					</label>
					<label>
					    <checkbox value="ss"/>
						<text>SS</text>
					</label>
					<label>
					    <checkbox value="ph"/>
						<text>HP</text>
					</label>
				</checkbox-group>
			</view>
			<view class="people_info">
				<text>正确值：</text> 
				<view class="correct">
			        <view class="COD"  v-if="cod ? true : false">
			        	<text class="margin_T correct_name">COD：</text>
			            <view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" @tap="show('codStart')" v-model="codstartTime" placeholder="开始时间"/>
			            	<input type="text" value="" v-model="codStartInputMsg" placeholder="输入开始正确值"  class="margin_T infoWidth"/>
			            </view>
			            <view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="codendTime" placeholder="结束时间" @tap="show('codEnd')"/>							
			            	<input type="text" value="" v-model="codEndInputMsg"  class="margin_T infoWidth" placeholder="输入结束正确值"/>
			            </view>
			        </view>
					
					<view class=""  v-if="andan ? true : false">
						<text class="margin_T correct_name">氨氮：</text>
			            <view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="andanstartTime" placeholder="开始时间" @tap="show('andanStart')"/>
			            	<input type="text" value="" v-model="andanStartInputMsg" placeholder="输入开始正确值"  class="margin_T infoWidth"/>
			            </view>
			            <view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="andanendTime" placeholder="结束时间" @tap="show('andanEnd')"/>								
			            	<input type="text" value="" v-model="andanEndInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth"/>
			            </view>
					</view>
					
					<view class="SS"  v-if="ss ? true : false">
						<text class="margin_T correct_name">SS：</text>
			            <view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="ssstartTime" placeholder="开始时间" @tap="show('ssStart')"/>							
			            	<input type="text" value="" v-model="ssStartInputMsg" placeholder="输入开始正确值"  class="margin_T infoWidth"/>
			            </view>
			            <view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="ssendTime" placeholder="结束时间" @tap="show('ssEnd')"/>		
			            	<input type="text" value="" v-model="ssEndInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth"/>
			            </view>
					</view>
					<view class="PH"  v-if="ph ? true : false">
						<text class="margin_T correct_name">PH：</text>
			            <view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="phstartTime" placeholder="开始时间" @tap="show('phStart')"/>
			            	<input type="text" value="" v-model="phStartInputMsg"  placeholder="输入结束正确值"  class="margin_T infoWidth"/>
			            </view>
			            <view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="phendTime" placeholder="结束时间" @tap="show('phEnd')"/>	
			            	<input type="text" value="" v-model="phEndInputMsg"  placeholder="输入结束正确值" class="margin_T infoWidth"/>
			            </view>
					</view>
				</view>
			</view>
			<!-- 选择时间 -->
            <view class="input-box">
            	<view class="uni-title uni-common-mt date_test">*开始时间：</view>
            	<view class="date_1">
					<input type="text" value="" @tap="show(1)" v-model="beginInfo"/>
            	</view>
            </view>
			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*结束时间：</view>
				<view class="date_1">
					<input type="text" value="" @tap="show(2)" v-model="result"/>
				</view>
			</view>
			<!-- 报备人 -->
			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*报备人：</view>
				<view class="date_2">
					<input type="text" value="" v-model="name"/>
				</view>
			</view>
			<!-- 报备人手机 -->
			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*报备人手机：</view>
				<view class="">
					<input type="text" value="" v-model="phone"/>
				</view>
			</view>
			<!-- 报备人信息 -->
			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*报备人信息：</view>
				<view class="">
					<textarea value="" placeholder=""  v-model="info"/>
				</view>
			</view>
			<!-- 附件 -->
			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*附件：</view>
				<button type="primary"><m-icon type="plusempty" color="#fff" size="20"></m-icon>附件上传</button>
			</view>
			
			<button type="primary">立即提交</button>
		</view>
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change"></tui-datetime>
	</view>
</template>

<script>
import tuiDatetime from "@/components/dateTime/dateTime";
import mIcon from "@/components/m-icon/m-icon.vue";
export default{
	components: {
		tuiDatetime,
		mIcon
	},
	data() {
		return {
			// 时间选择器参数
			type: 0,
			startYear: 1980,
			endYear: 2030,
			cancelColor: "#888",
			color: "#5677fc",
			setDateTime: "",
			num: null,    //区分开始时间和结束时间的标识
			result: "",   //结束时间
			beginInfo: ""  ,//开始时间
			
			name: "", //报备人
			phone: "", //报备手机号
			info: "",  //报备信息
			operationType: null  ,//运维类型
			
			//正确值
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
	methods:{
		//获取数据因子
		getDataType(e){
			let dataType = e.detail.value;
			this.cod = dataType.includes("cod") ? true : false;
			this.andan = dataType.includes("andan") ? true : false;
			this.ss = dataType.includes("ss") ? true : false;
			this.ph = dataType.includes("ph") ? true : false;
		},
		//获取运维类型
		getType(e){
			this.operationType = parseInt(e.detail.value);
		},
		//区分开始时间和结束时间
		show(num){
			this.cancelColor = "#888";
			this.color = "#5677fc";
			this.setDateTime = "";
			this.startYear = 1980;
			this.endYear = 2030;
            this.type = 0;
			switch (num){
				case 1:
					this.num = 1;
					break;
				case 2:
					this.num = 2;
					break;
				case 'codStart':
					this.num = 'codStart';
					break;
				case 'codEnd':
					this.num = 'codEnd';
					break;
					
				case 'andanStart':
					this.num = 'andanStart';
					break;	
				case 'andanEnd':
					this.num = 'andanEnd';
					break;																
										
				case 'ssStart':
					this.num = 'ssStart';
					break;	
				case 'ssEnd':
					this.num = 'ssEnd';
					break;
																													
				case 'phStart':
					this.num = 'phStart';
					break;	
				case 'phEnd':
					this.num = 'phEnd';
					break;
																				
				default:
					break;
			}
			this.$refs.dateTime.show()
		},
		change: function(e) {
			switch (this.num){
				case 1:
					this.beginInfo = e.result;
					break;
				case 2:
					this.result = e.result;
					break;	
					
				case 'codStart':
					this.codstartTime = e.result;
					break;										
				case 'codEnd':
					this.codendTime = e.result;
					break;
						
				case 'andanStart':
					this.andanstartTime = e.result;
					break;										
				case 'andanEnd':
					this.andanendTime = e.result;
					break;
															
				case 'ssStart':
					this.ssstartTime = e.result;
					break;										
				case 'ssEnd':
					this.ssendTime = e.result;
					break;
					
				case 'phStart':
					this.phstartTime = e.result;
					break;										
				case 'phEnd':
					this.phendTime = e.result;
					break;
					
				default:
					break;
			}
		}
	}
}
</script>

<style>
	.main{
		color:#666666;
        background:#fff;
		padding:30rpx 20rpx;
		box-sizing:border-box;
	}
	.title{
		font-size:18px;
		margin-bottom:20rpx;
		margin-top:30rpx;
	}
	.info checkbox-group, .info radio-group{
		display:flex;
		justify-content:flex-start;
		font-size:15px;
		flex-wrap: wrap;
	}
	.info label{
		margin-top:20rpx;
		margin-left:20rpx;
	}
	.info text{
		margin-left:10rpx;
		margin-right:20rpx;
	}
	.input-box{
		display:flex;
		justify-content:flex-start;
		align-items:center;
		margin-bottom:30rpx;
		margin-top:50rpx;
	}
	.date_test{
		font-size:16px;
	}
	.input-box input, .input-box textarea{
		border:1px solid #e6e6e6;
		padding-left:10rpx;
		box-sizing:border-box;
	}
	.input-box textarea{
		width:430rpx;
	}
	.date_1{
		margin-left:1em;
	}
	.date_2{
		margin-left:2em;
	}
	.m-icon{
		margin-right:10rpx;
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
/* 		display:flex;
		flex-direction:row; */
		color:#949494;
		margin-top:20rpx;
	}
	.correct_info>input{
/* 		margin-left:20rpx;
		flex:1; */
	}
	.correct_name{
		font-weight:bold;
	}
	.timeWidth{
		width:50%;
		display:inline-block;
		margin-right:30rpx;
	}
	.infoWidth{
		width:40%;
		display:inline-block;
	}
</style>
