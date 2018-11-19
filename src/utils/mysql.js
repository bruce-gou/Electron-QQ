let db = null;
//创建
const create = () => {
	let request = window.indexedDB.open('chat', '1.0');
	request.onsuccess = function (event) {
		db = request.result;
		console.log('数据库打开成功');
	};
	request.onupgradeneeded = function(event) {
		db = event.target.result;
		let objectStore;
		//联系人  //  autoIncrement 主键递增
		if (!db.objectStoreNames.contains('person')) {
			objectStore = db.createObjectStore('person', { keyPath: 'id', autoIncrement: true });
			objectStore.createIndex('qq', 'qq', { unique: false });//建立索引
			let data = initContactsData();
			for ( let i in data) {
				objectStore.add(data[i]);
			}
		}
		//分组信息
		if (!db.objectStoreNames.contains('grouping')) {
			objectStore = db.createObjectStore('grouping', { keyPath: 'id', autoIncrement: true });
			let  data = initGrouping();
			for ( let i in data) {
				objectStore.add(data[i]);
			}
		}
		//聊天记录
		if (!db.objectStoreNames.contains('chatRecord')) {
			objectStore = db.createObjectStore('chatRecord', { keyPath: 'id', autoIncrement: true});
			objectStore.createIndex('qq', 'qq', { unique: false });//建立索引
			let data = initAllHistory();
			for ( let i in data) {
				objectStore.add(data[i]);
			}
		}
		// 聊天列表
		if (!db.objectStoreNames.contains('chatList')) {
			objectStore = db.createObjectStore('chatList', { keyPath: 'id', autoIncrement: true  });
			objectStore.createIndex('qq', 'qq', { unique: false });//建立索引
			let data = initChatList();
			for ( let i in data) {
				objectStore.add(data[i]);
			}
		}
	}
}
//读取所有
const readAll = (table) => {
	return new Promise((resolve, reject)=>{
		const timer = setTimeout(function(){
			if ( db ) {
				clearTimeout(timer);
				let request = db.transaction([table]).objectStore(table);
				let data = [];
				request.openCursor().onsuccess = function (event) {
					var result = event.target.result;
					if (result) {
						data.push(result.value);
				       	result.continue();
					} else {
				      	resolve(data);
					}
				}
			}
		},100);
	});
}
//查询
const read = (table, key) => {
	return new Promise((resolve, reject)=>{
		let request = db.transaction([table])
			.objectStore(table)
			.get(key);
		request.onerror = function(event) {
			console.log('事务失败');
			resolve(false);
		};
		request.onsuccess = function( event) {
			if (request.result) {
				resolve(request.result);
			} else {
				resolve(false);
				console.log('未获得数据记录');
			}
		};
	});
}
//索引查询
const indexeRead = (table, key, val) => {
	return new Promise((resolve, reject)=>{
		let request = db.transaction([table])
			.objectStore(table)
			.index(key)
			.get(val)
		request.onsuccess = function (e) {
			var result = e.target.result;
			if (result) {
		    		resolve(result);
			} else {
				console.log('未获得数据记录');
				resolve(false);
			}
		}
	});
}
//新增
const add = (table, data) => {
	return new Promise((resolve, reject)=>{
		let request = db.transaction([table], 'readwrite')
			.objectStore(table)
			.add(data);
		request.onsuccess = (event) => {
	    		console.log('数据写入成功');
	    		resolve(true);
		};
		request.onerror = (event) => {
			console.log('数据写入失败');
			resolve(false);
		}
	});
}
//修改
const update = (table, data, key) => {
	return new Promise((resolve, reject)=>{
	let request = db.transaction([table], 'readwrite')
			.objectStore(table)
			.put(data, key);
		request.onsuccess = (event) => {
			console.log('数据更新成功');
			resolve(true);
		};
		request.onerror = (event) => {
			console.log('数据更新失败');
			resolve(false);
		}
	});
}
//删除
const remove = (table, key) => {
	return new Promise((resolve, reject)=>{
		let request = db.transaction([table], 'readwrite')
			.objectStore(table)
			.delete(key);
		request.onsuccess = (event) => {
			console.log('数据删除成功');
			resolve(true);
		};
		request.onerror = (event) => {
			console.log('数据删除失败');
			resolve(false);
		};
	});
}
export { create, readAll, read, indexeRead, add, update, remove };


//初始化联系人数据
function initContactsData () {
	const data = [
		{ name: '搞笑群', qq:'683829200', remark: '', businessCard: '', notice: '', type: 'group', autograph: '新来了一个React群', headImg: 'q1'},
		{ name: '粉丝群', qq:'683829201', remark: '', businessCard: '', notice: '', type: 'group', autograph: '大家不要发黄色暴力违法事情', headImg: 'q2'},
		{ name: '浅唱年华',remark:'', type:'me', state: false, stateTxt: '离线', sex: '1', age: 19, birthday: '1993-9-2',  qAge: 3, tel: '17348052002', qq: '1104220796', 
			mail: '1104220796@qq.com', explain: 'IT是条不归路！', headImg: 'me'},
		{ name: '张三', remark:'', type: 'friends1', client: 'mobile', state: true, stateTxt: '在线', autograph: '太阳出来咯……', sex: '1', age: 19, birthday: '1999-2-14',
		  qAge: 3, tel: '17348052002', qq: '251810104', mail: '251810104@qq.com', explain: 'IT是条不归路！', headImg: 'zs'},
		{ name: '李四',  remark:'', type: 'friends1', client: 'desktop',  state: true, stateTxt: '在线',  autograph: '向来缘浅，奈何情深', sex: '2', age: 20, birthday: '1998-9-1',
		  qAge: 5, tel: '17348052003', qq: '251810103', mail: '251810103@qq.com', explain: 'IT是条不归路！',  headImg: 'ls'},
		{ name: '王五',  remark:'', type: 'friends2', client: 'desktop', state: true, stateTxt: '在线', autograph: '迎接风暴吧', sex: '1', age: 20, birthday: '1998-7-16', qAge: 3,
		  tel: '17348052003', qq: '251810102', mail: '251810102@qq.com', explain: 'IT是条不归路！',  headImg: 'ww'},
		{ name: '马六',  remark:'', type: 'friends2', client: 'mobile', state: false, stateTxt: '离线', autograph: '期待您的到来。', sex: '2', age: 22, birthday: '1996-9-2',
		  qAge: 11, tel: '17348052004', qq: '251810101', mail: '251810101@qq.com', explain: 'IT是条不归路！',  headImg: 'ml'}
	]
	return data;
}
//分组信息初始化
function initGrouping(){
	return [
		{ name: '群', num:2, type: 'group' },
		{ name: '讨论组', num:0, type: 'discuss'},
		{ name: '好友', num: 3, onLine: 2, type: 'friends1' },
		{ name: '朋友', num: 2, onLine: 1, type: 'friends2'}
	];
}
//聊天记录初始化
function initAllHistory () {
	return [
	{ qq: '251810104', type: 'friends',
		data: [
			{ id: 0, role: 'other', qq: '251810104',  content: '大家好，我是不忘初心。来自山东临沂的巨蟹座男一枚~', time: 1541663510937},
			{ id: 1, role: 'me',  qq: '1104220796', content: '不搞基', time: 1541663543929}
		]
	},
	{ qq: '251810103', type: 'friends',
		data: [
			{ id: 0, role: 'other', qq: '251810103',  content: '有没有打王者的   无聊中~', time: 1541663510937},
			{ id: 1, role: 'me',  qq: '1104220796', content: '不玩', time: 1541663544929}
		]
	},
	{ qq: '251810102', type: 'friends',
		data: [
			{ id: 0, role: 'other', qq: '251810102',  content: '你好！', time: 1541663510937},
			{ id: 1, role: 'me',  qq: '1104220796', content: '你好！', time: 1541663545929}
		]
	},
	{ qq: '251810101', type: 'friends',
		data: [
			{ id: 0, role: 'other', qq: '251810101',  content: '网上都得是骗人的！', time: 1541663510937},
			{ id: 1, role: 'me', qq: '1104220796', content: '说出你的故事！', time: 1541663546929}
		]
	},
	{ qq: '683829200', type: 'group',
		data: [
			{ id: 0, role: 'other', name: '张三',  remark:'', qq: '251810104',  content: '明明我就能靠颜值吃饭，可是非要靠能力', time: 1541663510937},
			{ id: 1, role: 'other', name: '李四',  remark:'',  qq: '251810103',  content: '去搜富婆群 一大堆', time: 1541663543929},
			{ id: 2, role: 'other', name: '马六',  remark:'', qq: '251810101',  content: '群里不能闲聊！', time: 1541663589124},
			{ id: 3, role: 'me', qq: '1104220796', content: '+1', time: 1541663597026}
		]
	},
	{ qq: '683829201', type: 'group',
		data: [
			{ id: 0, role: 'other', name: '王五',  remark:'',  qq: '251810101',  content: '休息一天，第二天照样生龙活虎', time: 1541663510937},
			{ id: 1, role: 'other', name: '马六',  remark:'', qq: '251810102',  content: '岁月不饶人啊', time: 1541663543929}
		]
	}
]
}

function initChatList () {
	return [
		{ qq: '251810104', unread: 0, lastChat: '不搞基', time: 1541663543929, type: 'friends1' },
		{ qq: '251810103', unread: 0, lastChat: '不玩', time:  1541663544929, type: 'friends1'},
		{ qq: '251810102', unread: 0, lastChat: '你好！', time: 1541663545929, type: 'friends2'},
		{ qq: '251810101', unread: 0, lastChat: '说出你的故事！', time: 1541663546929, type: 'friends2'}
	]
}
