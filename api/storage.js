import util from '@/common/util.js';
import utilCore from '@/api/utilCore.js';

const myInfo 		= "myInfo"; 		//用户详细信息的key
const clientId 		= "clientId";  		//ws链接id
const wrUserInfo 		= "wrUserInfo"; 		//账号密码的key
//封装保存本地数据操作
module.exports = {
	//保存我的数据
	setMyInfo: function(data) {
		uni.setStorageSync(myInfo, data);
	},

	//获取我的数据
	getMyInfo: function() {
		utilCore.autoLoginUi();
		return uni.getStorageSync(myInfo);
	},

	//退出登录
	outLogin: function() {
		uni.removeStorage({
			key: myInfo
		})
	},
	
	//保存用户账号和密码
	setMyUserInfo: function(data) {
		uni.setStorageSync(wrUserInfo, data);
	},
	
	//获取用户账号和密码
	getMyUserInfo: function() {
		return uni.getStorageSync(wrUserInfo);
	},
	
	//删除用户账号和密码
	delMyUserInfo: function() {
		uni.removeStorage({
			key: wrUserInfo
		})
	},

    //保存ws链接id
	saveClientId(id){
		uni.setStorageSync(clientId, id);
	},
	//获取ws链接id
	getClientId(){
		return uni.getStorageSync(clientId);
	},
	
	//封装聊天计数的key
	getMsgKey(type, accORid){
		return this.lastMsgIndex + "_" + type + "_" + accORid;
	},
	
	//保存聊天计数
	saveMsgIndex(type, accORid, msgIndex){
		uni.setStorageSync(this.getMsgKey(type, accORid), msgIndex);
	},
		
	//获取聊天计数
	getMsgIndex(type, accORid){
		return uni.getStorageSync(this.getMsgKey(type, accORid));		
	}
}
