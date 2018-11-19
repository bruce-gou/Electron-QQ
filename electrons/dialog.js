//import { dialog } from 'electron';
const {dialog} = require('electron')

//https://electronjs.org/docs/api/dialog
//选中文件
const dialog1 = () => {
	dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections','showHiddenFiles']},
						(filePaths)=>{
							//回调函数
							console.log('用户选择的文件路径的数组');
							console.log(filePaths);
						})
}
//保存文件
const dialog2 = () => {
	dialog.showSaveDialog({},
		(filename)=>{
			console.log('保存文件名');
			console.log(filename);
		})
}
//提示信息，可根据不同的对话信息，给予不同图标
const dialog3 = (type) => {
	dialog.showMessageBox(
		{
			type: type,
			title:'提示标题-有地方不会显示',
			message:'提示内容',
			detail:'额外内容',
			checkboxLabel:'已读',
			checkboxChecked:true, //复选框是否选中
			buttons:['取消','确认'],
		},
		(response, checkboxChecked)=>{
			console.log('点击按钮索引： '+response);
			console.log('复选框是否被选中： '+checkboxChecked);
		})
}
//错误提示
const dialog4 = () => {
	dialog.showErrorBox('错误标题', '错误内容');
}
module.exports = { dialog1, dialog2, dialog3, dialog4 };
