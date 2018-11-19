const {app, Menu} = require('electron')
const {showNotice,  closeNotice} = require('./notice.js')
const dialog  = require('./dialog.js');

const isDarwin = process.platform === 'darwin' ? true : false; //是否苹果系统
//窗口主菜单
const windowMenu = () => {
	//https://electronjs.org/docs/api/menu 创建菜单
	//https://electronjs.org/docs/api/menu-item  菜单参数配置解析
	// type 属性 可以是 normal、separator、submenu、checkbox 或 radio
	//separator ：分割线
	const template = [
	    {
	      label: '编辑',
	      submenu: [
	        {role: 'undo'},
	        {role: 'redo'},
	        {type: 'separator'},
	        {role: 'cut', label:'剪切'},
	        {role: 'copy', label:'复制'},
	        {role: 'paste',label:'粘贴'},
	        {role: 'pasteandmatchstyle'},
	        {role: 'delete', label: '删除'},
	        {role: 'selectall', label:'选中全部'}
	      ]
	    },
	    {
	      label: '视图',
	      submenu: [
	        {role: 'reload',label:'重新加载'},
	        {role: 'forcereload',label:'忽略缓存重新加载'},
	        {role: 'toggledevtools',label:'隐藏/显示开发者工具'},
	        {type: 'separator'},
	        {role: 'resetzoom',label:'缩放重置'},
	        {role: 'zoomin',label:'主页面放大 10%'},
	        {role: 'zoomout',label:'主页面缩小 10%'}
	        
	      ]
	    },
	    {
	      role: 'window',
	      label: '窗口',
	      submenu: [
	      	{role: 'close',label:'关闭窗口'},
	        {role: 'minimize',label:'最小化'},
	        {role: 'togglefullscreen',label:'全屏模式'}
	      ]
	    },
	    {
	    		 label: '功能',
	    		 submenu:[
	    		 	{
	    		 		label:'通知',
	    		 		submenu:[
	    		 			{
	    		 				label:'显示',
	    		 				click(){showNotice()}
	    		 			},
	    		 			{
	    		 				label:'关闭',
	    		 				click(){closeNotice()}
	    		 			}
	    		 		]
	    		 	},
	    		 	{
	    		 		label:'对话框',
	    		 		submenu:[
	    		 			{
	    		 				label:'选择文件',
	    		 				click(){ dialog.dialog1()}
	    		 			},
	    		 			{
	    		 				label:'保存文件',
	    		 				click(){ dialog.dialog2()}
	    		 			},
	    		 			{
	    		 				label:'提示消息-默认-信息',
	    		 				click(){dialog.dialog3('info')}
	    		 			},
	    		 			{
	    		 				label:'提示消息-错误-警告',
	    		 				click(){dialog.dialog3('error')}
	    		 			},
	    		 			{
	    		 				label:'错误信息',
	    		 				click(){dialog.dialog4()}
	    		 			}
	    		 		]
	    		 	}
	    		 ]
	    },
	    {
	      role: 'help',
	      label: '帮助',
	      submenu: [
	        {
	          label: '更多',
	          click () { require('electron').shell.openExternal('https://electronjs.org') }
	        }
	      ]
	    }
	]
	//mac
	if (isDarwin) {
	    template.unshift({
	      label: app.getName(),
	      submenu: [
	        {role: 'about',label:'关于'},
	        {type: 'separator'},
	        {role: 'services',label:'服务',submenu: []},
	        {type: 'separator'},
	        {role: 'hide',label:'隐藏'},
	        {role: 'hideothers',label:'隐藏其他'},
	        {role: 'unhide'},
	        {type: 'separator'},
	        {label:'重启',click(){
	        		app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
  				app.exit(0)
	        }},
	        {role: 'quit',label:'退出'}
	      ]
	    })
	    // Edit menu
	    template[1].submenu.push(
	      {type: 'separator'},
	      {
	        label: 'Speech',
	        submenu: [
	          {role: 'startspeaking',label:'开始说话'},
	          {role: 'stopspeaking',label:'停止说话'}
	        ]
	      }
	    )
	    // Window menu
	    template[3].submenu.push({role: 'zoom', label:'最大化'});
	}
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
}

// 设置特定浏览器窗口的菜单。-- 鱼眼菜单
const menu = () => {
	//https://www.w3cschool.cn/electronmanual/lz4y1ql3.html
	var dockMenu = Menu.buildFromTemplate(
		[
	  		{ label: '新窗口', click: function() { console.log('新窗口'); } },
	  		{ label: '新窗口设置', 
	  			submenu: [
	    				{ label: 'Basic' },
	    				{ label: 'Pro'}
	  			]},
	  		{ label: 'New Command...'}
	]);
	app.dock.setMenu(dockMenu);
}
const createMenu =  () => {
	windowMenu();
	menu();
}

module.exports =  createMenu;