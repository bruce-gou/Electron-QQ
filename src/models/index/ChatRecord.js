import { routerRedux } from 'dva/router';
import { message } from "antd";
import * as API from '@/services/ChatRecord';
//私有
let params = null;
export default {
	namespace: 'ChatRecord',
	state: {
		data: [],
		item: null
	},
	effects: {
		//聊天列表
		*getChatList(_, { call, put }) {
	    		const data = yield call(API.getChatList);
	    		yield put({ type: 'stateGetChatList', payload: { data }});
	    },
	    //获取聊天记录
	    *getChatRecord({ payload: value }, { call, put }) {
	    		yield put({type:'App/initState'});
	    		params = value;
	    		const item =  yield call(API.getChatRecord, value);
	    		yield put({ type: 'stateGetChatRecord', payload: { item }});
	    },
	    //发送消息
	    *sendNews({ payload: value, qq: qq }, { call, put }){
	    		const item =  yield call(API.sendNews, value, qq);
	    		yield put({ type: 'getChatList'});
	    		yield put({ type: 'getChatRecord', payload: params});
	    },
	    *delChatList({payload: value},{ call, put }){
	    		const item =  yield call(API.delChatList, value);
	    		if (item) {
	    			yield put({ type: 'getChatList'});
	    			yield put({ type: 'stateGetChatRecord', payload: { item: null }});
	    		}
	    }
	},
	reducers: {
		stateGetChatList(state, { payload }) {
			return {
				...state,
				...payload
			};
		},
		stateGetChatRecord(state, { payload }){
      		return {
				...state,
				...payload
			};
		}
	},
	subscriptions: {//订阅 --监听路由
		setup({ history }) {
			// Subscribe history(url) change, trigger `load` action if pathname is `/`
			return history.listen(({ pathname, search }) => {
				if (typeof window.ga !== 'undefined') {
					window.ga('send', 'pageview', pathname + search);
				}
			});
		}
	}
};