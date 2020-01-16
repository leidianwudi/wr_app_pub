<template>
	<view class="content" style="background:#fff;">
		<view class="workeOrder_list" v-for="(item, index) in workeOrder_list" :key="index"  @tap="toCheckWorkOrder(item.id)">
			<view class="workeOrder_info">
				<view class="info">
					报备来源：
					<text>{{item.zhgyServerName}}</text><!-- 子服务器 -->				
					<text class="margin_l">{{item.zhgyEnterpriceName}}</text>  <!-- 企业名 -->
				</view>
				<view class="info">
					运维类型：<text class="type" v-if="item.operationType ===1">设备标定</text>  <!-- 运维类型 -->
							 <text class="type" v-if="item.operationType ===2">设备清洗</text>
							 <text class="type" v-if="item.operationType ===3">设备校准</text>
							 <text class="type" v-if="item.operationType ===4">设备故障提示</text>
							 <text class="type" v-if="item.operationType ===5">日常运维</text>
				</view>
				<view class="info">
					运维类型：<text class="state2" v-if="item.state === 0">待处理</text>  <!-- 状态 -->
							<text class="state1" v-if="item.state === 1">处理完成</text>
							<text class="state0" v-if="item.state === 2">处理终止</text>
				</view>	
				<view class="info">
					报备因子：<text>{{item.dataType}}</text>  <!-- 报备因子 -->
				</view>								
				<view class="info">
					开始时间：{{item.startTime}}  <!-- 开始时间 -->
				</view>
			</view>
			<m-icon type="forward"></m-icon>
		</view>
	</view>
</template>

<script>
import mIcon from "@/components/m-icon/m-icon.vue";
import storage from '@/api/storage.js';
import api from '@/api/api.js';
export default{
	components: {
		mIcon
	},
	data() {
		return {
			workeOrder_list: [],
			userEn: null
		}
	},
	methods:{
		toCheckWorkOrder(id){
			if(storage.getMyInfo().isAdmin === 1){
				uni.navigateTo({
					url: "/pages/workOrder/checkAdminWorkOrder/checkAdminWorkOrder?id=" + id
				});
			}else{
				uni.navigateTo({
					url: "/pages/workOrder/checkWorkOrder/checkWorkOrder?id=" + id
				});
			}
		},
		getZhgyDataHandleList(){
			let _this = this;
			api.zhgyDataHandleList({
				page: 1,
				limit: 10,
				pc: this.userEn.pc
			},res=>{
				let code = api.getCode(res);
				let data = api.getData(res);
				if(code === 0){
					_this.workeOrder_list = data;
				}
			})
		},
	},
	onLoad() {
		this.userEn = storage.getMyInfo();  //获取我的信息
	},
	onShow() {
		this.getZhgyDataHandleList();  //获取数据报错列表		
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
		color:#FF5722;
		font-weight:bold;
	}
	.state1{
		color:#009688;
		font-weight:bold;
	}
	.state2{
		color:#FFB800;
		font-weight:bold;
	}
</style>
