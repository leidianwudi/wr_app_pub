import util from "@/common/util.js";
module.exports = {
	tranDayList(dayList){
		let newList = [];
		dayList.forEach(function(item){
			let newObj = {};
			newObj.COD = util.dataFormat(item.COD);
			newObj.PH =  util.dataFormat(item.PH);
			newObj.PHMin = util.dataFormat(item.PHMin);
			newObj.PHMax = util.dataFormat(item.PHMax);
			
			newObj.SS = util.dataFormat(item.SS);
			newObj.SSMax = util.dataFormat(item.SSMax);
			newObj.SSMin = util.dataFormat(item.SSMin);
			
			newObj.yuLv = util.dataFormat(item.余氯);
			newObj.yuLvMax = util.dataFormat(item.余氯Max);
			newObj.yuLvMin = util.dataFormat(item.余氯Min);

			newObj.hourWater = util.dataFormat(item.时流量);
			newObj.anDan = util.dataFormat(item.氨氮);

			newObj.temperature = util.dataFormat(item.温度);
			newObj.temperatureMax = util.dataFormat(item.温度Max);
			newObj.temperatureMin = util.dataFormat(item.温度Min);

			newObj.eleLv = util.dataFormat(item.电导率);
			newObj.eleLvMax = util.dataFormat(item.电导率Max);
			newObj.eleLvMin = util.dataFormat(item.电导率Min);
			newObj.dleAddWater = util.dataFormat(item.累计流量);
			
			newList.push(newObj);
		});
		return newList;
	}
 }  //42