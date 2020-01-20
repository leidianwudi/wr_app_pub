import util from "@/common/util.js";
module.exports = {
	tranNowList(nowList){
		let newList = [];
		nowList.forEach(function(item){
			let newObj = {};
			newObj.COD = util.dataFormat(item.COD);
			newObj.PH = util.dataFormat(item.PH);
			newObj.SS = util.dataFormat( item.SS);
			newObj.enterpriceId = util.dataFormat(item.enterpriceId);
			newObj.enterpriceName = util.dataFormat(item.enterpriceName);
			newObj.id = util.dataFormat(item.id);
			
			newObj.pId = util.dataFormat(item.pId);
			newObj.zhgyServerId = util.dataFormat(item.zhgyServerId);
			newObj.zhgyServerName = util.dataFormat(item.zhgyServerName);
			newObj.yuLv = util.dataFormat(item.余氯);
			newObj.closeFail = util.dataFormat(item.关阀超时故障);
			
			newObj.closeTimeSet = util.dataFormat(item.关阀超时时间设置);
			newObj.cityEle = util.dataFormat(item.市电);                  //
			newObj.cityFail = util.dataFormat(item.市电故障);
			newObj.openFail = util.dataFormat(item.开阀超时故障);
			newObj.openTimeSet = util.dataFormat(item.开阀超时时间设置);
			
			newObj.allBalance = util.dataFormat(item.总余额);
			newObj.failRst = util.dataFormat(item.故障复位);
			newObj.dayAmount = util.dataFormat(item.日配额);
			newObj.dayAmountRemain = util.dataFormat(item.日配额余量);
			newObj.dayAmountMin = util.dataFormat(item.日配额分);
			
			newObj.dayAmountHour = util.dataFormat(item.日配额时);		
			newObj.time = util.dataFormat(item.时间);
			newObj.millisecond = util.dataFormat(item.毫秒);
			newObj.anDan = util.dataFormat(item.氨氮);
			newObj.waterMoney = util.dataFormat(item.流量吨水收费);
			
			newObj.waterSp = util.dataFormat(item.流量结算间隔);	
			newObj.waterFail = util.dataFormat(item.流量计通讯故障);
			newObj.temperature = util.dataFormat(item.温度);
			newObj.eleLv = util.dataFormat(item.电导率);
			newObj.nowWater = util.dataFormat(item.瞬时流量);
			
			newObj.addWater = util.dataFormat(item.累计流量);
			newObj.networkStatus = util.dataFormat(item.网络状态);	
			newObj.overLimit = util.dataFormat(item.透支额度);		
			newObj.doorOpen = util.dataFormat(item.门禁开);
			newObj.doorCloseTime = util.dataFormat(item.门禁自动关时间);
			
			newObj.gateClose = util.dataFormat(item.阀门关到位);       //
			newObj.gateOpen = util.dataFormat(item.阀门开到位);        //
			newObj.gateControl = util.dataFormat(item.阀门控制模式);	 //
			newObj.gateFail = util.dataFormat(item.阀门故障);         //
			newObj.gateAuto = util.dataFormat(item.阀门自动);         //
			
			newObj.gateFarClose = util.dataFormat(item.阀门远控关);	//
			newObj.gateFarOpen = util.dataFormat(item.阀门远控开);    //
			
			newList.push(newObj);
		});
		return newList;
	}
 }  //42