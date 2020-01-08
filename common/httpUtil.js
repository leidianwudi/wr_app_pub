import config from '@/static/app/config.js';
import tran from '@/common/tran.js';
import util from '@/common/util.js';
//http操作工具类
module.exports = {
	//进行http的post请求
	post: function(url, postData, funSuccess, headData = null) {
		let head = !util.isEmpty(headData) ? headData : {'Content-Type': 'application/x-www-form-urlencoded'};
		uni.request({
			url: config.baseUrl + '/api/' + url,
			method: 'post',
			dataType: 'json',
			data: postData,
			success: funSuccess
		});
	},
 
	//上传文件  url:服务器地址 path:本地文件路径 name:上传文件名称 funSuccess:成功时的回调函数
	upload: function(url, path, name, funSuccess) {
		uni.uploadFile({
			url: config.baseUrl  + url, //文件上传地址
			filePath: path,
			name: name,
			success: (res) => {
				let data = tran.json2Obj(res.data);
				funSuccess(data);
			}
		});
	}
}
