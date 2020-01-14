<template>
	<view class="content">
		<!-- 顶部切换条 -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#5f89af"></uni-segmented-control>
		<view class="">
			<view v-show="current === 0" @tap="btn1"></view>
			<view v-show="current === 1" @tap="btn2"></view>
			<view v-show="current === 2" @tap="btn3"></view>
		</view>
		
		<!-- <scroll-view :scroll-x="true" :scroll-into-view="scrollToView" class="scrollbox" :scroll-with-animation="true"> -->
			    <!-- 瞬时数据界面 -->
				<view class="box" id="box0" v-if="dataType === 0">
							<!-- 瞬时数据企业信息 -->
							<view class="enterprise_info">
								<view class="day">
									<view class="enterprise_name">{{name}}</view>
									<view class="position">{{position_name}}</view>
								</view>
							</view>
							<!-- 瞬时数据信息列表 -->
							<view class="info_lists">
								<scroll-view scroll-y="true" scroll-x="true" class="scroll">
									<block class="box">
										<t-table>
											<t-tr>
												<t-th-time>时间</t-th-time>
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
												<t-td-time>{{ item.time }}</t-td-time> <!-- 时间 -->
												<t-td>{{ item.nowWater }}</t-td>  <!-- 瞬时流量 -->
												<t-td>{{ item.addWater }}</t-td>  <!-- 累计流量 -->
												<t-td>{{ item.dayAmount }}</t-td>  <!-- 日配额 -->
												<t-td>{{ item.dayAmountRemain }}</t-td>  <!-- 日配额余量 -->
												<t-td>{{ item.COD }}</t-td>
												<t-td>{{ item.anDan }}</t-td>  <!-- 氨氮 -->
												<t-td>{{ item.PH }}</t-td>
												<t-td>{{ item.SS }}</t-td>
												<t-td>{{ item.yuLv }}</t-td>  <!-- 余氯 -->
												<t-td>{{ item.eleLv }}</t-td>  <!-- 电导率 -->
												<t-td>{{ item.temperature }}</t-td> <!-- 温度 -->
												<t-td>{{ item.gateControl === 0 ? "计费模式" : item.gateControl }}</t-td> <!-- 阀门控制模式 -->
												<t-td>{{ item.gateAuto === 1 ? "自动" : "手动" }}</t-td> <!-- 阀门自动 -->
												<t-td>{{ item.cityEle === 1 ? "市电" : item.cityEle }}</t-td>  <!-- 市电 -->
												<t-td>{{ item.gateOpen === 1 ? "开到位" : "关到位" }}</t-td>  <!-- 阀门开到位 -->
											</t-tr>
										</t-table>
									</block>
								</scroll-view>
							</view>
				</view>
				<!-- 日数据界面 -->
				<view class="box" id="box1" v-if="dataType === 1">
					<!-- 日数据信息 -->
					<view class="enterprise_info">
					    <view class="day">
					    	<text>日期：</text>
							<input type="text" value="" @tap="onDay(1)" v-model="dayData" :disabled="true"/>
							<button type="primary" @tap="dayDataList" class="search_btn">搜索</button>
					    </view>
					</view>
					<!-- 日数据信息列表 -->
					<view class="info_lists">
						<scroll-view scroll-y="true" scroll-x="true" class="scroll">
							<block class="box">
								<t-table>
									<t-tr>
										<t-th>日期</t-th>
										<t-th>时流量(m3)</t-th>
										<t-th>累计流量(m3)</t-th>
										<t-th>COD(mg/l)</t-th>
										<t-th>氨氮(mg/l)</t-th>
										<t-th>SS(mg/l)</t-th>
										<t-th>SS最大(mg/l)</t-th>
										<t-th>SS最小(mg/l)</t-th>
										<t-th>余氯(mg/l)</t-th>
										<t-th>余氯最大(mg/l)</t-th>
										<t-th>余氯最小(mg/l)</t-th>
										<t-th>电导(mg/l)</t-th>
										<t-th>电导最大(最大)</t-th>
										<t-th>电导最小(最小)</t-th>
										<t-th>温度(摄氏度)</t-th>
										<t-th>温度最大(最大)</t-th>
										<t-th>温度最小(最小)</t-th>
										<t-th>PH(无量纲)</t-th>
										<t-th>PH最大(无量纲)</t-th>
										<t-th>PH最小(无量纲)</t-th>
									</t-tr>
									<t-tr v-for="(item, index) in dayList" :key="index">
										<t-td>{{ item.hour }}</t-td>
										<t-td>{{ item.hourWater }}</t-td>  <!-- 时流量 -->
										<t-td>{{ item.dleAddWater }}</t-td> <!-- 累计流量 -->
										<t-td>{{ item.COD }}</t-td>
										<t-td>{{ item.anDan }}</t-td> <!-- 氨氮 -->
										<t-td>{{ item.SS }}</t-td>
										<t-td>{{ item.SSMax }}</t-td>
										<t-td>{{ item.SSMin }}</t-td>
										<t-td>{{ item.yuLv }}</t-td> <!-- 余氯 -->
										<t-td>{{ item.yuLvMax }}</t-td> <!-- 余氯Max -->
										<t-td>{{ item.yuLvMin }}</t-td> <!-- 余氯Min -->
										<t-td>{{ item.eleLv }}</t-td>  <!-- 电导率 -->
										<t-td>{{ item.eleLvMax }}</t-td> <!-- 电导率Max -->
										<t-td>{{ item.eleLvMin }}</t-td> <!-- 电导率Min -->
										<t-td>{{ item.temperature }}</t-td>  <!-- 温度 -->
										<t-td>{{ item.temperatureMax }}</t-td> <!-- 温度Max -->
										<t-td>{{ item.temperatureMin }}</t-td> <!-- 温度Min -->
										<t-td>{{ item.PH }}</t-td>
										<t-td>{{ item.PHMax }}</t-td>
										<t-td>{{ item.PHMin }}</t-td>
									</t-tr>
								</t-table>
							</block>
						</scroll-view>
					</view>
				</view>
				<!-- 月数据界面 -->
				<view class="box" id="box2" v-if="dataType === 2">
					<!-- 月数据信息 -->
					<view class="enterprise_info">  <!-- @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend" -->
					    <view class="month">
					    	<text>日期：</text>
							<input type="text" value="" @tap="onDay(2)" v-model="monthData" :disabled="true"/>
							<button type="primary" @tap="monthDataList">搜索</button>
					    </view>
					</view>
					<!-- 月数据信息列表 -->
					<view class="info_lists">
						<scroll-view scroll-y="true" scroll-x="true" class="scroll">
							<block class="box">
								<t-table>
									<t-tr>
										<t-th>日期</t-th>
										<t-th>时流量(m3)</t-th>
										<t-th>累计流量(m3)</t-th>
										<t-th>COD(mg/l)</t-th>
										<t-th>氨氮(mg/l)</t-th>
										<t-th>SS(mg/l)</t-th>
										<t-th>SS最大(mg/l)</t-th>
										<t-th>SS最小(mg/l)</t-th>
										<t-th>余氯(mg/l)</t-th>
										<t-th>余氯最大(mg/l)</t-th>
										<t-th>余氯最小(mg/l)</t-th>
										<t-th>电导(mg/l)</t-th>
										<t-th>电导最大(最大)</t-th>
										<t-th>电导最小(最小)</t-th>
										<t-th>温度(摄氏度)</t-th>
										<t-th>温度最大(最大)</t-th>
										<t-th>温度最小(最小)</t-th>
										<t-th>PH(无量纲)</t-th>
										<t-th>PH最大(无量纲)</t-th>
										<t-th>PH最小(无量纲)</t-th>
									</t-tr>
									<t-tr v-for="(item, index) in monthList" :key="index">
										<t-td>{{ item.day + '日' }}</t-td>
										<t-td>{{ item.hourWater }}</t-td>  <!-- 时流量 -->
										<t-td>{{ item.dleAddWater }}</t-td>  <!-- 累计流量 -->
										<t-td>{{ item.COD }}</t-td>
										<t-td>{{ item.anDan }}</t-td>  <!-- 氨氮 -->
										<t-td>{{ item.SS }}</t-td>
										<t-td>{{ item.SSMax }}</t-td>
										<t-td>{{ item.SSMin }}</t-td>
										<t-td>{{ item.yuLv }}</t-td>  <!-- 余氨 -->
										<t-td>{{ item.yuLvMax }}</t-td> <!-- 余氯Max -->
										<t-td>{{ item.yuLvMin }}</t-td> <!-- 余氯Min -->
										<t-td>{{ item.eleLv }}</t-td>  <!-- 电导率 -->
										<t-td>{{ item.eleLvMax }}</t-td> <!-- 电导率Max -->
										<t-td>{{ item.eleLvMin }}</t-td> <!-- 电导率Min -->
										<t-td>{{ item.temperature }}</t-td> <!-- 温度 -->
										<t-td>{{ item.temperatureMax }}</t-td> <!-- 温度Max -->
										<t-td>{{ item.temperatureMin }}</t-td> <!-- 温度Min -->
										<t-td>{{ item.PH }}</t-td>
										<t-td>{{ item.PHMax }}</t-td>
										<t-td>{{ item.PHMin }}</t-td>
									</t-tr>
								</t-table>
							</block>
						</scroll-view>
					</view>
				</view>
		<!-- </scroll-view> -->
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change"></tui-datetime>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import tThTime from '@/components/t-table/t-th-time.vue';
	import tTdTime from '@/components/t-table/t-td-time.vue';
	import api from '@/api/api.js';
	import storage from '@/api/storage.js';
	import tuiDatetime from "@/components/dateTime/dateTime";
    import tranNowList from "@/api/tranNowList.js";
	import tranDayList from "@/api/tranDayList.js";
	import tranMoneyList from "@/api/tranMoneyList.js";
	export default {
		components: {
			uniSegmentedControl,
			tTable,
			tTh,
			tTr,
			tTd,
			tuiDatetime,
			tTdTime,
			tThTime
		},
		data() {
			return {
				items: ['瞬时数据', '日数据', '月数据'],
				current: 0,
				name: '',  //瞬时数据企业名称
				position_name: "",  //瞬时数据用户名
				hourList: ["08:00", "09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00", 
				"17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", 
				"01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],  //日时间小时列表
				tableList: [], //瞬时列表
				dayList: [],   //日数据列表
				monthList: [],   //月数据列表
				scrollToView: "", //横向滚动条指定位置
				type: 1,
				startYear: 1980,
				endYear: 2030,
				cancelColor: "#888",
				color: "#5677fc",
				setDateTime: "",
				result: "",
				dayData: ''  ,//日数据搜索框值
				monthData: '' ,//月数据搜索框值
				num: null,
				intervalID: null,
				dataType: 0 //控制瞬时，日，月数据页面切换的参数
			}
		},
		onLoad() {
			this.getNowDataList();
			this.myTimerOpen();
		},
		onUnload() {
			this.myTimerStop();  //关闭瞬时数据请求定时器
		},
		methods: {
			//每20秒自动获取一次瞬时数据
			myTimerOpen(){
				this.intervalID = setInterval(this.getNowDataList.bind(this), 20000);
			},
			//关闭瞬时数据请求定时器
			myTimerStop() {
				clearInterval(this.intervalID);
			},
			//判断屏幕手动滚动方向
			// handletouchmove: function(event) {
			//             // console.log(event)
			//             if (this.flag !== 0) {
			//                 return;
			//             };
			//             let currentX = event.touches[0].pageX;
			//             let tx = currentX - this.lastX;
			//             let text = '';
			//             this.mindex = -1;
			//             //左右方向滑动
			//                 if (tx < 0) {
			//                     text = '向左滑动';
			//                     this.flag = 1;
			// 					if(this.current == 2) return;
			// 					else this.current++;
			// 					this.scrollToView = "box" + this.current;
			//                 //  this.getList();  //调用列表的方法
			//                 } else if (tx > 0) {
			//                     text = '向右滑动';
			//                     this.flag = 2;
			// 					if(this.current == 0) return;
			// 					else this.current--;
			// 					this.scrollToView = "box" + this.current;
			//                 }
			//             //将当前坐标进行保存以进行下一次计算
			//             this.lastX = currentX;
			//             this.text = text;
			//         },
			//         handletouchstart: function(event) {
			//             this.lastX = event.touches[0].pageX;
			//         },
			//         handletouchend: function(event) {
			//             this.flag = 0;
			//             this.text = '没有滑动';
			//         },
			onDay(type){
				this.cancelColor = "#888";
				this.color = "#5677fc";
				this.setDateTime = "";
				this.startYear = 1980;
				this.endYear = 2030;
				switch (type) {
					case 1:
						//this.setDateTime = "2019-10-12";
						this.type = 2;
						break;
					case 2:
						//this.setDateTime = "2019-11";
						this.type = 3;
						break;
					default:
						break;
				};
				if(type ===1) this.num = 1;
				else this.num = 2;
				this.$refs.dateTime.show()
			},
			change: function(e) {
				if(this.num === 1) 	this.dayData = e.result;
				if(this.num === 2)  this.monthData = e.result;
			},
			//瞬时、日、月数据页面切换
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					// this.scrollToView = "box" + e.currentIndex;
					this.dataType = e.currentIndex;
				};
			},
			// 获取瞬时数据列表
			getNowDataList(){
				if(this.current != 0) return;
				let _this = this;
				api.NowDataList({
					page: 1,
					limit: 200,
					pc: storage.getMyInfo().pc
				},res=>{
					let code = api.getCode(res);
					let data = api.getData(res);
					if(code === 0){
						let list = tranNowList.tranNowList(data);
						list.forEach(function(item){
							_this.name = item.zhgyServerName;
							_this.position_name = item.enterpriceName;
						});
						_this.tableList = list;
					}
				});
			},
			dayDataList(){
				if(this.dayData === '') return;
				this.dayList = [];
				let _this = this;
				api.DayDataList({
			        date: this.dayData,
					pc: storage.getMyInfo().pc
				},res=>{
					let code = api.getCode(res);
					let data = api.getData(res);
					if(code === 0){
						let list = tranDayList.tranDayList(data);
						list.forEach(function(item){
							item.hour = "";
							_this.dayList.push(item);
						});						
						for(let i = 0; i < _this.hourList.length; i++){
							_this.dayList[i].hour = _this.hourList[i];
						};
					};
				});
			},
			monthDataList(){
				if(this.monthData === '') return;
				this.monthList = [];
				let _this = this;
				api.MonthDataList({
			        date: this.monthData,
					pc: storage.getMyInfo().pc
				},res=>{
					let code = api.getCode(res);
					let data = api.getData(res);
					if(code === 0){
						let list = tranMoneyList.tranMoneyList(data);
                        _this.monthList = list;
					};
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
		padding: 40rpx 0;
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
		font-size:17px;
		font-weight:bold;
		color:#393D49;
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
		font-size:17px;
		color:#01AAED;
		margin-left:10rpx;
	}
	.box{
		width:100%;
		background:#e3e3e3;
		display:inline-block;
		vertical-align:top;
	}
	.scrollbox{
		white-space: nowrap;
	}
	input{
		border: 1px solid #e1e1e1;
		padding-left:10rpx;
	}
	button{
		background:#009688;
		margin-left:50rpx;
		font-size:14px;
	}
	.day, .month{
		display:flex;
		flex-direction:row;
		align-items:center;
		font-size:15px;
	}
	.day>button, .month>button{
		font-size:12px;
	}
</style>
