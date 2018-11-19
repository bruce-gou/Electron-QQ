const { Notification } = require('electron')
let myNotification;
//https://electronjs.org/docs/api/notification
//通知
const showNotice = () => {
	
	if ( Notification.isSupported() ) {
		console.log('当前支持通知！');
	}else{
		console.log('当前不支持通知！');
		return;
	}
	myNotification = new Notification({
		title: '通知标题',
		body: '通知正文内容'
	})
	myNotification.show();
	myNotification.on('show',function(){
		console.log('显示通知！');
	})
	myNotification.on('click',function(){
		console.log('点击通知！');
	})
	myNotification.on('close',function(){
		console.log('关闭通知！');
	})
//	console.log(myNotification.__proto__.__proto__);
}
//关闭通知
const closeNotice= () => {
	if (myNotification) {
		myNotification.close();
	}
}

module.exports =  { showNotice,  closeNotice};