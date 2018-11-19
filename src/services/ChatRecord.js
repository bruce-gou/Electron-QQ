import { add, update, readAll, read, indexeRead, remove } from '@/utils/mysql';

const headImg = {
	q1: require('@/assets/headImg/q1.jpg'),
	q2: require('@/assets/headImg/q2.jpg'),
	sj: require('@/assets/headImg/sj.jpg'),
	pb: require('@/assets/headImg/pb.jpg'),
	zs: require('@/assets/headImg/zs.jpg'),
	ls: require('@/assets/headImg/ls.jpg'),
	ww: require('@/assets/headImg/ww.jpg'),
	ml: require('@/assets/headImg/ml.jpg'),
	me: require('@/assets/myHead.jpeg')
}
//获取聊天列表
async function getChatList() {
	let chatList = await readAll('chatList');
	//排序
	chatList = chatList.sort((a,b)=>{
		return Number(b.time) - Number(a.time);
	})
	let contacts = [];
	for( let i in chatList) {
		let item = await indexeRead('person', 'qq', chatList[i].qq);
		chatList[i].name = item.name;
		chatList[i].remark = item.remark;
		chatList[i].headImg = headImg[item.headImg];
		chatList[i].type = item.type;
	}
	return chatList;
}
//获取聊天记录
async function getChatRecord(qq) {
	let item = await indexeRead('chatRecord', 'qq', qq);
	let { name, client, type } = await indexeRead('person', 'qq', item.qq);
	item.name = name;
	item.client =  client;
	item.type = type;
	let data = item.data;
	for (let i in data) {
		let item = await indexeRead('person', 'qq', data[i].qq);
		data[i].headImg = headImg[item.headImg];
	}
	return item;
}
//获取最后一个聊天记录
async function getLastChatRecord(qq) {
	let item = await indexeRead('chatRecord', 'qq', qq);
	let data = item.data;
	//排序
	data = data.sort((a,b)=>{
		return Number(b.time) - Number(a.time);
	})
	return data[0];
}
//发送聊天信息
async function sendNews(val, qq) {
	let item = await indexeRead('chatRecord', 'qq', qq);
	val.id = item.data[item.data.length - 1].id + 1;
	item.data.push(val);
	//更新数据
	let result = await update('chatRecord', item);
	//修改聊天列表
	let item1 = await indexeRead('chatList', 'qq', qq);
	item1.lastChat = val.content;
	item1.time = val.time;
	item1.role = val.role;
	let item2 = {};
	for (let i in item1) {
		if (i !== 'lastName' && i !== 'lastRemark' && i !== '') {
			item2[i] = item1[i];
		}
	}
	let result1 = await update('chatList', item2);
	return result1;
}
async function delChatList(id) {
	let item = await remove('chatList', id);
	return item;
}


export { getChatList,  getChatRecord, getLastChatRecord, sendNews, delChatList };
