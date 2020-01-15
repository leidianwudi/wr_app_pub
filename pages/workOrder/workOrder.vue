<template>
	<view class="content" style="background:#fff;">
		<view class="workeOrder_list" v-for="(item, index) in workeOrder_list" :key="index" @tap="toCheckWorkOrder">
			<view class="workeOrder_info">
				<view class="info">
					报备来源：
					<text>{{item.zhgyServerName}}</text><!-- 子服务器 -->				
					<text class="margin_l">{{item.zhgyEnterpriceName}}</text>  <!-- 企业名 -->
				</view>
				<view class="info">
					运维类型：<text class="type">{{item.type}}</text>  <!-- 运维类型 -->
				</view>
				<view class="info">
					运维类型：<text :class="item.state == '待处理' ? 'state1' : 'state0'">{{item.state}}</text>  <!-- 状态 -->
				</view>	
				<view class="info">
					报备因子：<text>{{item.dataType}}</text>  <!-- 报备因子 -->
				</view>								
				<view class="info">
					开始时间：{{item.starTime}}  <!-- 开始时间 -->
				</view>
			</view>
			<m-icon type="forward"></m-icon>
		</view>
	</view>
</template>

<script>
import mIcon from "@/components/m-icon/m-icon.vue";
import storage from '@/api/storage.js';
export default{
	components: {
		mIcon
	},
	data() {
		return {
			workeOrder_list: [{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备故障提示",
				state: "待处理",
				dataType: 'SS,PH',
				starTime: "2020-01-15 00:00:00",
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备故障提示",
				state: "处理终止",		
				dataType: 'SS,PH',
				starTime: "2020-01-15 00:00:00",
				endTime:"2020-01-15 00:00:00"	
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备校准",
				state: "处理完成",
				dataType: 'SS,PH',
				starTime: "2020-01-15 00:00:00",
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备故障提示",
				state: "待处理",	
				dataType: 'SS,PH',
				starTime: "2020-01-15 00:00:00",
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备校准",
				state: "处理终止",
				dataType: 'SS,PH',
				starTime: "2020-01-15 00:00:00",
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备校准",
				state: "待处理",		
				dataType: 'SS,PH',
				starTime: "2020-01-15 00:00:00",
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备校准",
				state: "处理终止",	
				dataType: 'SS,PH',
				starTime: "2020-01-15 00:00:00",
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备故障提示",
				state: "待处理",
				starTime: "2020-01-15 00:00:00",
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备故障提示",
				state: "处理终止",
				starTime: "2020-01-15 00:00:00",
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备故障提示",
				state: "待处理",
				starTime: "2020-01-15 00:00:00",
			},{
				zhgyEnterpriceName: '万峰盛',
				zhgyServerName: '锦尚工业区',
				type: "设备故障提示",
				state: "待处理",
				starTime: "2020-01-15 00:00:00",
			},]
		}
	},
	methods:{
		toCheckWorkOrder(){
			if(storage.getMyInfo().isAdmin === 1){
				uni.navigateTo({
					url: "/pages/workOrder/checkAdminWorkOrder/checkAdminWorkOrder"
				})
			}else{
				uni.navigateTo({
					url: "/pages/workOrder/checkWorkOrder/checkWorkOrder"
				})
			}
		}
	}
}
</script>

<style>
	.workeOrder_list{
		padding:20rpx;
		box-sizing:border-box;
		color:#808080;
		display:flex;
		justify-content:space-between;
		align-items:center;
		border-bottom:1px solid #e3e3e3;
	}
	.workeOrder_info{
		width:90%;
		font-size:14px;
	}
	.info{
		width:100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
	.margin_l{
		margin-left:30rpx;
	}
	.type{
		color:#01AAED;
	}
	.state0{
		color:#FFB800;
		font-weight:bold;
	}
	.state1{
		color:#FF5722;
		font-weight:bold;
	}
</style>
