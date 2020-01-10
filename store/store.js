import Vue from 'vue';
import Vuex from 'vuex';
import util from "@/common/util.js";
import storage from "@/api/storage.js";
// import ws from "@/store/ws.js";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
		userEn: null,	//用户信息
		//ws: ws //webscoket链接,
		token: null,
		//保存token
		setToken(token){
			this.token = token;
			let info = storage.getMyInfo();
			info.token = this.token;
			storage.setMyInfo(info);
		},
		//获取token
		getToken(){
			if(!util.isEmpty(this.token)) return this.token;
			return storage.getMyInfo().token;			
		}
    },
    mutations: {
        login(state, userEn) {
			state.userEn = userEn;
            state.hasLogin = true;
        },
        logout(state) {
            state.userEn = null;
            state.hasLogin = false;
        }
    }
})

export default store;
