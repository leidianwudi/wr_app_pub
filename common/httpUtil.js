import config from '@/static/app/config.js';
import tran from '@/common/tran.js';
import util from '@/common/util.js';
import storage from '@/api/storage.js';
//http操作工具类
module.exports = {
	//上传文件  url:服务器地址 path:本地文件路径 name:上传文件名称 funSuccess:成功时的回调函数
	upload: function(url, path, name, funSuccess) {
		console.log(path);
		console.log(url);
		uni.uploadFile({
			header: {"Content-Type":"multipart/form-data"},
			method: 'post',
			dataType: 'json',
			url: config.baseUrl + '/' + url, //文件上传地址
			//url: 'http://120.25.255.223:8021/api/external/uploadFileToCache',
			filePath: path,
			name: name,
			success: (res) => {
				let data = tran.json2Obj(res.data);
				funSuccess(data);
			}
		});
	},
	
	//进行http的post请求
	post: function(url, postData, funSuccess, headData = null) {
		let _this = this;
		let head = !util.isEmpty(headData) ? headData : {'Content-Type': 'application/x-www-form-urlencoded'};
		uni.request({
			header: {"Content-Type":"application/x-www-form-urlencoded"},
			url: config.baseUrl + "/" + url,
			method: 'post',
			dataType: 'json',
			data: postData,
			success: (res) => {
				_this.middleRes(res);  //执行中间拦截函数
				funSuccess(res);
			}
		});
	},
	
	//进行http的get请求
	get: function(url, getData, funSuccess, headData = null) {
		let _this = this;
		let head = !util.isEmpty(headData) ? headData : {'Content-Type': 'application/x-www-form-urlencoded'};
		uni.request({
			header: {"Content-Type":"application/x-www-form-urlencoded"},
			url: config.baseUrl + "/" + url + getData,
			method: 'get',
			dataType: 'json',
			success: (res) => {
				_this.middleRes(res);  //执行中间拦截函数
				funSuccess(res);
			}
		});
	},
	
	//判断是否被处理
	middleRes(res){
		let code = this.getCode(res);
		if(res.hasOwnProperty("token")){
			this.$store.state.setToken(data.token)
		}
		if(code === -1){
			let msg = this.getMsg(res);
			uni.showModal({
				title:"提示",
				content: msg,
				showCancel: false,
				success(res) {
					if(res.confirm){
						storage.outLogin();
						uni.reLaunch({
							url: '/pages/user/login/login'
						});
					};
				}
			});
		}
	},
	
	//取返回数据内,code数据
	getCode: function(res) {return res.data.errCode},
	
	//取返回数据内,msg数据
	getMsg: function(res) {return res.data.msg},
	
	//取返回数据内,token数据
	getToken: function(res) {return res.data.token}
}
