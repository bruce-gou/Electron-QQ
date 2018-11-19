import { routerRedux } from 'dva/router';
import { message } from "antd";
import * as API from '@/services/MailList';
//私有
export default {
	namespace: 'MailList',
	state: {
		data: [],
		item: null
	},
	effects: {
		//获取联系人
		*getContacts(_, { call, put }) {
	    		const data = yield call(API.getContacts);
	    		yield put({ type: 'stateGetContacts', payload: { data }});
	    },
	    //获取联系人资料
	    *getDatum({ payload: value }, { call, put }) {
	    		const item = yield call(API.getDatum, value);
	    		yield put({ type: 'stateGetContacts', payload: { item }});
	    }
	},
	reducers: {
		stateGetContacts(state, { payload }) {
			return {
				...state,
				...payload
			};
		},
		stateGetDatum(state, { payload }){
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