<template>
	<view class="content">
		<!-- 顶部切换条 -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#5f89af"></uni-segmented-control>
		<view class="">
			<view v-show="current === 0" @tap="btn1"></view>
			<view v-show="current === 1" @tap="btn2"></view>
			<view v-show="current === 2" @tap="btn3"></view>
		</view>
		
		<scroll-view :scroll-x="true" :scroll-into-view="scrollToView" class="scrollbox" :scroll-with-animation="true">
			    <!-- 瞬时数据界面 -->
				<view class="box" id="box0">
							<!-- 瞬时数据企业信息 -->
							<view class="enterprise_info" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">
								<view class="day">
									<text>子服务器名：</text>
									<picker :range="ZhgyServerNameList" @change="zhgyServerNameListChange" range-key="name">
										<input type="text" value="" v-model="nowZhgyServerName" :disabled="true"/>
									</picker>
								</view>
								<view class="day">
									<text>企业名：</text>
									<picker :range="ZhgyEnterpriceNameList" @change="ZhgyEnterpriceNameListChange" range-key="name">
										<input type="text" value="" v-model="nowEnterpriceName" :disabled="true"/>
									</picker>
								</view>
								<button type="primary" @tap="searchNow">搜索</button>
							</view>
							<!-- 瞬时数据信息列表 -->
							<view class="info_lists">
								<scroll-view scroll-y="true" scroll-x="true" class="scroll">
									<block class="box">
										<t-table>
											<t-tr>
												<t-th>子服务器</t-th>
												<t-th>企业</t-th>
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
												<t-td>{{ item.zhgyServerName }}</t-td>
												<t-td>{{ item.enterpriceName }}</t-td>
												<t-td-time>{{ item.time }}</t-td-time> <!-- 时间 -->
												<t-td>{{ item.nowWater }}</t-td>  <!-- 瞬时流量 -->
												<t-td>{{ item.addWater }}</t-td> <!-- 累计流量 -->
												<t-td>{{ item.dayAmount }}</t-td>  <!-- 日配额 -->
												<t-td>{{ item.dayAmountRemain }}</t-td> <!-- 日配额余量 -->
												<t-td>{{ item.COD }}</t-td>
												<t-td>{{ item.anDan }}</t-td>  <!-- 氨氮 -->
												<t-td>{{ item.PH }}</t-td>
												<t-td>{{ item.SS }}</t-td>
												<t-td>{{ item.yuLv }}</t-td>  <!-- 余氯 -->
												<t-td>{{ item.eleLv }}</t-td>  <!-- 电导率 -->
												<t-td>{{ item.temperature }}</t-td>  <!-- 温度 -->
												<t-td>{{ item.gateControl === 0 ? "计费模式" : item.gateControl }}</t-td>  <!-- 阀门控制模式 -->
												<t-td>{{ item.gateAuto === 1 ? "自动" : "手动" }}</t-td>   <!-- 阀门自动 -->
												<t-td>{{ item.cityEle === 1 ? "市电" : item.cityEle }}</t-td>   <!-- 市电 -->
												<t-td>{{ item.gateOpen === 1 ? "开到位" : "关到位" }}</t-td>  <!-- 阀门开到位 -->
											</t-tr>
										</t-table>
									</block>
								</scroll-view>
							</view>
				</view>
				<!-- 日数据界面 -->
				<view class="box" id="box1">
					<!-- 日数据信息 -->
					<view class="enterprise_info" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">
						<view class="day">
							<text>子服务器名：</text>
							<picker :range="ZhgyServerNameList" @change="dayzhgyServerNameListChange" range-key="name">
								<input type="text" value="" v-model="dayZhgyServerName" :disabled="true"/>
							</picker>
						</view>
						<view class="day">
							<text>企业名：</text>
							<picker :range="ZhgyEnterpriceNameList" @change="dayZhgyEnterpriceNameListChange" range-key="name">
								<input type="text" value="" v-model="dayEnterpriceName" :disabled="true"/>
							</picker>
						</view>
					    <view class="day">
					    	<text>日期：</text>
							<input type="text" value="" @tap="onDay(1)" v-model="dayData" :disabled="true"/>
					    </view>
						<button type="primary" @tap="dayDataList">搜索</button>
					</view>
					<!-- 日数据信息列表 -->
					<view class="info_lists">
						<scroll-view scroll-y="true" scroll-x="true" class="scroll">
							<block class="box">
								<t-table>
									<t-tr>
										<t-th >日期</t-th>
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
										<t-td>{{ item.dleAddWater }}</t-td><!-- 累计流量 -->
										<t-td>{{ item.COD }}</t-td>
										<t-td>{{ item.anDan }}</t-td> <!-- 氨氮 -->
										<t-td>{{ item.SS }}</t-td>
										<t-td>{{ item.SSMax }}</t-td>
										<t-td>{{ item.SSMin }}</t-td>
										<t-td>{{ item.yuLv }}</t-td> <!-- 余氯 -->
										<t-td>{{ item.yuLvMax }}</t-td>   <!-- 余氯Max -->
										<t-td>{{ item.yuLvMin }}</t-td> <!-- 余氯Min -->
										<t-td>{{ item.eleLv }}</t-td> <!-- 电导率 -->
										<t-td>{{ item.eleLvMax }}</t-td>  <!-- 电导率Max -->
										<t-td>{{ item.eleLvMin }}</t-td>  <!-- 电导率Min -->
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
				<view class="box" id="box2">
					<!-- 月数据信息 -->
					<view class="enterprise_info"  @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">
						<view class="month">
							<text>子服务器名：</text>
							<picker :range="ZhgyServerNameList" @change="monthzhgyServerNameListChange" range-key="name">
								<input type="text" value="" v-model="monthZhgyServerName" :disabled="true"/>
							</picker>
						</view>
						<view class="month">
							<text>企业名：</text>
							<picker :range="ZhgyEnterpriceNameList" @change="monthZhgyEnterpriceNameListChange" range-key="name">
								<input type="text" value="" v-model="monthEnterpriceName" :disabled="true"/>
							</picker>
						</view>
					    <view class="month">
					    	<text>日期：</text>
							<input type="text" value="" @tap="onDay(2)" v-model="monthData" :disabled="true"/>
					    </view>
						<button type="primary" @tap="monthDataList">搜索</button>
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
										<t-td>{{ item.hourWater }}</t-td> <!-- 时流量 -->
										<t-td>{{ item.dleAddWater }}</t-td> <!-- 累计流量 -->
										<t-td>{{ item.COD }}</t-td>
										<t-td>{{ item.anDan }}</t-td>  <!-- 氨氮 -->
										<t-td>{{ item.SS }}</t-td>
										<t-td>{{ item.SSMax }}</t-td>
										<t-td>{{ item.SSMin }}</t-td>
										<t-td>{{ item.yuLv }}</t-td>  <!-- 余氯 -->
										<t-td>{{ item.yuLvMax }}</t-td> <!-- 余氯Max -->
										<t-td>{{ item.yuLvMin }}</t-td> <!-- 余氯Min -->
										<t-td>{{ item.eleLv }}</t-td>  <!-- 电导率 -->
										<t-td>{{ item.eleLvMax }}</t-td> <!-- 电导率Max -->
										<t-td>{{ item.eleLvMin }}</t-td> <!-- 电导率Min -->
										<t-td>{{ item.temperature }}</t-td> <!-- 温度 -->
										<t-td>{{ item.temperatureMax }}</t-td> <!-- 温度Max -->
										<t-td>{{ item.temperatureMin }}</t-td>  <!-- 温度Min -->
										<t-td>{{ item.PH }}</t-td>
										<t-td>{{ item.PHMax }}</t-td>
										<t-td>{{ item.PHMin }}</t-td>
									</t-tr>
								</t-table>
							</block>
						</scroll-view>
					</view>
				</view>
		</scroll-view>
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change"></tui-datetime>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tThTime from '@/components/t-table/t-th-time.vue';
	import tTdTime from '@/components/t-table/t-td-time.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import api from '@/api/api.js';
	import storage from '@/api/storage.js';
	import tuiDatetime from "@/components/dateTime/dateTime";
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
				items: ['瞬时数据', '日数据', '月数据'], //顶部切换条数组
				current: 0,
				name: '',  //瞬时数据企业名称
				position_name: "",  //瞬时数据用户名
				hourList: ["08:00", "09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00", 
				"17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", 
				"01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],  //日时间小时列表
				scrollToView: "", 		//横向滚动条指定位置
				ZhgyServerNameList: [],		//子服务器列表(瞬时，日，月通用)
				ZhgyEnterpriceNameList: [],	//企业列表(瞬时，日，月通用)
				//有关瞬时的信息
				tableList: [], //瞬时列表
				nowZhgyServerName: "" ,		//瞬时数据的子服务器搜索框
				nowEnterpriceName: "" ,		//瞬时数据的企业搜索框
				saveNowServerNameInfo: null,  	//瞬时保存被选中的子服务器信息
				//有关日数据的信息
				dayList: [],   			//日数据列表
				dayData: ''  ,			//日数据时间搜索框值
				dayZhgyServerName: "",	//日数据的子服务器搜索框
				dayEnterpriceName: "",	//日数据的企业搜索框	
				saveDayServerNameInfo: null,  	//日数据保存被选中的子服务器信息
				//有关月数据的信息
				monthList: [],   	//月数据列表	
				monthData: '' ,		//月数据时间搜索框值		
				monthZhgyServerName: "",	//月数据的子服务器搜索框
				monthEnterpriceName: "",	//月数据的企业搜索框	
				saveMonthServerNameInfo: null,  	//月数据保存被选中的子服务器信息									
				num: null,  //区分日期选择器的标识 1:日时间 2:月时间
				//日期选择器需要的属性
				type: 1,
				startYear: 1980,
				endYear: 2030,
				cancelColor: "#888",
				color: "#5677fc",
				setDateTime: "",
				result: "",
				//监听tabs手动滚动
				flag: 0,
				text: '',
				lastX: 0,
				intervalID: null //定时器id
			}
		},
		onLoad() {
			this.getNowDataList();
			this.getNowDataNameList();
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
			handletouchmove: function(event) {
			            // console.log(event)
			            if (this.flag !== 0) {
			                return;
			            };
			            let currentX = event.touches[0].pageX;
			            let tx = currentX - this.lastX;
			            let text = '';
			            this.mindex = -1;
			            //左右方向滑动
			                if (tx < 0) {
			                    text = '向左滑动';
			                    this.flag = 1;
								if(this.current == 2) return;
								else this.current++;
								this.scrollToView = "box" + this.current;
			                //  this.getList();  //调用列表的方法
			                } else if (tx > 0) {
			                    text = '向右滑动';
			                    this.flag = 2;
								if(this.current == 0) return;
								else this.current--;
								this.scrollToView = "box" + this.current;
			                }
			            //将当前坐标进行保存以进行下一次计算
			            this.lastX = currentX;
			            this.text = text;
			        },
			        handletouchstart: function(event) {
			            this.lastX = event.touches[0].pageX;
			        },
			        handletouchend: function(event) {
			            this.flag = 0;
			            this.text = '没有滑动';
			        },
			// 日期选择器
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
			// 瞬时获取选中的子服务器
			zhgyServerNameListChange:function(e){
			    this.nowZhgyServerName = this.ZhgyServerNameList[e.detail.value].name;
				this.saveNowServerNameInfo = this.ZhgyServerNameList[e.detail.value];
			},
			// 瞬时获取选中的企业名
			ZhgyEnterpriceNameListChange:function(e){
			    this.nowEnterpriceName = this.ZhgyEnterpriceNameList[e.detail.value].name;
			},
			// 日数据获取选中的子服务器
			dayzhgyServerNameListChange:function(e){
			    this.dayZhgyServerName = this.ZhgyServerNameList[e.detail.value].name;
				this.saveDayServerNameInfo = this.ZhgyServerNameList[e.detail.value];
			},
			// 日数据获取选中的企业名
			dayZhgyEnterpriceNameListChange:function(e){
			    this.dayEnterpriceName = this.ZhgyEnterpriceNameList[e.detail.value].name;
			},
			// 月数据获取选中的子服务器
			monthzhgyServerNameListChange:function(e){
			    this.monthZhgyServerName = this.ZhgyServerNameList[e.detail.value].name;
				this.saveMonthServerNameInfo = this.ZhgyServerNameList[e.detail.value];
			},
			// 月数据获取选中的企业名
			monthZhgyEnterpriceNameListChange:function(e){
			    this.monthEnterpriceName = this.ZhgyEnterpriceNameList[e.detail.value].name;
			},
			//瞬时、日、月数据页面切换
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					this.scrollToView = "box" + e.currentIndex;
				};
			},
			//获取瞬时数据的子服务器列表和企业列表
			getNowDataNameList(){
				let _this = this;
				let data1 = {
					size: 100,
					pc: storage.getMyInfo().pc 
				};
				api.NowDataZhgyServerList(data1,res=>{
					let data = api.getData(res);
					let code = api.getCode(res);
					if(code === 0){
						_this.ZhgyServerNameList = data;
					}
				});
				api.NowDataZhgyEnterpriceList(data1,res=>{
					let data = api.getData(res);
					let code = api.getCode(res);
					if(code === 0){
						_this.ZhgyEnterpriceNameList = data;;
					}
				});

			},
			//搜索指定子服务器和企业的数据获取瞬时数据
			searchNow(){
				let _this = this;
				uni.showLoading({
				    title: '加载中',
					success() {
						let data = {
							page: 1,
							limit: 200,
							pc: storage.getMyInfo().pc,
							serverId: _this.saveNowServerNameInfo == "" ? null : _this.saveNowServerNameInfo.id,
							enterpriceName: _this.nowEnterpriceName == "" ? null : _this.nowEnterpriceName
						}
						api.NowDataList(data, res=>{
							let data1 = api.getData(res);
							let code = api.getCode(res);
							if(code === 0){
								_this.tableList = data1;
								uni.hideLoading();
							}
						});
					}
				});
			},
			//获取瞬时数据列表（每20秒获取一次）
			getNowDataList(){
				if(this.current != 0) return;
				this.tableList = [];
				let _this = this;
				api.NowDataList({
					page: 1,
					limit: 200,
					pc: storage.getMyInfo().pc
				},res=>{
					let code = api.getCode(res);
					let data = api.getData(res);
					if(code === 0){
						data.forEach(function(item, index){
							_this.tableList.push(item);
						});
						// for(let i=0; i<data.length; i++){
						// 	_this.tableList.push(data[i]);
						// 	if(_this.tableList.length == data.length) uni.hideLoading();
						// }
					}
				});
			},
			//获取日数据列表
			dayDataList(){
				if(this.dayData === '') return;
				let _this = this;
				uni.showLoading({
					title: '加载中',
					success() {
						_this.dayList = [];
						api.DayDataList({
						    date: _this.dayData,
							pc: storage.getMyInfo().pc,
							serverId: _this.saveDayServerNameInfo == "" ? null : _this.saveDayServerNameInfo.id,
							enterpriceName: _this.dayEnterpriceName == "" ? null : _this.nowEnterpriceName
						},res=>{
							let code = api.getCode(res);
							let data = api.getData(res);
							if(code === 0){
								data.forEach(function(item, index){
									 item.hour = "";
									_this.dayList.push(item);
									if(index == data.length -1) uni.hideLoading();
								});
								for(let i = 0; i < _this.hourList.length; i++){
									_this.dayList[i].hour = _this.hourList[i];
								};
							};
						});
					}
				});
			},
			//获取月数据列表
			monthDataList(){
				if(this.monthData === '') return;
				let _this = this;
				uni.showLoading({
				    title: '加载中',
					success() {
						_this.monthList = [];
						api.MonthDataList({
						    date: _this.monthData,
							pc: storage.getMyInfo().pc,
							serverId: _this.saveMonthServerNameInfo == "" ? null : _this.saveMonthServerNameInfo.id,
							enterpriceName: _this.monthEnterpriceName == "" ? null : _this.monthEnterpriceName
						},res=>{
							let code = api.getCode(res);
							let data = api.getData(res);
							if(code === 0){
								data.forEach(function(item, index){
									_this.monthList.push(item);
									if(index == data.length -1) uni.hideLoading();									
								});
							};
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
		justify-content:center;
		padding: 40rpx 100rpx;
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
		font-size:16px;
		color:#01AAED;
		margin-top:10rpx;
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
		font-size:14px;
		margin:0 auto;
		width:200rpx;
	}
	.day, .month{
		display:flex;
		flex-direction:row;
		align-items:center;
		justify-content:space-between;
		font-size:18px;
		width:100%;
		margin-bottom:40rpx;
	}
</style>
