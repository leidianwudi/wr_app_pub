<template>
	<view class="content" style="background-color: #fff;">
		<form @submit="formSubmit" @reset="formReset">
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title"><text class="necessary">*</text>运维类别</view>
					<radio-group class="radio-group" name="operationType">
						<label class="tui-radio radio_bottom">
							<radio value="1" color="#5677fc"/>设备标定
						</label>
						<label class="tui-radio radio_bottom">
							<radio value="2" color="#5677fc"/>设备清洗
						</label>
						<label class="tui-radio radio_bottom">
							<radio value="3" color="#5677fc"/>备注校准
						</label>
						<label class="tui-radio">
							<radio value="4" color="#5677fc"/>设备故障提示
						</label>
						<label class="tui-radio">
							<radio value="5" color="#5677fc"/>日常运维
						</label>
					</radio-group>
				</view>
			</tui-list-cell>
			
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title"><text class="necessary">*</text>数据因子</view>
					<checkbox-group @change="getDataType" class="checkbox-group" name="dataType">
						<label class="checkbox">
							<checkbox value="COD" />
							<text>COD</text>
						</label>
						<label class="checkbox">
							<checkbox value="氨氮" />
							<text>氨氮</text>
						</label>
						<label class="checkbox">
							<checkbox value="SS" />
							<text>SS</text>
						</label>
						<label class="checkbox">
							<checkbox value="PH" />
							<text>HP</text>
						</label>
					</checkbox-group>
				</view>
			</tui-list-cell>
			
			<view class="people_info">
				<text v-if="cod || andan || ss || ph"><text class="necessary">*</text>正确值：</text>
				<view class="correct">
					<view class="COD" v-if="cod ? true : false">
						<text class="margin_T correct_name">COD：</text>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" @tap="show('codStart')" v-model="codstartTime"
							 placeholder="开始时间" :disabled="true" />
							<input type="text" value="" v-model="codStartInputMsg" placeholder="输入开始正确值" class="margin_T infoWidth" />
						</view>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="codendTime" placeholder="结束时间" @tap="show('codEnd')" :disabled="true" />
							<input type="text" value="" v-model="codEndInputMsg" class="margin_T infoWidth" placeholder="输入结束正确值" />
						</view>
					</view>
			
					<view class="" v-if="andan ? true : false">
						<text class="margin_T correct_name">氨氮：</text>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="andanstartTime" placeholder="开始时间" @tap="show('andanStart')" :disabled="true"/>
							<input type="text" value="" v-model="andanStartInputMsg" placeholder="输入开始正确值" class="margin_T infoWidth" />
						</view>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="andanendTime" placeholder="结束时间" @tap="show('andanEnd')" :disabled="true"/>
							<input type="text" value="" v-model="andanEndInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth" />
						</view>
					</view>
			
					<view class="SS" v-if="ss ? true : false">
						<text class="margin_T correct_name">SS：</text>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="ssstartTime" placeholder="开始时间" @tap="show('ssStart')" :disabled="true"/>
							<input type="text" value="" v-model="ssStartInputMsg" placeholder="输入开始正确值" class="margin_T infoWidth" />
						</view>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="ssendTime" placeholder="结束时间" @tap="show('ssEnd')" :disabled="true"/>
							<input type="text" value="" v-model="ssEndInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth" />
						</view>
					</view>
					<view class="PH" v-if="ph ? true : false">
						<text class="margin_T correct_name">PH：</text>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="phstartTime" placeholder="开始时间" @tap="show('phStart')" :disabled="true" />
							<input type="text" value="" v-model="phStartInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth" />
						</view>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="phendTime" placeholder="结束时间" @tap="show('phEnd')" :disabled="true" />
							<input type="text" value="" v-model="phEndInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth" />
						</view>
					</view>
				</view>
			</view>
			
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title"><text class="necessary">*</text>开始时间</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="startTime" 
					placeholder="请选择开始时间" maxlength="50" type="text" @tap="show(1)" v-model="beginInfo" :disabled="true"/>
				</view>
			</tui-list-cell>
			
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title"><text class="necessary">*</text>结束时间</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="endTime" 
					placeholder="请选择结束时间" maxlength="50" type="text" @tap="show(2)" v-model="result" :disabled="true"/>
				</view>
			</tui-list-cell>
			
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title"><text class="necessary">*</text>报备人</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="reportName" placeholder="请输入报备人" 
					maxlength="50" type="text" v-model="name" />
				</view>
			</tui-list-cell>
			
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title"><text class="necessary">*</text>报备人手机</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="reportPhone" placeholder="请输入报备人手机" 
					maxlength="50"  v-model="phone" />
				</view>
			</tui-list-cell>
			
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title"><text class="necessary">*</text>报备信息</view>
					<textarea placeholder-class="tui-phcolor" class="tui-input" name="reportInfo" placeholder="请输入报备信息" 
					 type="text" v-model="info" auto-height />
				</view>
			</tui-list-cell>
			
			<tui-list-cell :hover="false">
				<view class="tui-line-cell" style="flex-direction: row;">
					<view class="tui-title">附件</view>
					<button type="primary" class="flie" @tap="submitFlie"><m-icon type="plusempty" color="#fff" size="20"></m-icon>附件上传</button>
				</view>
			</tui-list-cell>
			
			<block class="box" style="margin:0 auto;">
				<t-table style="width:100%;">
						<t-tr style="display: flex;">
							<t-th style="flex:1;">文件名</t-th>
							<t-th style="flex:1;">大小</t-th>
							<t-th style="flex:1;">操作</t-th>
						</t-tr>
					<t-tr v-for="(item, index) in flieList" :key="index" style="display: flex;">
						<t-td style="flex:1;">{{ item.fileOriginalName|fileNameFormat }}</t-td> 
						<t-td style="flex:1;">{{ item.fileSize|sizeFormat }}kb</t-td>
						<t-td style="text-decoration:underline;flex:1;">
							<text @tap.stop="delFlie(index)">删除</text>
						</t-td>
					</t-tr>
				</t-table>
			</block>
			
			<button type="primary" class="submit" formType="submit">立即提交</button>
		</form>
		<view class="main">
			<!-- 运维类别单选 -->
<!-- 			<view class="uni-title uni-common-mt title" style="font-size:16px;">*运维类别：</view>
			<view class="info">
				<radio-group @change="getType">
					<label class="radio">
						<radio value="1" />设备标定</label>
					<label class="radio">
						<radio value="2" />设备清洗</label>
					<label class="radio">
						<radio value="3" />备注校准</label>
					<label class="radio">
						<radio value="4" />设备故障提示</label>
					<label class="radio">
						<radio value="5" />日常运维</label>
				</radio-group>
			</view> -->
			<!-- 数据因子多选 -->
<!-- 			<view class="uni-title uni-common-mt title" style="font-size:16px;">*数据因子：</view>
			<view class="info">
				<checkbox-group @change="getDataType">
					<label>
						<checkbox value="COD" />
						<text>COD</text>
					</label>
					<label>
						<checkbox value="氨氮" />
						<text>氨氮</text>
					</label>
					<label>
						<checkbox value="SS" />
						<text>SS</text>
					</label>
					<label>
						<checkbox value="PH" />
						<text>HP</text>
					</label>
				</checkbox-group>
			</view> -->
<!-- 			<view class="people_info">
				<text v-if="cod || andan || ss || ph">*正确值：</text>
				<view class="correct">
					<view class="COD" v-if="cod ? true : false">
						<text class="margin_T correct_name">COD：</text>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" @tap="show('codStart')" v-model="codstartTime"
							 placeholder="开始时间" :disabled="true" />
							<input type="text" value="" v-model="codStartInputMsg" placeholder="输入开始正确值" class="margin_T infoWidth" />
						</view>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="codendTime" placeholder="结束时间" @tap="show('codEnd')" :disabled="true" />
							<input type="text" value="" v-model="codEndInputMsg" class="margin_T infoWidth" placeholder="输入结束正确值" />
						</view>
					</view>

					<view class="" v-if="andan ? true : false">
						<text class="margin_T correct_name">氨氮：</text>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="andanstartTime" placeholder="开始时间" @tap="show('andanStart')" :disabled="true"/>
							<input type="text" value="" v-model="andanStartInputMsg" placeholder="输入开始正确值" class="margin_T infoWidth" />
						</view>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="andanendTime" placeholder="结束时间" @tap="show('andanEnd')" :disabled="true"/>
							<input type="text" value="" v-model="andanEndInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth" />
						</view>
					</view>

					<view class="SS" v-if="ss ? true : false">
						<text class="margin_T correct_name">SS：</text>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="ssstartTime" placeholder="开始时间" @tap="show('ssStart')" :disabled="true"/>
							<input type="text" value="" v-model="ssStartInputMsg" placeholder="输入开始正确值" class="margin_T infoWidth" />
						</view>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="ssendTime" placeholder="结束时间" @tap="show('ssEnd')" :disabled="true"/>
							<input type="text" value="" v-model="ssEndInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth" />
						</view>
					</view>
					<view class="PH" v-if="ph ? true : false">
						<text class="margin_T correct_name">PH：</text>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="phstartTime" placeholder="开始时间" @tap="show('phStart')" :disabled="true" />
							<input type="text" value="" v-model="phStartInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth" />
						</view>
						<view class="correct_info">
							<input class="margin_T timeWidth" type="text" value="" v-model="phendTime" placeholder="结束时间" @tap="show('phEnd')" :disabled="true" />
							<input type="text" value="" v-model="phEndInputMsg" placeholder="输入结束正确值" class="margin_T infoWidth" />
						</view>
					</view>
				</view>
			</view> -->
			<!-- 选择时间 -->
<!-- 			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*开始时间：</view>
				<view class="date_1">
					<input type="text" value="" @tap="show(1)" v-model="beginInfo" :disabled="true" />
				</view>
			</view>
			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*结束时间：</view>
				<view class="date_1">
					<input type="text" value="" @tap="show(2)" v-model="result" :disabled="true" />
				</view>
			</view> -->
			<!-- 报备人 -->
<!-- 			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*报备人：</view>
				<view class="date_1">
					<input type="text" value="" v-model="name" />
				</view>
			</view> -->
			<!-- 报备人手机 -->
<!-- 			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*报备人手机：</view>
				<view class="date_1">
					<input type="text" value="" v-model="phone" />
				</view>
			</view> -->
			<!-- 报备人信息 -->
<!-- 			<view class="input-box">
				<view class="uni-title uni-common-mt date_test">*报备信息：</view>
				<view class="date_1">
					<textarea value="" placeholder=" " v-model="info" style="width:100%;"/>
					</view>
			</view> -->
			<!-- 附件 -->
<!-- 			<view class="input-box submit_flie">
                <view class="flie_bar">
                	<view class="uni-title uni-common-mt date_test">附件：</view>
                	<button type="primary" class="flie" @tap="submitFlie"><m-icon type="plusempty" color="#fff" size="20"></m-icon>附件上传</button>
                </view>
				<block class="box" style="margin:0 auto;">
					<t-table style="width:100%;">
							<t-tr style="display: flex;">
								<t-th style="flex:1;">文件名</t-th>
								<t-th style="flex:1;">大小</t-th>
								<t-th style="flex:1;">操作</t-th>
							</t-tr>
						<t-tr v-for="(item, index) in flieList" :key="index" style="display: flex;">
							<t-td style="flex:1;">{{ item.fileOriginalName|fileNameFormat }}</t-td> 
							<t-td style="flex:1;">{{ item.fileSize|sizeFormat }}kb</t-td>
							<t-td style="text-decoration:underline;flex:1;" @tap="del_flie(index)">删除</t-td>
						</t-tr>
					</t-table>
				</block>
			</view> -->
			
			<!-- <button type="primary" @tap="submit" class="submit">立即提交</button> -->
		</view>
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change"></tui-datetime>
	</view>
</template>

<script>
const form = require("@/common/tui-validation/tui-validation.js");
import tuiDatetime from "@/components/dateTime/dateTime";
import mIcon from "@/components/m-icon/m-icon.vue";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import util from "@/common/util.js";
import tran from "@/common/tran.js";
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';
export default{
	components: {
		tuiDatetime,
		mIcon,
		tTable,
		tTh,
		tTr,
		tTd
	},
	//定义过滤器
	filters:{
		sizeFormat(value){
			let size = value/1024;
			size = size.toFixed(1);
			return size;
		},
		fileNameFormat(value){
			console.log(value);
			let name = value.slice(0, 7);
			return name+"...";
		}
	},
	data() {
		return {
			userEn: null,
			flieList: [], //附件信息列表
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
			dataType: [], //选择的数据因子
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
			
			
			
			
			begTime: "",	//任务开始时间
			endTime: "",	//任务结束时间
		}
	},
	onLoad(){
		this.userEn = storage.getMyInfo();
	},
	methods:{
		//删除附件
		delFlie(index){
			console.log(1);
			let _this = this;
			uni.showModal({
				title:'删除',
				content:'你确定要删除吗？',
				success(res) {
					if(res.confirm)	_this.flieList.splice(index, 1); //删除指定index的附件信息
				}
			})
		},
		// 上传附件
		submitFlie(){
			let _this = this;
			uni.chooseImage({
				sourceType: ["album"],
				success(res){
					for(let i = 0; i < res.tempFilePaths.length; ++i){
						api.uploadFileToCache(res.tempFilePaths[i], {pc: _this.userEn.pc} ,res=>{
							let code = res.errCode;
							let data = res.resp;
							if(code === 0){
								_this.flieList.push(data);
							}
						})
					}
				}
			})
			// api.Upload({},res=>{
				
			// })
		},
		//判断简单数据类型是否为空
		check1(){
			if(util.isEmpty(this.operationType)
			|| util.isEmpty(this.dataType)
			|| util.isEmpty(this.beginInfo)
			|| util.isEmpty(this.result)
			|| util.isEmpty(this.name)
			|| util.isEmpty(this.phone)
			|| util.isEmpty(this.info)){
				return false;
			}
			return true;
		},
		//判断复杂类型是否为空
		check2(){
			for(let i = 0; i < this.dataType.length; ++i){
				let val = this.dataType[i];
				switch (val){
					case "COD":
					{
						if(util.isEmpty(this.codStartInputMsg)
						|| util.isEmpty(this.codEndInputMsg)
						|| util.isEmpty(this.codstartTime)
						|| util.isEmpty(this.codendTime)){
							return false;
						};
					}
					break;
					
					case "氨氮":
					{
						if(util.isEmpty(this.andanStartInputMsg)
						|| util.isEmpty(this.andanEndInputMsg)
						|| util.isEmpty(this.andanstartTime)
						|| util.isEmpty(this.andanendTime)){
							return false;
						};
					}
					break;
					
					case "SS":
					{
						if(util.isEmpty(this.ssStartInputMsg)
						|| util.isEmpty(this.ssEndInputMsg)
						|| util.isEmpty(this.ssstartTime)
						|| util.isEmpty(this.ssendTime)){
							return false;
						};
					}
					break;
					
					case "PH":
					{
						if(util.isEmpty(this.phStartInputMsg)
						|| util.isEmpty(this.phEndInputMsg)
						|| util.isEmpty(this.phstartTime)
						|| util.isEmpty(this.phendTime)){
							return false;
						};
					}
					break;
				}
			}
			return true;
		},
		// 组装被选中的数据因子信息
		getDataInfo(){
			let dataInfo = [];
			for(let i = 0; i < this.dataType.length; ++i){
				let val = this.dataType[i];
				switch (val){
					case "COD":
					{
						let codObj = {};
						codObj.dataType = "COD";
						codObj.startTime = this.codstartTime;
						codObj.endTime = this.codendTime;
						codObj.startValue = this.codStartInputMsg;
						codObj.endValue = this.codEndInputMsg;
						dataInfo.push(codObj);
					}
					break;
					case "氨氮":
					{
						let andanObj = {};
						andanObj.dataType = "氨氮";
						andanObj.startTime = this.andanstartTime;
						andanObj.endTime = this.andanendTime;
						andanObj.startValue = this.andanStartInputMsg;
						andanObj.endValue = this.andanEndInputMsg;
						dataInfo.push(andanObj);
					}
					break;
					case "SS":
					{
						let ssObj = {};
						ssObj.dataType = "氨氮";
						ssObj.startTime = this.ssstartTime;
						ssObj.endTime = this.ssendTime;
						ssObj.startValue = this.ssStartInputMsg;
						ssObj.endValue = this.ssEndInputMsg;
						dataInfo.push(ssObj);
					}
					break;
					case "PH":
					{
						let phObj = {};
						phObj.dataType = "氨氮";
						phObj.startTime = this.phstartTime;
						phObj.endTime = this.phendTime;
						phObj.startValue = this.phStartInputMsg;
						phObj.endValue = this.phEndInputMsg;
						dataInfo.push(phObj);
					}
					break;
				}
			}
			return dataInfo;
		},
		//获取文件列表id
		getFileIds(){
			let ids = "";  //返回的附件列表id数据
			let newFileOpendIds = [];  //存放附件列表id的数组
			this.flieList.forEach(function(item){
				newFileOpendIds.push(item.fileOpendIds); //把附件id添加到数组
			});
			 //  把附件id数组转化为字符串格式
			if(newFileOpendIds.length > 0) ids = tran.arr2Str(newFileOpendIds, ","); 
			
			return ids;
		},
		//提交
		submit(){
			let fileIds = this.getFileIds();  //获取附件列表id
			let info = this.getDataInfo();  //获取正确值列表
			info = tran.obj2Json(info);
			if(this.check1() && this.check2()){
				let str = tran.arr2Str(this.dataType, ",");
				api.addDataReport({
					operationType: this.operationType,
					reportName: this.name,
					reportPhone: this.phone,
					reportInfo: this.info,
					dataType: str,
					dataCorrect: info,
					startTime: this.beginInfo,
					endTime: this.result,
					pc: this.userEn.pc,
					attachFile: fileIds
				},res=>{
					let code = api.getCode(res);
					let msg = api.getMsg(res);
					if(code === 0){
						uni.showModal({
							title: "提示",
							content: "提交成功！",
							showCancel: false,
							success(res) {
								if(res.confirm){
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					}else{
						uni.showToast({
							title: msg,
							image:'/static/img/fail-circle.png',
							duration:2500
						});						
					}
				})
			}else{
				uni.showToast({
					title: "提交数据不完整",
					image:'/static/img/fail-circle.png',
					duration:2500
				});
			}
		},
		//获取数据因子
		getDataType(e){
			this.dataType = e.detail.value;
			this.cod = this.dataType.includes("COD") ? true : false;
			this.andan = this.dataType.includes("氨氮") ? true : false;
			this.ss = this.dataType.includes("SS") ? true : false;
			this.ph = this.dataType.includes("PH") ? true : false;
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
		},
		
		
		
		
		
		formSubmit: function(e) {
			//表单规则
			let rules = [{
				name: "operationType",
				rule: ["required"], //可使用区间，此处主要测试功能
				msg: ["请选择运维类别"]
			}, {
				name: "dataType",
				rule: ["required"], //可使用区间，此处主要测试功能
				msg: ["请输入数据因子信息"]
			}, {
				name: "startTime",
				rule: ["required"],
				msg: ["请输入开始时间"]
			}, {
				name: "endTime",
				rule: ["required"],
				msg: ["请输入结束时间"]
			}, {
				name: "reportName",
				rule: ["required"],
				msg: ["请输入报备人"]
			}, {
				name: "reportPhone",
				rule: ["required"],
				msg: ["请输入报备人手机"]
			}, {
				name: "reportInfo",
				rule: ["required"],
				msg: ["请输入报备信息"]
			}];
			//进行表单检查
			let formData = e.detail.value;
			let checkRes = form.validation(formData, rules);
			//通过表单验证
			if (!checkRes && !util.isEmpty(this.dataType) && this.check2()) {
				let fileIds = this.getFileIds();  //获取附件列表id
				let info = this.getDataInfo();  //获取正确值列表
				info = tran.obj2Json(info);
				let str = tran.arr2Str(this.dataType, ",");
				let data = e.detail.value;
				//将数据转化为对应格式
				data.dataType = str;
				data.dataCorrect = info;
				data.pc = this.userEn.pc;
				data.attachFile = fileIds;

				api.addDataReport(data, (res)=>{
					let code = api.getCode(res);
					let msg = api.getMsg(res);
					if(code === 0){
						uni.showModal({
							title: "提示",
							content: "提交成功！",
							showCancel: false,
							success(res) {
								if(res.confirm){
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					}else{
						uni.showToast({
							title: msg,
							image:'/static/img/fail-circle.png',
							duration:2500
						});						
					}
				});
			} else {
				uni.showToast({
					title: "填写信息不完整",
					icon: "none"
				});
			}
		},
		formReset: function(e) {
			console.log("清空数据")
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
		justify-content:space-between;
		align-items:center;
		margin-bottom:30rpx;
		margin-top:50rpx;
	}
	.submit_flie{
		flex-direction:column;
	}
	.date_test{
		font-size:16px;
		width:36%;
		text-align:right;
	}
	.date_1{
		width:64%;
	}
	.input-box input, .input-box textarea{
		border:1px solid #e6e6e6;
		padding-left:10rpx;
		box-sizing:border-box;
	}
	.input-box textarea{
		width:430rpx;
	}
	.m-icon{
		margin-right:10rpx;
	}
	.people_info{
		font-size:14px;
		padding:10rpx 20rpx;
		background-color: #fff;
	}
	.people_info>text{
		/* color:#949494; */
		color:#000;
	}
	.people_info>text text{
		/* color:#393939; */
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
	.flie_bar{
		display:flex;
		align-items:center;
		margin-bottom:40rpx;
		width:100%;
	}
	.flie{
		font-size:14px;
		background:#1E9FFF;
		border-radius:0;
	}
	.submit{
		background:#009688;
		margin-top:40rpx;
		width:80%;
		font-size:14px;
	}
	.del_flie{
		font-size:14px;
		background:#FF5722;
	}
	.fileOriginalName{
		width:100%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	
	
	
	
	
	
		.tui-line-cell {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
		}
	
		.tui-title {
			line-height: 32rpx;
			min-width: 120rpx;
			flex-shrink: 0;
		}
		
		.uni-list-cell-db,
		.uni-list-cell-right {
			flex: 1;
		}
	
		.tui-input {
			font-size: 32rpx;
			color: #333;
			padding-left: 20rpx;
			flex: 1;
			overflow: visible;
		}
	
		.radio-group {
			margin-left: auto;
			transform: scale(0.8);
			/* transform-origin: 100% center; */
			flex-shrink: 0;
		}
		
		.tui-input {
			font-size: 28rpx;
			color: #333;
			padding-left: 20rpx;
			flex: 1;
			overflow: visible;
		}
	
		.tui-radio {
			display: inline-block;
			/* padding-left: 28rpx; */
			margin-left:20rpx;
			font-size: 36rpx;
			vertical-align: middle;
		}
		.radio_bottom{
			margin-bottom:20rpx;
		}
	
		.tui-phcolor {
			color: #ccc;
			font-size: 28rpx;
			overflow: visible;
		}
	
		.tui-btn-box {
	/* 		padding: 40rpx 50rpx;
			box-sizing: border-box; */
			display:flex;
			align-items:center;
		}
		.tui-btn-box>button{
			width:50%;
			font-size:14px;
		}
		.tui-btn-box>button:nth-child(2){
			background-color: #B5B5B5;
		}
	
		.tui-button-gray {
			margin-top: 30rpx;
		}
	
		.tui-tips {
			padding: 30rpx;
			color: #999;
			font-size: 24rpx;
		}
		
		.necessary{
			color:#D91D37;
			font-weight:bold;
		}
		.checkbox-group{
			display:flex;
			align-items:center;
			padding:10px 10px 0;
			box-sizing:border-box;
			font-size:14px;
		}
		.checkbox{
			margin-left:10px;
		}
		.checkbox>text{
			font-size:14px;
		}
		
		
		input{
			font-size:14px;
		}
</style>
