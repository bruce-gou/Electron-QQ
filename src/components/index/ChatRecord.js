/*
 聊天记录
 * */
import React, { Component } from "react";

let x = 0;
let y = 0;
let txt = null;
let Image = null;
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			menu: []
		};
	}
	componentDidMount(){
//		setTimeout(this.closeMenu,2000);
	}
	//关闭菜单
	closeMenu = () => {
		//点击其他地方，菜单关闭
		let $html = document.querySelector('html');
		$html.addEventListener('click',(e)=>{
			let $this = e.target;
			let atr = $this.getAttribute('data-li');
			if ($this.tagName === "LI" && atr) {
				return;
			}
			this.close();
		})
		//右击
		$html.addEventListener('contextmenu', ()=>this.close())
		$html = null;
		//编辑框点击关闭菜单
		var ifr = document.getElementById("editor");
		var doc = ifr.contentDocument || ifr.contentWindow.document; // W3C || IE
		doc.addEventListener('click', ()=>this.close());
		//右击事件
		doc.addEventListener('contextmenu', ()=>this.close());
	}
	//右键菜单
	ContextMenu = (e) => {
		e.preventDefault();
		let selecter = window.getSelection();
		x = e.clientX - 200;
		y = e.clientY - 95;
		let name = e.target.tagName;
		switch (name) {
			case 'IMG':
				e.target.style.border = '1px solid #41a6ec';
				Image = e.target.src;
				this.setState({
					menu: [{name:'拷贝', type: 'copy', otherMsg: 'image'}, 
						{ name:'另存为...', type: 'save', otherMsg: 'image'}]
				})
				break;
			case 'P':
				txt = selecter.toString();
				if (txt) {
					this.setState({
						menu: [{name:'拷贝', type: 'copy', otherMsg: 'other'}]
					})
				}
				break;
			default:
				this.setState({
					menu:[]
				})
				break;
		}
		return false;
	}
	//拷贝
	menuSelect = (e, item) => {
		switch (item.type) {
			case 'copy'://拷贝
				this.copys(e, item);
			break;
			case 'save'://保存
			break;
		}
	}
	//拷贝
	copys = (e, item) => {
		e.stopPropagation();
		const { clipboard, nativeImage } = window.electron.remote;
		if (item.otherMsg === 'image') {
			Image = Image.replace('data:image/png;base64,','');
			let buff = new Buffer(Image,'base64');
			let img = nativeImage.createFromBuffer(buff);
			clipboard.writeImage(img);
			this.close();
		}else{
			clipboard.clear();
			clipboard.writeText(txt);
			this.close();
		}
		return false;
	}
	//保存
	save = () => {
		
	}
	close = () => {
		this.setState({
			menu: []
		})
	}
	render(){
		const { menu } = this.state;
		const { _style, data } = this.props;
		const list = data.data;
		return (
			<div id="pageScroll">
				{
					menu.length > 0 ?
						<ul className={_style.contextMenu} style={{left: `${x}px`, top: `${y}px`}}>
							{
								menu.map((item, index)=>
									<li data-li="li" onClick={(e)=>this.menuSelect(e, item)} key={index}>{ item.name }</li>
								)
							}
						</ul>
					: ''
				}
				{
					list.map((item,index)=>
						<div key={index} className={`${_style.chatList} ${ item.role === 'me' ? _style.right : _style.left}`}>
							<div className={_style.chatList_img}><img src={ item.headImg }/></div>
							<div  className={_style.chatList_content}>
								{
									//群聊显示别人名字
									(data.type === 'group' || data.type === 'discuss') && item.role === 'other' ?	<span>{item.name}</span> : ''
								}
								<p onContextMenu={this.ContextMenu} dangerouslySetInnerHTML={{__html: item.content}}></p>
							</div>
						</div>
					)
				}
				{
//					群聊
//							<div className={`${_style.chatList} ${_style.right}`}>
//								<div className={_style.chatList_img}><img src={img1}/></div>
//								<div  className={_style.chatList_content}>
//									<span>F14-浅唱年华</span>
//									<p>页面有上下两层，点击的时候上层把下层遮住了导致点击不到下层。咋个解决可以无视上层操作下层的？</p>
//								</div>
//							</div>
				}
			</div>
		)
	}
}
export default IndexPage;