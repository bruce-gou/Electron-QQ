/**
 * 消息记录
 */
import React, { Component } from "react";
import { connect } from 'dva';
import { Badge, Icon } from 'antd';

import _style from "../ChatRecord.less";


//组件
import PersonalRecord from '../view/PersonalRecord.js';


@connect(({ ChatRecord, App }) => ({ $ChatRecord: ChatRecord, $App: App }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			data: []
		};
	}
	componentDidMount(){
		this.fetch();
	}
	componentWillReceiveProps(nextProps){
		const { item } = nextProps.$App;
		this.setState({
			data: nextProps.$ChatRecord.data
		}, () => {
			if (item) {
				this.changeActive(item);
			}
		})
	}
	//获取数据
	fetch = () =>  {
		this.props.dispatch({type: 'ChatRecord/getChatList'});
	}
	//发起会话时,切换激活状态
	changeActive = (item) => {
		const { id, data } = this.state;
		let current = null;
		for (let i in data) {
			if (item.qq === data[i].qq) {
				current = data[i];
			}
		}
		if (current && id !== current.id) {
			this.change(current);
		}
	}
	//切换聊天记录
	change = (item) => {
		this.setState({
			id: item.id,
		})
		this.props.dispatch({type: 'ChatRecord/getChatRecord', payload: item.qq});
	}
	//删除 
	del = (item, index, e) => {
		e.stopPropagation();//阻止冒泡
		const { data } = this.state;
		let list = [];
		for (let i in data) {
			if (data[i].id !== item.id) {
				list.push(data[i]);
			}
		}
		this.setState({
			data: list
		})
		this.props.dispatch({type: 'ChatRecord/delChatList', payload: item.id});
		this.activeFun(list, item, index);
	}
	//删除数据后改变激活状态
	activeFun = (list, data, index) => {
		let { id } = this.state;
		let qq = null;
		if (data.id === id && list.length === 0) {
			id = null;
		}else 
		if (data.id === id && list.length > 0 && list[index]) {
			id = list[index].id;
			qq = list[index].qq;
		}
		else{
			id = list[index - 1].id;
			qq = list[index - 1].qq;
		}
		this.setState({
			id: id
		})
		if ( id && qq) {
			this.props.dispatch({type: 'ChatRecord/getChatRecord', payload: qq});
		}
	}
	render() {
		const { id } = this.state;
		const { item, data } = this.props.$ChatRecord;
		return(
			<div className={_style.page}>
				<div className={_style.pageLeft}>
					{
						data.map((item, index)=>
							<div className={ item.id === id ? `${_style.record} ${_style.active}` : _style.record } key={item.id}
								onClick={()=>this.change(item)}>
								<Icon type="close"  className={_style.icon} onClick={(e)=>this.del(item,index,e)}/>
								<div className={_style.record_left}>
									<img src={ item.headImg }/>
								</div>
								<div className={_style.record_right}>
									<div className="_badge">
										<h4> {item.name} </h4>
										<Badge className={_style.number} 
											style={ item.type === 'group' ? {backgroundColor: '#ccc'} : item.type === 'friends' ? {backgroundColor: 'red'} : {}} 
											overflowCount={99} count={item.unread}></Badge>
									</div>
									<span>
										{
											(item.type === 'group' || item.type === 'discuss') && item.role === 'other' ?
												 item.lastRemark ? `${item.lastRemark}:${item.lastChat}` : `${item.lastName}:${item.lastChat}`
												:
												item.lastChat
											
										}
									</span>
								</div>
							</div>
						)
					}
				</div>
				<div className={_style.pageRight}>
					{
						id && item ? 
							<PersonalRecord data={item}/>
						: noData()
					}
				</div>
			</div>
		);
	}
}

const noData = () => {
	return  (<div className={_style.noData}>
				<img src={require('@/assets/icon/noData.png')}/>
			</div>)
}
export default IndexPage;