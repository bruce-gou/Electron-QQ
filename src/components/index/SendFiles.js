/*
 发送文件
 * */
import React, { Component } from "react";
import { posInsertTxt } from '@/utils/base';
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}
	componentWillMount(){
	}
	//发送图片
	sendImage = () => {
		const { dialog, nativeImage } = window.electron.remote;
		dialog.showOpenDialog(
			{
				filters:[{name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif']}],
				properties: ['openFile']
			},
			(filePaths)=>{
				//写入剪贴板图像中
				if (filePaths[0]) {
					var Image = nativeImage.createFromPath(filePaths[0]);
					let toDataURL = Image.toDataURL();
					posInsertTxt(toDataURL, 'img');
				}
			})
	}
	render(){
		return (
			<i className="iconfont icon-folder" title="发送文件">
				<ul>
					<li>发送文件/文件夹</li>
					<li>发送离线文件</li>
					<li onClick={this.sendImage}>发送图片</li>
				</ul>
			</i>
		)
	}
}
export default IndexPage;