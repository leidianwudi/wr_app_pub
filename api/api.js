import httpUtil from '@/common/httpUtil.js';
import config from '@/static/app/config.js';
import store from "@/store/store.js";
//网络操作封装
module.exports = {
	//取返回数据内,code数据
	getCode: function(res) {return res.data.data.errCode},
	
	//取返回数据内,msg数据
	getMsg: function(res) {return res.data.data.msg},
	
	//取返回数据内,data数据
	getData: function(res) {return res.data.data.resp},
	
	//取返回数据内,page分页的列表数据.只返回分页列表数据,不返回总页数等数据
	getPageList: function(res) {return res.data.data.data},
	
	//登录到网关
	loginGate: function(postData, funSuccess) {httpUtil.post('gate/loginGate', postData, funSuccess);},
	
	//上传文件
	uploadFileToCache: function(path, funSuccess) {httpUtil.upload('external/uploadFileToCache', path, 'file', funSuccess);},
		
	//登录
	login: function(postData, funSuccess) 
	{
		let data = {
			"url": config.baseUrl2 + "/admin/login",
			"head":["Content-Type:application/x-www-form-urlencoded"],
			"data": postData,
			"type":"post"
		}
		httpUtil.post('wr/request2', data, funSuccess);
	},
	
	//查询瞬时数据
	NowDataList: function(postData, funSuccess)
	{
		postData.token = store.state.token;  //添加token
		let data = {
			"url": config.baseUrl2 + "/zhgyData/NowDataList",
			"head":["Content-Type:application/x-www-form-urlencoded",
					"Referer:" + config.baseUrl2 + "/admin/zhgy/data/nowDataList.html"],
			"data": postData,
			"type":"post"
		}
		httpUtil.post('wr/request2', data, funSuccess);
	},
	
	//查询日数据
	DayDataList: function(postData, funSuccess) 
	{
		postData.token = store.state.token;  //添加token
		let data = {
			"url": config.baseUrl2 + "/zhgyData/EnterpriceDayDataList",
			"head":["Content-Type:application/x-www-form-urlencoded",
					"Referer:" + config.baseUrl2 + "/admin/zhgy/data/enterpriceDayDataList.html"],
			"data": postData,
			"type":"get"
		}
		httpUtil.post('wr/request2', data, funSuccess);
	},
	
	//查询月数据
	MonthDataList: function(postData, funSuccess) 
	{
		postData.token = store.state.token;  //添加token
		let data = {
			"url": config.baseUrl2 + "/zhgyData/EnterpriceMonthDataList",
			"head":["Content-Type:application/x-www-form-urlencoded",
					"Referer:" + config.baseUrl2 + "/admin/zhgy/data/enterpriceMonthDataList.html"],
			"data": postData,
			"type":"get"
		}
		httpUtil.post('wr/request2', data, funSuccess);
	},
	
	//获取瞬时数据的子服务器列表
	NowDataZhgyServerList: function(postData, funSuccess)
	{
		postData.token = store.state.token;  //添加token
		let data = {
			"url": config.baseUrl2 + "/zhgyServer/List",
			"head":["Content-Type:application/x-www-form-urlencoded",
					"Referer:" + config.baseUrl2 + "/admin/zhgy/data/nowDataList.html"],
			"data": postData,
			"type":"get"
		}
		httpUtil.post('wr/request2', data, funSuccess);
	},
	
	//获取瞬时数据的企业名称列表
	NowDataZhgyEnterpriceList: function(postData, funSuccess)
	{
		postData.token = store.state.token;  //添加token
		let data = {
			"url": config.baseUrl2 + "/zhgyEnterprice/List",
			"head":["Content-Type:application/x-www-form-urlencoded",
					"Referer:" + config.baseUrl2 + "/admin/zhgy/data/nowDataList.html"],
			"data": postData,
			"type":"get"
		}
		httpUtil.post('wr/request2', data, funSuccess);
	},
	
	
} 
