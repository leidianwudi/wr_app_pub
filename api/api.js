import httpUtil from '@/common/httpUtil.js';
import config from '@/static/app/config.js';
import store from "@/store/store.js";
//网络操作封装
module.exports = {
	//取返回数据内,code数据
	getCode: function(res) {return res.data.errCode},
	
	//取返回数据内,msg数据
	getMsg: function(res) {return res.data.msg},
	
	//取返回数据内,data数据
	getData: function(res) {return res.data.resp},
	
	//获取图片路径
	getFileUrl(postData){
		let url = config.baseUrl + "/File/FetchFile?pc=" + postData.pc + "&openId=" +postData.openId;
		return url;
	},
	
	//取返回数据内,page分页的列表数据.只返回分页列表数据,不返回总页数等数据
	getPageList: function(res) {return res.data.data},
	
	//登录到网关
	loginGate: function(postData, funSuccess) {httpUtil.post('gate/loginGate', postData, funSuccess);},
	
	//上传文件
	uploadFileToCache: function(path, funSuccess) {httpUtil.upload('external/uploadFileToCache', path, 'file', funSuccess);},
		
	//登录
	login: function(postData, funSuccess) 
	{
		httpUtil.post('admin/login', postData, funSuccess);
	},
	
	//查询瞬时数据
	NowDataList: function(postData, funSuccess)
	{
		postData.token = store.state.token;  //添加token
		httpUtil.post('zhgyData/NowDataList', postData, funSuccess);
	},
	
	//查询日数据
	DayDataList: function(postData, funSuccess) 
	{
		let data = "?date=" + postData.date + "&token=" + store.state.token + "&pc=" + postData.pc;
		httpUtil.get('zhgyData/EnterpriceDayDataList', data, funSuccess);
	},
	
	//查询月数据
	MonthDataList: function(postData, funSuccess) 
	{
		if(postData.serverId || postData.enterpriceName){
			let data = "?date=" + postData.date + "&token=" + store.state.token + "&pc=" + postData.pc + "&serverId=" + postData.serverId + "&enterpriceName=" + postData.enterpriceName;
			httpUtil.get('zhgyData/EnterpriceMonthDataList', data, funSuccess);
		}
		else{
			let data = "?date=" + postData.date + "&token=" + store.state.token + "&pc=" + postData.pc;
			httpUtil.get('zhgyData/EnterpriceMonthDataList', data, funSuccess);			
		}
	},
	
	//获取瞬时数据的子服务器列表
	NowDataZhgyServerList: function(postData, funSuccess)
	{
		let data = "?size=" + postData.size + "&token=" + store.state.token + "&pc=" + postData.pc;		
		httpUtil.get('zhgyServer/List', data, funSuccess);
	},
	
	//获取瞬时数据的企业名称列表
	NowDataZhgyEnterpriceList: function(postData, funSuccess)
	{
		let data = "?size=" + postData.size + "&token=" + store.state.token + "&pc=" + postData.pc;	
		httpUtil.get('zhgyEnterprice/List', data, funSuccess);
	},
	
		
	//获取数据报错列表
	zhgyDataHandleList: function(postData, funSuccess)
	{
		postData.token = store.state.token;  //添加token
		httpUtil.post('zhgyDataHandle/List', postData, funSuccess);
	},
	
	//获取数据报错详细信息
	zhgyDataHandle: function(postData, funSuccess)
	{
		let data = "?id=" + postData.id + "&token=" + store.state.token + "&pc=" + postData.pc;			
		httpUtil.get('zhgyDataHandle/Get', data, funSuccess);
	},
	
	//管理员处理数据报错
	editDataReport: function(postData, funSuccess)
	{
		postData.token = store.state.token;  //添加token
		httpUtil.post('zhgyDataHandle/Edit', postData, funSuccess);
	},
	
	//管理员删除数据报错
	dataReport: function(postData, funSuccess)
	{
		let data = "?id=" + postData.id + "&token=" + store.state.token + "&pc=" + postData.pc;		
		httpUtil.get('zhgyDataHandle/Delete', data, funSuccess);
	},
	
	//新增数据报错
	addDataReport: function(postData, funSuccess)
	{
		postData.token = store.state.token;  //添加token
		httpUtil.post('zhgyDataHandle/Add', postData, funSuccess);
	},
	
	//上传附件
	uploadFileToCache: function(path, postData, funSuccess)
	{
		let url = "File/Upload?type=5&pc=" + postData.pc;
		url = "File/Upload";
		httpUtil.upload(url, path, 'file', funSuccess, postData);
	},
	
	//获取待处理数据报错和子服务器数
	getDrHandleAndServerRun: function(postData, funSuccess)
	{
		let data = "?size=100&token=" + store.state.token + "&pc=" + postData.pc;		
		httpUtil.get('zhgyHome/GetHomeData', data, funSuccess);
	},
} 
