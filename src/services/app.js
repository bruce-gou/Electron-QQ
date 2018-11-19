import { indexeRead, add } from '@/utils/mysql';

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
//获取聊天人
async function getChatting(qq) {
	let item = await indexeRead('chatList','qq', qq);
	return item;
}
async function addChat(data) {
	let result = await add('chatList', data);
	return result;
}
export { getChatting, addChat };
