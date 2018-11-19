//主进程
const {app, BrowserWindow} = require('electron');
const createWindow = require('./electrons/BrowserWindow.js');
const createMenu = require('./electrons/menu.js');
//捕捉屏幕
const { useCapture } = require('./electrons/captureScreen/index.js');



// app  控制应用生命周期的模块。
// BrowserWindow 创建原生浏览器窗口的模块
// 在安装/卸载时，在窗口上创建/删除快捷方式。
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', () => {
	//创建窗口
	createWindow();
	//创建菜单
	createMenu();
	//截取屏幕
	useCapture();
});