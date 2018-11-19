/*
 聊天编辑器
 * */
import React, { Component } from "react";
import { connect } from 'dva';
import { posInsertTxt, ME_INFO } from '@/utils/base';



const img1 = require('@/assets/myHead.jpeg');


@connect(({ ChatRecord }) => ({ $ChatRecord: ChatRecord }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount(){
		this.editInit();
	}
	shouldComponentUpdate(nextProps, nextState){
		return false;
	}
	//编辑器初始化
	editInit = () => {
		let $this = this;
		var ifr = document.getElementById("editor");
		var doc = ifr.contentDocument || ifr.contentWindow.document; // W3C || IE
		doc.open();
		doc.designMode="on";
		doc.contentEditable = true;
		doc.write('<html><head><style>body{margin:3px; word-wrap:break-word; word-break: break-all;font-family: sans-serif; font-size: 13px; }img{max-width:100%;}</style></head><body></body></html>');
		doc.close();
		doc.body.focus();
		//监听键盘按下事件
		doc.addEventListener('paste',function(e){
			e.preventDefault();
			//获取剪贴板内容然后插入当前光标位置
			$this.InputPaste();
		});
		//监听回车键-发送消息
		doc.addEventListener('keydown',function(e){
			if(e.keyCode === 13 &&  e.shiftKey === false){
				e.preventDefault();
				let html = e.target.innerHTML;
				html = html.replace(/<br>/g,"");
				html = html.replace(/\&nbsp;/g,"").replace(/\s+/,"");
				if ( html ) {
					var obj = {};
					const { qq } = $this.props;
					obj.time = Date.now();
					obj.qq = ME_INFO.qq;
					obj.content = e.target.innerHTML;
					obj.role = 'me';
					$this.props.dispatch({type:'ChatRecord/sendNews', payload: obj, qq: qq});
					e.target.innerHTML = '';
				}else{
					e.target.innerHTML = '';
				}
			}
		});
		doc = null;
	}
	//获取剪贴板内容然后插入当前光标位置
	InputPaste = () => {
		//先获取文字，如果有文字则只显示文字
		const { clipboard, Tray } = window.electron;
		let txt = clipboard.readText();//文本
		let Image =  clipboard.readImage();//图像
		if (txt.indexOf('[图片]') >= 0) {
			let toDataURL = Image.toDataURL();
			let img = '<img src="'+ toDataURL +'"/>';
			txt = txt.replace('[图片]', img);
			posInsertTxt(txt, 'imgTxt');
			return;
		}
		if (txt) {
			posInsertTxt(txt, 'txt');
			return;
		}
		if (Image) {
			let toDataURL = Image.toDataURL();
			posInsertTxt(toDataURL, 'img');
			return;
		}
	}
	render(){
		const { _style } = this.props;
		return (
			<iframe id="editor" onInput={this.InputBoxChange} className={_style.textarea}></iframe>
		)
	}
}
export default IndexPage;