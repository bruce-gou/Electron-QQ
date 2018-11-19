//import { ipcMain, ipcRenderer, BrowserWindow } from 'electron';
const {ipcMain, ipcRenderer, BrowserWindow} = require('electron');
//ipcMain, ipcRenderer 都是主进程和渲染进程的异步通信 
//https://electronjs.org/docs/api/ipc-main
// https://electronjs.org/docs/api/ipc-renderer
ipcMain.on('window', (event, arg) => {
	console.log('监听到渲染进程发来的消息：'+arg);
	let current = BrowserWindow.getFocusedWindow();
	current.maximize();
	console.log('窗口已经最大化！');
	event.sender.send('back', '窗口已经最大化')
})