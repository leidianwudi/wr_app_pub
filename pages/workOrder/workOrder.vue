<template>
	<view class="content" style="background:#fff;">
		<view class="workeOrder_list" v-for="(item, index) in workeOrder_list" :key="index" @tap="toCheckWorkOrder">
			<view class="workeOrder_info">
				<view class="info">
					报备人：{{item.name}}
				</view>
				<view class="info">
					报备手机号：{{item.phone}}
				</view>
				<view class="info">
					报备信息：{{item.info}}
				</view>
			</view>
			<m-icon type="forward"></m-icon>
		</view>
	</view>
</template>

<script>
import mIcon from "@/components/m-icon/m-icon.vue";
export default{
	components: {
		mIcon
	},
	data() {
		return {
			workeOrder_list: [{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},{
				name: '工单1',
				phone: "1235347358430",
				info: "这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息这是工单的信息"
			},]
		}
	},
	methods:{
		toCheckWorkOrder(){
			uni.navigateTo({
				url: "/pages/workOrder/checkWorkOrder/checkWorkOrder"
			})
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
</style>
