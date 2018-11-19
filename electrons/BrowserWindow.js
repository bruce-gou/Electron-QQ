const {app, BrowserWindow} = require('electron');
const path = require('path');
// window 会被自动地关闭
let mainWindow;
const argv = process.argv.slice(2); //判断是开发环境还是生产环境
const isDarwin = process.platform === 'darwin' ? true : false; //是否苹果系统
const createWindow = () => {
	// 创建浏览器窗口。
	mainWindow = new BrowserWindow({
		width: 800, 
		height: 600, 
		show: false, 
		titleBarStyle: 'hiddenInset',
		webPreferences: {
			devTools:true,
	        javascript: true,
	        plugins: true,
	        nodeIntegration: true, // 不集成 Nodejs
	        webSecurity: false,
//	        preload: path.join(__dirname, '../public/renderer.js')  // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
	    }
	});
	if (argv && argv[1] == 'dev') {
		mainWindow.loadURL("http://localhost:8000/")
	} else if (argv && argv[1] == 'build') {
		// 加载应用的 index.html
		mainWindow.loadURL(`file://${__dirname}/../app/dist/index.html`);
	}
	
	//在加载页面时，渲染进程第一次完成绘制时，会发出 ready-to-show 事件 。 在此事件后显示窗口将没有视觉闪烁：
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})
	// 打开开发工具
	mainWindow.webContents.openDevTools();
	// 当 window 被关闭，这个事件会被发出
	mainWindow.on('closed', () => {
		// 取消引用 window 对象，如果你的应用支持多窗口的话，
		// 通常会把多个 window 对象存放在一个数组里面，
		mainWindow = null;
	});
};
// 当所有窗口被关闭了，退出。
app.on('window-all-closed', () => {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (!isDarwin) {
    app.quit();
  }
});
app.on('activate', () => {
  // 在OS X上，在应用程序中重新创建窗口是常见的。
  // 点击图标和码头是一个没有其他窗口开放。
  if (mainWindow === null) {
    createWindow();
  }
});
module.exports = createWindow;
