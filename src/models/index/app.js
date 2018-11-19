import { message } from "antd";
import * as API from '@/services/app';
import * as API_CHAT from '@/services/ChatRecord';
import * as API_MAIL from '@/services/MailList';
//私有
export default {
	namespace: 'App',
	state: {
		qq: null,
		item: null
	},
	effects: {
		//发起会话
		*dialog({ payload: item }, { call, put }) {
			const result = yield call(API.getChatting, item.qq);
			if (result) {
				//切换页面
				yield put({type:'stateDialog', payload: {qq: item.qq}});
				yield put({type:'changeActive', payload: result});
			}else{
				const item1 = yield call(API_CHAT.getLastChatRecord, item.qq);
				let data = { qq: item.qq, unread: 0, time: item1.time, type: item.type, lastChat: item1.content };
				if ((item.type === 'group' || item.type === 'discuss') && item1.role === 'other') {
					data.role = item1.role;
					//qq资料
					const item2 = yield call(API_MAIL.getDatum, item1.qq);
					data.lastName = item2.name;
					data.lastRemark = item2.remark;
					console.log(data);
					console.log(item2);
				}
				const result1 = yield call(API.addChat, data);
				if ( result1 ) {
					//切换页面
					yield put({type:'stateDialog', payload: {qq: item.qq}});
					yield put({type:'changeActive', payload: data});
				}
			}
		},
		//切换激活状态
		*changeActive({ payload: item }, { call, put }) {
			yield put({type:'stateChangeActive', payload: { item }});
		}
	},
	reducers: {
		initState(state,{payload}) {
			return {
				qq: null,
				item: null
			}
		},
		stateDialog(state, { payload }) {
			return {
				...state,
				...payload
			}; 
		},
		stateChangeActive(state,  { payload }) {
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
		},
	}
};