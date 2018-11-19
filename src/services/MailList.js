import { readAll, read, indexeRead } from '@/utils/mysql';
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
//获取联系人数据
async function getContacts() {
	const grouping = await readAll('grouping');
	const person = await readAll('person');
	let data = [];
	for (let i in grouping) {
		let item = grouping[i];
		item.children = [];
		for( let j in person) {
			if ( item.type ===  person[j].type) {
				person[j].headImg = headImg[person[j].headImg];
				item.children.push(person[j]);
			}
		}
		data.push(item);
	}
	return data;
}
//获取联系人资料
async function getDatum(qq) {
	let item = await indexeRead('person', 'qq', qq);
	item.headImg =  headImg[item.headImg];
	return item;
}
export { getContacts, getDatum };
