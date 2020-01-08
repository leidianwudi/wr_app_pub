<template>
	<view class="content">
		<!-- 顶部切换条 -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#5f89af"></uni-segmented-control>
		<view class="">
			<view v-show="current === 0"></view>
			<view v-show="current === 1"></view>
			<view v-show="current === 2"></view>
		</view>
		<!-- 企业信息 -->
		<view class="enterprise_info">
			<view class="date">{{date}}</view>
			<view class="enterprise_name">企业名称：{{name}}</view>
			<view class="position">点位名称：{{position_name}}</view>
		</view>
		<!-- 信息列表 -->
		<view class="info_lists">
			<scroll-view scroll-y="true" scroll-x="true" class="scroll">
				<block class="box">
					<t-table>
						<t-tr>
							<t-th>时间</t-th>
							<t-th>瞬时</t-th>
							<t-th>累计</t-th>
							<t-th>配额</t-th>
							<t-th>用量</t-th>
							<t-th>COD</t-th>
							<t-th>氨氮</t-th>
							<t-th>PH</t-th>
							<t-th>SS</t-th>
							<t-th>余氯</t-th>
							<t-th>电导率</t-th>
							<t-th>温度</t-th>
							<t-th>阀门控制模式</t-th>
							<t-th>阀门自动</t-th>
							<t-th>市电</t-th>
							<t-th>阀门状态</t-th>
						</t-tr>
						<t-tr v-for="(item, index) in tableList" :key="index">
							<t-td>{{ item.时间 }}</t-td>
							<t-td>{{ item.瞬时流量 }}</t-td>
							<t-td>{{ item.累计流量 }}</t-td>
							<t-td>{{ item.日配额 }}</t-td>
							<t-td>{{ item.日配额余量 }}</t-td>
							<t-td>{{ item.COD }}</t-td>
							<t-td>{{ item.氨氮 }}</t-td>
							<t-td>{{ item.PH }}</t-td>
							<t-td>{{ item.SS }}</t-td>
							<t-td>{{ item.余氯 }}</t-td>
							<t-td>{{ item.电导率 }}</t-td>
							<t-td>{{ item.温度 }}</t-td>
							<t-td>{{ item.阀门控制模式 === 0 ? "计费模式" : item.阀门控制模式 }}</t-td>
							<t-td>{{ item.阀门自动 === 1 ? "自动" : "手动" }}</t-td>
							<t-td>{{ item.市电 === 1 ? "市电" : item.市电 }}</t-td>
							<t-td>{{ item.阀门开到位 === 1 ? "开到位" : "关到位" }}</t-td>
						</t-tr>
					</t-table>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import api from '@/api/api.js';
	import storage from '@/api/storage.js';
	export default {
		components: {
			uniSegmentedControl,
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				items: ['瞬时数据', '日数据', '月数据'],
				current: 0,
				date: '2019-12-10',
				name: '1234567890',
				position_name: "福建环保工程投资有限公司福建环保工程投资有限公司",
				tableList: []
			}
		},
		onLoad() {
			this.getNowDataList();
		},
		methods: {
			//瞬时、日、月数据页面切换
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				};
			},
			// 获取瞬时数据列表
			getNowDataList(){
				let _this = this;
				api.NowDataList({
					page: 1,
					limit: 200,
					token: storage.getMyInfo().token,
					pc: storage.getMyInfo().pc
				},res=>{
					let code = api.getCode(res);
					let data = api.getData(res);
					if(code === 0){
						data.forEach(function(item){
							_this.tableList.push(item);
						});
					}
				});
			}
		}
	}
</script>

<style>
	.enterprise_info {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 50rpx 0;
		box-sizing: border-box;
		align-items: center;
		background: #fff;
	}
	.date {
		text-align:center;
		background: #e6b16b;
		width: 160rpx;
		height: 50rpx;
		line-height:50rpx;
		font-size: 14px;
		color: #fff;
		border-radius: 5px;
		padding: 15rpx 20rpx;
		margin: 0 auto;
	}

	.enterprise_name {
		margin-top: 20rpx;
		font-size:15px;
	}

	.info_lists {
		background: #fff;
		overflow: hidden;
	}
	.scroll {
		overflow: hidden;
		white-space: nowrap;
		width: 100%;
	}
	.position{
		font-size:16px;
	}
</style>
