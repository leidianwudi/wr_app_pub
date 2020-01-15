module.exports = {
	tranNowList(nowList){
		let newList = [];
		nowList.forEach(function(item){
			let newObj = {};
			newObj.COD = item.COD;
			newObj.PH = item.PH;
			newObj.SS = item.SS;
			newObj.enterpriceId = item.enterpriceId;
			newObj.enterpriceName = item.enterpriceName;
			newObj.id = item.id;
			
			newObj.pId = item.pId;
			newObj.zhgyServerId = item.zhgyServerId;
			newObj.zhgyServerName = item.zhgyServerName;
			newObj.yuLv = item.余氯;
			newObj.closeFail = item.关阀超时故障;
			
			newObj.closeTimeSet = item.关阀超时时间设置;
			newObj.cityEle = item.市电;
			newObj.cityFail = item.市电故障;
			newObj.openFail = item.开阀超时故障;
			newObj.openTimeSet = item.开阀超时时间设置;
			
			newObj.allBalance = item.总余额;
			newObj.failRst = item.故障复位;
			newObj.dayAmount = item.日配额;
			newObj.dayAmountRemain = item.日配额余量;
			newObj.dayAmountMin = item.日配额分;
			
			newObj.dayAmountHour = item.日配额时;		
			newObj.time = item.时间;
			newObj.millisecond = item.毫秒;
			newObj.anDan = item.氨氮;
			newObj.waterMoney = item.流量吨水收费;
			
			newObj.waterSp = item.流量结算间隔;	
			newObj.waterFail = item.流量计通讯故障;
			newObj.temperature = item.温度;
			newObj.eleLv = item.电导率;
			newObj.nowWater = item.瞬时流量;
			
			newObj.addWater = item.累计流量;
			newObj.networkStatus = item.网络状态;	
			newObj.overLimit = item.透支额度;		
			newObj.doorOpen = item.门禁开;
			newObj.doorCloseTime = item.门禁自动关时间;
			
			newObj.gateClose = item.阀门关到位;
			newObj.gateOpen = item.阀门开到位;
			newObj.gateControl = item.阀门控制模式;	
			newObj.gateFail = item.阀门故障;
			newObj.gateAuto = item.阀门自动;
			
			newObj.gateFarClose = item.阀门远控关;	
			newObj.gateFarOpen = item.阀门远控开;
			
			newList.push(newObj);
		});
		return newList;
	}
 }  //42