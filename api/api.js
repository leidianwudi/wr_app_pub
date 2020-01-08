import httpUtil from '@/common/httpUtil.js';
import config from '@/static/app/config.js';
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
		
	//查询瞬时数据
	login: function(postData, funSuccess) 
	{
		let data = {
			"url": config.baseUrl2 + "/admin/login",
			"head":["Content-Type:application/x-www-form-urlencoded"],
			"data": postData,
			"type":"post"
		}
		httpUtil.post('wr/request', data, funSuccess);
	},
	
	//登录
	NowDataList: function(postData, funSuccess)
	{
		let data = {
			"url": config.baseUrl2 + "/zhgyData/NowDataList",
			"head":["Content-Type:application/x-www-form-urlencoded",
					"Referer:" + config.baseUrl2 + "/admin/zhgy/data/nowDataList.html"],
			"data": postData,
			"type":"post"
		}
		httpUtil.post('wr/request', data, funSuccess);
	},
} 
