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
				<view class="box" id="box0" v-show="dataTye === 0" style="background-color: #fff;">
					<view class="search_column" style="display:flex; align-items:center; justify-content: space-between;">
						<text>子服务器：</text>
						<view class="search_ipt">
							<input type="text" value="" v-model="nowZhgyServerName" placeholder="选择子服务器" :disabled="true" @tap="openDrawer(0)"/>
						</view>
						<view class="sea_btn btn_style">
							<button type="default" @tap="searchNow(0)" hover-class="btn_hover" style="padding: 0;">查询</button>
						</view>
					</view>
							<!-- 瞬时数据企业信息 -->
<!-- 							<view class="enterprise_info">
								<view class="day">
									<text>企业名：</text>
									<picker :range="ZhgyEnterpriceNameList" @change="ZhgyEnterpriceNameListChange" range-key="name">
										<input type="text" value="" v-model="nowEnterpriceName" :disabled="true"/>
									</picker>
								</view>
								<button type="primary" @tap="searchNow">搜索</button>
							</view> -->
							<!-- 瞬时数据信息列表 -->
							<view class="info_lists">
								<uni-collapse ref="add" class="warp">
									<uni-collapse-item v-for="(item, index) in tableList" :key="index" :open="item.open" 
									:title="item.zhgyServerName+'(' + item.enterpriceName + ')'" :time = "item.time" style="background-color: #fff;">
										
										<template v-if="!item.type">
											<text class="content list_bar">
												<text class="before_row"><text class="list_title">瞬时：</text>{{ item.nowWater }}</text>
												<text class="before_row"><text class="list_title">累计：</text>{{ item.addWater }}</text>
												<text class="before_row"><text class="list_title">配额：</text>{{ item.dayAmount }}</text>
											</text>
											
											<text class="content list_bar">
												<text class="before_row"><text class="list_title">用量：</text>{{ item.dayAmountRemain }}</text>
												<text class="before_row"><text class="list_title">余氯：</text>{{ item.yuLv }}</text>
												<text class="before_row"><text class="list_title">氨氮：</text>{{ item.anDan }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">PH：</text>{{ item.PH }}</text>
												<text class=""><text class="list_title list_marginL">COD：</text>{{ item.COD }}</text>
												<text class=""><text class="list_title list_marginL">SS：</text>{{ item.SS }}</text>												
												<text class=""><text class="list_title list_marginL">电导率：</text>{{ item.eleLv }}</text>
											</text>
											
											<text class="content list_bar">
												<text><text class="list_title">温度：</text>{{ item.temperature }}</text>
												<text><text class="list_title list_marginL">阀门自动：</text>{{ item.gateAuto === 1 ? "自动" : "手动" }}</text>
												<text><text class="list_title list_marginL">市电：</text>{{ item.cityEle === 1 ? "市电" : item.cityEle }}</text>
											</text>
											
											<text class="content list_bar">
												<text><text class="list_title">阀门控制模式：</text>{{ item.gateControl === 0 ? "计费模式" : item.gateControl }}</text>
												<text><text class="list_title list_marginL">阀门状态：</text>{{ item.gateOpen === 1 ? "开到位" : "关到位" }}</text>
											</text>
										</template>
										
									</uni-collapse-item>
								</uni-collapse>
							</view>
							<!--加载loadding-->
							<tui-loadmore v-if="nowLoadding" :index="3" type="primary"></tui-loadmore>
							<tui-nomore v-if="!nowPullUpOn"></tui-nomore>
							<!--加载loadding-->
				</view>
				<!-- 日数据界面 -->
				<view class="box" id="box1" v-show="dataTye === 1" style="background-color: #fff;">
					<!-- 日数据信息 -->
					<view class="search_column" style="display:flex; align-items:center; justify-content: space-between;">
						<text>子服务器：</text>
						<view class="search_ipt">
							<input type="text" value="" v-model="dayZhgyServerName" placeholder="选择子服务器" :disabled="true" @tap="openDrawer(1)"/>
						</view>
						<view class="sea_btn btn_style">
							<button type="default" @tap="dayDataList(0)" hover-class="btn_hover" style="padding: 0;">查询</button>
						</view>
					</view>
<!-- 					<view class="enterprise_info">
						<view class="day">
							<text>子服务器：</text>
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
					</view> -->
					<!-- 日数据信息列表 -->
							<view class="info_lists">
								<uni-collapse ref="add" class="warp">
									<uni-collapse-item v-for="(item, index) in dayList" :key="index" :open="item.open" 
									:title="dayZhgyServerName+'(' + dayEnterpriceName + ')'" :time = "item.hour" style="background-color: #fff;">
										<template v-if="!item.type">
											<text class="content list_bar">
												<text class="before_row"><text class="list_title">时流量：</text>{{ item.hourWater }}</text>
												<text class="before_row"><text class="list_title">累计流量：</text>{{ item.dleAddWater }}</text>
											</text>
											
											<text class="content list_bar">
												<text class="before_row"><text class="list_title">COD：</text>{{ item.COD }}</text>
												<text class="list_row"><text class="list_title">氨氮：</text>{{ item.anDan }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">SS：</text>{{ item.SS }}</text>
												<text class=""><text class="list_title list_marginL">SS最大：</text>{{ item.SSMax }}</text>
												<text class=""><text class="list_title list_marginL">SS最小：</text>{{ item.SSMin }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">余氯：</text>{{ item.yuLv }}</text>
												<text class=""><text class="list_title list_marginL">余氯最大：</text>{{ item.yuLvMax }}</text>												
												<text class=""><text class="list_title list_marginL">余氯最小：</text>{{ item.yuLvMin }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">电导：</text>{{ item.eleLv }}</text>
												<text class=""><text class="list_title list_marginL">电导最大：</text>{{ item.eleLvMax }}</text>												
												<text class=""><text class="list_title list_marginL">电导最小：</text>{{ item.eleLvMin }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">温度：</text>{{ item.temperature }}</text>
												<text class=""><text class="list_title list_marginL">温度最大：</text>{{ item.temperatureMax }}</text>												
												<text class=""><text class="list_title list_marginL">温度最小：</text>{{ item.temperatureMin }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">PH：</text>{{ item.PH }}</text>
												<text class=""><text class="list_title list_marginL">PH最大：</text>{{ item.PHMax }}</text>												
												<text class=""><text class="list_title list_marginL">PH最小：</text>{{ item.PHMin }}</text>
											</text>
										</template>
										
									</uni-collapse-item>
								</uni-collapse>
							</view>
							<!--加载loadding-->
							<tui-loadmore v-if="dayLoadding" :index="3" type="primary"></tui-loadmore>
							<tui-nomore v-if="!dayPullUpOn"></tui-nomore>
							<!--加载loadding-->
				</view>
				<!-- 月数据界面 -->
				<view class="box" id="box2" v-show="dataTye === 2" style="background-color: #fff;">
					<!-- 月数据信息 -->
					<view class="search_column" style="display:flex; align-items:center; justify-content: space-between;">
						<text>子服务器：</text>
						<view class="search_ipt">
							<input type="text" value="" v-model="monthZhgyServerName" placeholder="选择子服务器" :disabled="true" @tap="openDrawer(2)"/>
						</view>
						<view class="sea_btn btn_style">
							<button type="default" @tap="monthDataList(0)" hover-class="btn_hover" style="padding: 0;">查询</button>
						</view>
					</view>
<!-- 					<view class="enterprise_info">
						<view class="month">
							<text>子服务器：</text>
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
					</view> -->
					<!-- 月数据信息列表 -->
						<view class="info_lists">
							<uni-collapse ref="add" class="warp">
								<uni-collapse-item v-for="(item, index) in monthList" :key="index" :open="item.open" 
								:title="monthZhgyServerName+'(' + monthEnterpriceName + ')'" :time = "item.day + '日'" style="background-color: #fff;">

										<template v-if="!item.type">
											<text class="content list_bar">
												<text class="before_row"><text class="list_title">时流量：</text>{{ item.hourWater }}</text>
												<text class="before_row"><text class="list_title">累计流量：</text>{{ item.dleAddWater }}</text>
											</text>
											
											<text class="content list_bar">
												<text class="before_row"><text class="list_title">COD：</text>{{ item.COD }}</text>
												<text class="list_row"><text class="list_title">氨氮：</text>{{ item.anDan }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">SS：</text>{{ item.SS }}</text>
												<text class=""><text class="list_title list_marginL">SS最大：</text>{{ item.SSMax }}</text>
												<text class=""><text class="list_title list_marginL">SS最小：</text>{{ item.SSMin }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">余氯：</text>{{ item.yuLv }}</text>
												<text class=""><text class="list_title list_marginL">余氯最大：</text>{{ item.yuLvMax }}</text>												
												<text class=""><text class="list_title list_marginL">余氯最小：</text>{{ item.yuLvMin }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">电导：</text>{{ item.eleLv }}</text>
												<text class=""><text class="list_title list_marginL">电导最大：</text>{{ item.eleLvMax }}</text>												
												<text class=""><text class="list_title list_marginL">电导最小：</text>{{ item.eleLvMin }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">温度：</text>{{ item.temperature }}</text>
												<text class=""><text class="list_title list_marginL">温度最大：</text>{{ item.temperatureMax }}</text>												
												<text class=""><text class="list_title list_marginL">温度最小：</text>{{ item.temperatureMin }}</text>
											</text>
											
											<text class="content list_bar">
												<text class=""><text class="list_title">PH：</text>{{ item.PH }}</text>
												<text class=""><text class="list_title list_marginL">PH最大：</text>{{ item.PHMax }}</text>												
												<text class=""><text class="list_title list_marginL">PH最小：</text>{{ item.PHMin }}</text>
											</text>
										</template>
									
								</uni-collapse-item>
							</uni-collapse>
						</view>
						<!--加载loadding-->
						<tui-loadmore v-if="monthLoadding" :index="3" type="primary"></tui-loadmore>
						<tui-nomore v-if="!monthPullUpOn"></tui-nomore>
						<!--加载loadding-->
				</view>
		<!-- </scroll-view> -->
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change" style="z-index:100000;"></tui-datetime>
		 
		 <tui-drawer mode="right" :visible="rightDrawer" @close="closeDrawer" style="z-index:999;">
		 	<view class="d-container">
		 				<view class="" style="width:100%; text-align: center; color:#F57341;" v-show="drawerType == 0"><text>瞬间数据</text></view>
		 				<view class="" style="width:100%; text-align: center; color:#F57341;" v-show="drawerType == 1"><text>日数据</text></view>
		 				<view class="" style="width:100%; text-align: center; color:#F57341;" v-show="drawerType == 2"><text>月数据</text></view>
		 				<view class="search_time">
		 					<view class="search_test">
		 						<text>子服务器</text>
		 					</view>
		 					<view class="">
		 						<picker :range="ZhgyServerNameList" @change="zhgyServerNameListChange" range-key="name">
		 							<input type="text" value="" v-model="selZhgyServerName" :disabled="true"/>
		 						</picker>
		 					</view>
		 				</view>
		 				<view class="search_time">
		 					<view class="search_test">
		 						<text>企业名</text>
		 					</view>
		 					<view class="">
		 						<picker :range="ZhgyEnterpriceNameList" @change="ZhgyEnterpriceNameListChange" range-key="name">
		 							<input type="text" value="" v-model="selEnterpriceName" :disabled="true"/>
		 						</picker>
		 					</view>
		 				</view>
						<view class="search_time" v-show="drawerType != 0">
							<view class="search_test">
								<text>日期</text>
							</view>
							<view class="">
								<input type="text" value="" @tap="onDay(1)" v-model="selDayData" :disabled="true" v-show="drawerType == 1"/>
								<input type="text" value="" @tap="onDay(2)" v-model="selMonthData" :disabled="true" v-show="drawerType == 2"/>
							</view>
						</view>
		 				<view class="search_btn btn_style">
		 					<button type="default" @tap="search" hover-class="btn_hover">确定</button>
		 				</view>
		 			</view>
		 </tui-drawer>
		 
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
	import api from '@/api/api.js';
	import storage from '@/api/storage.js';;
    import tranNowList from "@/api/tranNowList.js";
	import tranDayList from "@/api/tranDayList.js";
	import tranMoneyList from "@/api/tranMoneyList.js";
	import tuiDatetime from "@/components/dateTime/dateTime";
	import util from "@/common/util.js";
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
	import tuiDrawer from "@/components/tui-drawer/tui-drawer.vue";
	import tuiLoadmore from "@/components/tui-loadmore/tui-loadmore.vue";
	import tuiNomore from "@/components/tui-nomore/tui-nomore.vue";
	export default {
		components: {
			uniSegmentedControl,
			tuiDatetime,
			uniCollapse,
			uniCollapseItem,
			tuiDrawer,
			tuiLoadmore,
			tuiNomore
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
				nowLoadding: false, //瞬间数据加载数据提示
				nowPullUpOn: true,  //瞬间数据上拉加载数据
				nowDataPage: 1,   //瞬时数据页数
				
				//有关日数据的信息
				dayList: [],   			//日数据列表
				dayData: ''  ,			//日数据时间搜索框值
				dayZhgyServerName: "",	//日数据的子服务器搜索框
				dayEnterpriceName: "",	//日数据的企业搜索框	
				saveDayServerNameInfo: null,  	//日数据保存被选中的子服务器信息
				dayLoadding: false, //日数据加载数据提示
				dayPullUpOn: true,  //日数据上拉加载数据
				dayDataPage: 1,   //日数据页数
				
				//有关月数据的信息
				monthList: [],   	//月数据列表	
				monthData: '' ,		//月数据时间搜索框值		
				monthZhgyServerName: "",	//月数据的子服务器搜索框
				monthEnterpriceName: "",	//月数据的企业搜索框	
				saveMonthServerNameInfo: null,  	//月数据保存被选中的子服务器信息
				monthLoadding: false, //月数据加载数据提示
				monthPullUpOn: true,  //月数据上拉加载数据
				monthDataPage: 1,   //月数据页数
		
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
				intervalID: null, //定时器id
				dataTye: 0 ,//控制瞬时，日，月数据页面切换的参数
				
				
				rightDrawer: false,//抽屉开关
				drawerType: 0,  //抽屉类型 0：瞬时数据 1：日数据 2：月数据
				selZhgyServerName: "",   //抽屉选中的子服务器
				selEnterpriceName: "",   //抽屉选中的企业名
				selDayData: null,   //抽屉选中的日数据日期
				selMonthData: null,   //抽屉选中的月数据日期
			}
		},
		onLoad() {
			this.getNowDataNameList();
			//this.myTimerOpen();
			//this.searchNow(0);
		},
		onUnload() {
			this.myTimerStop();  //关闭瞬时数据请求定时器
		},
		methods: {
			//抽屉搜索按钮
			search(){
				if(this.drawerType == 0) this.searchNow(0);  //查询瞬时数据
				if(this.drawerType == 1) this.dayDataList(0);  //查询日数据
				if(this.drawerType == 2) this.monthDataList(0);  //查询月数据
			},
			//关闭抽屉
			closeDrawer(e) {
				this.rightDrawer = false;
			},
			//打开抽屉
			openDrawer(type) {
				this.rightDrawer = true;
				//抽屉类型 0：瞬时数据 1：日数据 2：月数据
				switch (type){
					case 0:
						this.drawerType =  type;
						this.selZhgyServerName = this.nowZhgyServerName;
						this.selEnterpriceName = this.nowEnterpriceName;
						break;
					case 1:
						this.drawerType =  type;
						this.selZhgyServerName = this.dayZhgyServerName;
						this.selEnterpriceName = this.dayEnterpriceName;
						break;
					case 2:
						this.drawerType =  type;
						this.selZhgyServerName = this.monthZhgyServerName;
						this.selEnterpriceName = this.monthEnterpriceName;
						break;
					default:
						break;
				}
			},
			
			//普通上拉刷新
			onPullDownRefresh: function() {
				if(this.drawerType == 0){
					//延时为了看效果
					setTimeout(() => {
						this.searchNow(0);  //查询瞬时数据
						this.nowPullUpOn = true;
						this.nowLoadding = false;
					}, 200)
				}else if(this.drawerType == 1){
					//延时为了看效果
					setTimeout(() => {
						this.dayDataList();  //查询日数据
						this.dayPullUpOn = true;
						this.dayLoadding = false;
					}, 200)
				}else if(this.drawerType == 2){
					//延时为了看效果
					setTimeout(() => {
						this.monthDataList();  //查询月数据
						this.monthPullUpOn = true;
						this.monthLoadding = false;
					}, 200)
				}
			},
			
			//每20秒自动获取一次瞬时数据
			myTimerOpen(){
				this.intervalID = setInterval(this.getNowDataList.bind(this), 20000);
			},
			//关闭瞬时数据请求定时器
			myTimerStop() {
			    clearInterval(this.intervalID);
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
						this.type = 2;
						break;
					case 2:
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
				if(this.num === 1) 	this.selDayData = e.result;
				if(this.num === 2)  this.selMonthData = e.result;
			},
			// 瞬时获取选中的子服务器
			zhgyServerNameListChange:function(e){
			    this.selZhgyServerName = this.ZhgyServerNameList[e.detail.value].name;
				this.saveNowServerNameInfo = this.ZhgyServerNameList[e.detail.value];
				
				if(this.drawerType == 0) this.nowZhgyServerName = this.selZhgyServerName;
				if(this.drawerType == 1) this.dayZhgyServerName = this.selZhgyServerName;
				if(this.drawerType == 2) this.monthZhgyServerName = this.selZhgyServerName;
			},
			// 瞬时获取选中的企业名
			ZhgyEnterpriceNameListChange:function(e){
			    this.selEnterpriceName = this.ZhgyEnterpriceNameList[e.detail.value].name;
				
				if(this.drawerType == 0) this.nowEnterpriceName = this.selEnterpriceName;
				if(this.drawerType == 1) this.dayEnterpriceName = this.selEnterpriceName;
				if(this.drawerType == 2) this.monthEnterpriceName = this.selEnterpriceName;
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
					this.dataTye = e.currentIndex;
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
			//type 搜索方式  0: 普通搜索 1: 上拉获取更多数据
			searchNow(type){
				let _this = this;
				uni.showLoading({
				    title: '加载中',
					mask: true,
					success() {
                        _this.NowDataList(type);
					}
				});
			},
			
			//获取瞬间数据封装
			//type 搜索方式  0: 普通搜索 1: 上拉获取更多数据
			NowDataList(type){
				if(this.nowLoadding) return;
				if(type == 0) this.nowDataPage = 1;
				else{
					++this.nowDataPage;
					this.nowLoadding = true;
				}
				let _this = this;
				let data = {
					page: this.nowDataPage,
					limit: 15,
					pc: storage.getMyInfo().pc
				}
				if(!util.isEmpty(this.saveNowServerNameInfo)) data.serverId = this.saveNowServerNameInfo.id;
				if(!util.isEmpty(this.nowEnterpriceName)) data.enterpriceName =  this.nowEnterpriceName;
				api.NowDataList(data, res=>{
					let data1 = api.getData(res);
					let code = api.getCode(res);
					if(code === 0){
						let data = tranNowList.tranNowList(data1);

						if(util.isEmpty(data)){
							_this.nowLoadding = false;
							_this.nowPullUpOn = false;
						}
						else{
							if(type == 0)
							{
								data.forEach((item, index) =>{
									item.open = false;
								});
								_this.tableList = data;
								uni.showToast({
									title: '刷新成功',
									icon: "none",
								});
								uni.stopPullDownRefresh();
							}
							else
							{
								_this.nowLoadding = false;
								data.forEach((item, index) =>{
									item.open = false;
									_this.tableList.push(item);
								});
							}
						}
						uni.hideLoading();
						_this.closeDrawer();  //关闭抽屉
					}
				});
			},
			
			//获取瞬时数据列表（每20秒获取一次）
			getNowDataList(){
				if(this.current != 0) return;
				this.NowDataList();
			},
			//查询条件不完整提示
			mustSelectInput(){
				uni.showToast({
					title: "查询条件不完整",
					image:'/static/img/fail-circle.png',
					duration:2500
				});	
			},
			//获取日数据列表
			dayDataList(){
				if(util.isEmpty(this.selDayData) || util.isEmpty(this.saveNowServerNameInfo) || util.isEmpty(this.dayEnterpriceName)) {
					this.mustSelectInput();
					return;
				}				
				let _this = this;
				uni.showLoading({
					title: '加载中',
					success() {
						api.DayDataList({
						    date: _this.selDayData,
							pc: storage.getMyInfo().pc,							
							serverId: _this.saveNowServerNameInfo.id,
							enterpriceName: _this.dayEnterpriceName
						},res=>{
							let code = api.getCode(res);
							let data = api.getData(res);
							if(code === 0){								
								let list = tranDayList.tranDayList(data);	
								list.forEach((item, index) =>{
									item.open = false;
								});
								uni.showToast({
									title: '刷新成功',
									icon: "none",
								});
								uni.stopPullDownRefresh();
								uni.hideLoading();
								_this.closeDrawer();  //关闭抽屉
								_this.dayList = list;
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
				if(util.isEmpty(this.selMonthData) ||  util.isEmpty(this.saveNowServerNameInfo) || util.isEmpty(this.monthEnterpriceName)) {
					this.mustSelectInput();
					return;
				}
				let _this = this;
				uni.showLoading({
				    title: '加载中',
					success() {
						api.MonthDataList({
						    date: _this.selMonthData,
							pc: storage.getMyInfo().pc,
							serverId: _this.saveNowServerNameInfo.id,
							enterpriceName: _this.monthEnterpriceName
						},res=>{
							let code = api.getCode(res);
							let data = api.getData(res);
							if(code === 0){
								let list = tranMoneyList.tranMoneyList(data);
								list.forEach((item, index) =>{
									item.open = false;
								});
								uni.showToast({
									title: '刷新成功',
									icon: "none",
								});
								uni.stopPullDownRefresh();
								uni.hideLoading();		
								_this.closeDrawer();  //关闭抽屉
								_this.monthList = list;
							};
						});
					}
				});
			}
		},
		//上拉获取更多数据
		onReachBottom(){
			if (!this.nowPullUpOn) return;
			if(this.drawerType == 0) this.searchNow(1);  //查询瞬时数据
		},
	}
</script>

<style>
	.enterprise_info {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content:center;
		padding: 26rpx 100rpx;
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
	.position{
		font-size:16px;
		color:#01AAED;
		margin-top:10rpx;
	}
	.scrollbox{
		white-space: nowrap;
	}
	.box{
		width:100%;
		/* background:#e3e3e3; */
		display:inline-block;
		vertical-align:top;
	}
	.info_lists{
		margin-top:4rpx;
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
		font-size:15px;
		width:100%;
		margin-bottom:28rpx;
		padding:0 40rpx;
		box-sizing:border-box;
	}
	.day>text,
	.month>text {
		display:inline-block;
		width:35%;
	}
	
	.day>input,
	.month>input {
		flex: 1;
	}

	.day>button,
	.month>button {
		font-size: 12px;
		width:20%;
	}
	.list_bar{
		font-size:14px;
		padding:20rpx;
		color: #808080;
		width:100%;
	}
	.list_title{
		color:#000;
	}
	.list_row{
		width:25%;
		display:inline-block;
	}
	.before_row{
		width:33%;
		display:inline-block
	}
	.list_marginL{
		margin-left:14rpx;
	}
	
	
	/* 搜索栏 */
	input{
		border:none;
	}
	.search_column{
		width:100%;
		display:flex;
		align-items: center;
		justify-content:center;
		margin-top:20rpx;
		font-size:16px;
		padding:0 40rpx 10rpx;
		box-sizing:border-box;
		border-bottom:1px solid #808080;
		background-color: #fff;
	}
	.search_column>text{
		display:inline-block;
		width:40%;
	}
	.search_column input{
		text-align:left;
		font-size:14px;
	}
	.sea_btn button{
		font-size:12px;
		color:#fff;
		width:120rpx;
	}
	
	
	
	/* 抽屉 */
	.d-container{
		padding:40rpx;
		font-size:15px;
	}
	.search_time{
		margin-top:40rpx;
	}
	.search_test{
		margin-bottom:20rpx;
	}
	.d-container input{
		border-bottom:1px solid #808080;
		color:#808080;
	}
	.search_btn{
		margin-top:100rpx;
	}
	.search_btn button{
		font-size:14px;
		color:#fff;
		border-radius:10rpx;
		padding:0 !important;
	}
</style>

