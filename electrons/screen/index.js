const {
  globalShortcut,
  ipcMain,
  BrowserWindow,
  clipboard,
  nativeImage
} = require('electron')

// 保证函数只执行一次
let isRuned = false
// 截图时会出现截图界面，如下就是保存截图窗口的数组
const $windows = []
// 判断是否为快捷键退出，其他的退出方式都不被允许
let isClose = false
module.exports = mainWindow => {
  if (isRuned) {
    return
  }
  isRuned = true

  // 注册全局快捷键
  globalShortcut.register('ctrl+alt+a', function () {
    mainWindow.webContents.send('shortcut-capture')
  })

  // 抓取截图之后显示窗口
  ipcMain.on('shortcut-capture', (e, sources) => {
    // 如果有以前的窗口就关闭以前的窗口
    // 然后根据截图资源于屏幕数据生成窗口
    closeWindow()
    sources.forEach(source => {
      createWindow(source)
    })
  })
  // 有一个窗口关闭就关闭所有的窗口
  ipcMain.on('cancel-shortcut-capture', closeWindow)

  // 截图窗口确认截图时把数据传递到主进程
  // 然后把数据写入到剪切板，并关闭窗口
  // 没有直接在渲染进程把数据写入剪切板是因为在Linux上会报错
  // 所以就把这一步改到主进程完成
  ipcMain.on('set-shortcut-capture', (e, dataURL) => {
    clipboard.writeImage(nativeImage.createFromDataURL(dataURL))
    closeWindow()
  })
}

// 创建窗口
function createWindow (source) {
  // display为屏幕相关信息
  // 特别再多屏幕的时候要定位各个窗口到对应的屏幕
  const { display } = source
  const $win = new BrowserWindow({
    title: '截图',
    width: display.size.width,
    height: display.size.height,
    x: display.bounds.x,
    y: display.bounds.y,
    frame: false,
    show: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    fullscreen: true,
    skipTaskbar: true,
    closable: true,
    minimizable: false,
    maximizable: false
  })
  // 全屏窗口
  setFullScreen($win, display)
  // 只能通过cancel-shortcut-capture的方式关闭窗口
  $win.on('close', e => {
    if (!isClose) {
      e.preventDefault()
    }
  })
  // 页面初始化完成之后再显示窗口
  // 并检测是否有版本更新
  $win.once('ready-to-show', () => {
    $win.show()
    $win.focus()
    // 重新调整窗口位置和大小
    setFullScreen($win, display)
  })

  // 当页面加载完成时通知截图窗口开始程序的执行
  $win.webContents.on('dom-ready', () => {
    $win.webContents.executeJavaScript(`window.source = ${JSON.stringify(source)}`)
    $win.webContents.send('dom-ready')
    $win.focus()
  })
  // 加载地址
  $win.loadURL(`file://${__dirname}/window/shortcut-capture.html`)
  $windows.push($win)
}

// 让窗口全屏
function setFullScreen ($win, display) {
  $win.setBounds({
    width: display.size.width,
    height: display.size.height,
    x: display.bounds.x,
    y: display.bounds.y
  })
  $win.setAlwaysOnTop(true)
  $win.setFullScreen(true)
}

// 关闭窗口
function closeWindow () {
  isClose = true
  while ($windows.length) {
    const $winItem = $windows.pop()
    $winItem.close()
  }
  isClose = false
}