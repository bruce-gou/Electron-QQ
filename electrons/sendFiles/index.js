 const { ipcMain, nativeImage, dialog } = require('electron')
  

//发送图片
const sendImage = () => {
	dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections','showHiddenFiles']},
			(filePaths)=>{
				//回调函数
				console.log('用户选择的文件路径的数组');
				console.log(filePaths);
			})
}

//发送文件
const sendFiles = () => {
	ipcMain.on('send-Files', (e, sources) => {
		switch (sources){
			case 'Image'://图片
				sendImage();
				break;
			default:
				break;
		}
		
		console.log(sources);
	})
}
module.exports = sendFiles;
