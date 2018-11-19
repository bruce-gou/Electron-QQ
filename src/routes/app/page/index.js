/**
 * 主体架构
 */
import React, { Component } from "react";
import { connect } from 'dva';
import { Layout, Icon } from 'antd';
//组件
import Head from '../view/head';
import ChatRecord from '@/routes/index/page/ChatRecord'; //聊天记录
import MailList from '@/routes/index/page/MailList'; // 联系人
import More from '@/routes/index/page/More'; //更多


//资源
import styles from '../style.less';
import navData from '@/common/menu.js';


const { Header, Sider, Content } = Layout;
@connect(({App  }) => ({  $App: App }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			sty: {}
		};
	}
	componentWillMount(){
		this.setPageWH();
		window.addEventListener('resize', this.setPageWH);
	}
	componentWillReceiveProps(nexrProps){
		const { qq } = nexrProps.$App;
		if (qq) {
			this.headNavClick(0);
		}
	}
	//注销
	componentWillUnmount(){
		window.removeEventListener("resize", this.setPageWH);
	}
	//设置页面宽高
	setPageWH = () => {
		const width = document.body.clientWidth;
		const height = document.body.clientHeight;
		this.setState({
			sty:{
				width: `${width}px`,
				height:`${height}px`,
			}
		})
	}
	// 切换
	headNavClick = ( index ) => {
		this.setState({
			index: index
		})
	}
	render() {
		const { index, sty } = this.state;
		const hide = { display:'none'};
		const show = {display:'block'};
		return(
			<Layout id={styles.wrapper} style={{...sty}}>
	        		<Layout>
	        			<Head  index={index} headNavClick={this.headNavClick} styles={styles}/>
					<Content id={styles.content}>
						{
							index === 0 ? <ChatRecord/> : ''
						}
						{
							index === 1 ? <MailList/> : ''
						}
						{
							index === 2 ? <More/> : ''
						}
					</Content>
				</Layout>
      		</Layout>
		);
	}
}
export default IndexPage;