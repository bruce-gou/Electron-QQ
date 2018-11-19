/*
 聊天区域
 * */
import React, { Component } from "react";
import { Icon } from "antd";
import _style from '../ChatRecord.less';

//组件
import ChatRecord from '@/components/index/ChatRecord';//聊天记录
import ChatEdit from '@/components/index/ChatEdit';//聊天编辑器
import CaptureScreenshot from '@/components/index/CaptureScreenshot'; //捕捉截屏
import SendFiles from '@/components/index/SendFiles'; //发送文件



const img = require('@/assets/headIcon.png');
const img1 = require('@/assets/myHead.jpeg');
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: this.props.data
		};
	}
	componentDidMount(){
	}
	componentWillReceiveProps(nexrProps){
		this.setState({
			item: nexrProps.data
		})
	}
	render(){
		let { item } = this.state;
 		return (
			<div className={_style.PersonalRecord}>
				<div className={_style.head}>
					<span>{ item.name }</span>
					{
						item.client ? 
							<Icon type={ item.client}/>
							:
							''
					}
				</div>
				<div  className={_style.content}>
					<ChatRecord _style={_style} data={item}/>
				</div>
				<div  className={_style.footer}>
					<div className={_style.footer_nav}>
						<i className="iconfont icon-smile"></i>
						<CaptureScreenshot/>
						<SendFiles/>
						<i className="iconfont icon-14" title="发送语言消息"></i>
						<i className="iconfont icon-iostelephoneoutline" title="音频视频电话"></i>
						<i className="iconfont icon-clock" title="查看消息记录"></i>
					</div>
					<ChatEdit _style={_style} qq={item.qq}/>
				</div>
			</div>
		)
	}
}
export default IndexPage;
