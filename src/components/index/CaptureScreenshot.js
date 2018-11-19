/*
 捕捉截屏
 * */
import React, { Component } from "react";
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}
	componentWillMount(){
	}
	//屏幕截图
	screenShot = () => {
		const { ipcRenderer } = window.electron;
		ipcRenderer.send('capture-screen');
	}
	render(){
		return (
			<i className="iconfont icon-cut" title="捕捉屏幕">
				<ul>
					<li>录屏</li>
					<li onClick={this.screenShot}>截屏</li>
				</ul>
			</i>
		)
	}
}
export default IndexPage;