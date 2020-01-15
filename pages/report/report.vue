<template>
	<view class="content">
		<view class="main">
			<!-- 运维类别单选 -->
			<view class="uni-title uni-common-mt title" style="font-size:16px;">*运维类别：</view>
			<view class="info">
				<checkbox-group>
					<label>
					    <checkbox value="cb"/>
						<text>设备标定</text>
					</label>
					<label>
					    <checkbox value="cb"/>
						<text>设备清洗</text>
					</label>
					<label>
					    <checkbox value="cb"/>
						<text>设备校准</text>
					</label>
					<label>
					    <checkbox value="cb"/>
						<text>设备故障提示</text>
					</label>
					<label>
					    <checkbox value="cb"/>
						<text>日常运维</text>
					</label>					
				</checkbox-group>
			</view>
			<!-- 数据因子多选 -->
			<view class="uni-title uni-common-mt title" style="font-size:16px;">*数据因子：</view>
			<view class="info">
				<checkbox-group>
					<label>
					    <checkbox value="cb"/>
						<text>COD</text>
					</label>
					<label>
					    <checkbox value="cb"/>
						<text>氨氮</text>
					</label>
					<label>
					    <checkbox value="cb"/>
						<text>SS</text>
					</label>
					<label>
					    <checkbox value="cb"/>
						<text>HP</text>
					</label>
				</checkbox-group>
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
					<input type="text" value=""/>
				</view>
			</view>
			<!-- 报备人手机 -->
			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*报备人手机：</view>
				<view class="">
					<input type="text" value=""/>
				</view>
			</view>
			<!-- 报备人信息 -->
			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*报备人信息：</view>
				<view class="">
					<textarea value="" placeholder=""/>
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
			type: 0,
			startYear: 1980,
			endYear: 2030,
			cancelColor: "#888",
			color: "#5677fc",
			setDateTime: "",
			num: null,
			result: "",
			beginInfo: ""
		}
	},
	methods:{
		show(num){
			this.cancelColor = "#888";
			this.color = "#5677fc";
			this.setDateTime = "";
			this.startYear = 1980;
			this.endYear = 2030;
            this.type = 0;
			if(num ===1) this.num = 1;
			else this.num = 2;
			this.$refs.dateTime.show()
		},
		change: function(e) {
			if(this.num === 1) 	this.beginInfo = e.result;
			if(this.num === 2)  this.result = e.result;
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
	.info checkbox-group{
		display:flex;
		justify-content:flex-start;
		font-size:15px;
		flex-wrap: wrap;
	}
	.info label{
		margin-top:20rpx;
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
</style>
