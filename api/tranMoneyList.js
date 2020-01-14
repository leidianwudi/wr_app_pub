module.exports = {
	tranMoneyList(moneyList){
		let newList = [];
		moneyList.forEach(function(item){
			let newObj = {};
			newObj.COD = item.COD;
			newObj.PH = item.PH;
			newObj.PHMin = item.PHMin;
			newObj.PHMax = item.PHMax;
			
			newObj.SS = item.SS;
			newObj.SSMax = item.SSMax;
			newObj.SSMin = item.SSMin;
			
			newObj.yuLv = item.余氯;
			newObj.yuLvMax = item.余氯Max;
			newObj.yuLvMin = item.余氯Min;

			newObj.hourWater = item.时流量;
			newObj.anDan = item.氨氮;

			newObj.temperature = item.温度;
			newObj.temperatureMax = item.温度Max;
			newObj.temperatureMin = item.温度Min;

			newObj.eleLv = item.电导率;
			newObj.eleLvMax = item.电导率Max;
			newObj.eleLvMin = item.电导率Min;
			newObj.dleAddWater = item.累计流量;
			
			newObj.day = item.day;			
			
			newList.push(newObj);
		});
		return newList;
	}
 }  //42