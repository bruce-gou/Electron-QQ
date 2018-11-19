/**
 * 联系人列表
 */
import React, { Component } from "react";
import { connect } from 'dva';
import { Icon } from 'antd';

import _style from "../MailList.less";
//引入组件
import MailListRight from '../view/MailListRight.js';

@connect(({ MailList, App }) => ({ $MailList: MailList, $App: App }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			backgId: null
		};
	}
	componentDidMount(){
		this.fetch();
	}
	//数据请求
	fetch = () => {
		this.props.dispatch({type:'MailList/getContacts'});
	}
	//切换分组
	changeGroup = (e, item) => {
		let $this = e.currentTarget;
		let $next = $this.nextElementSibling;
		let $first = $this.firstElementChild;
		let data = item.children;
		//关闭
		if ( $first.classList.contains(_style.rotateZ) ) {
			$first.classList.remove(_style.rotateZ);
			$next.classList.remove(_style.active);
			const { backgId } = this.state;
			for ( let i in data) {
				if (data[i].id === backgId) {
					this.setState({
						id: null,
						backgId: null
					})
				}
			}
		}else{
		//展开
			$first.classList.add(_style.rotateZ);
			$next.classList.add(_style.active);
		}
	}
	//点击事件
	change = (data) => {
		const { id } = this.state;
		if (id !== data.id) {
			this.setState({
				id: data.id,
				backgId: data.id,
			})
			this.props.dispatch({type:'MailList/getDatum', payload: data.qq});
		}
	}
	//数据处理
	dataProcess = (data) => {
		let group = [];
		let friends = [];
		for (let i in data){
			if (data[i].type === 'group' || data[i].type === 'discuss') {
				group.push(data[i]);
			}else{
				friends.push(data[i]);
			}
		}
		return { group, friends }
	}
	//发起会话
	dialog = () => {
		const { item } = this.props.$MailList;
		this.props.dispatch({type: 'App/dialog', payload: item});
	}
	render() {
		const { id , backgId} = this.state;
		const { data , item} = this.props.$MailList;
		const { group, friends } = this.dataProcess(data);
		return(
			<div className={_style.page}>
				<div className={_style.pageLeft}>
					<div className={_style.top}>
						<div>
							<button>添加好友</button>
						</div>
					</div>
					<div className={_style.bottom}>
						<div>
							<dl>
								<dt>群组</dt>
								{
									group.map((item,index)=>
										<dd  key={item.id}>
											<div className={_style.group} onClick={(e)=>this.changeGroup(e,item)}>
												<Icon type="right" />
												<span className={_style.tit}> {item.name} </span>
												<span className={_style.num}>
													<span> {item.num} </span>
													<Icon type="setting" />
												</span>
											</div>
											<div className={_style.group_content}>
												{
													item.children.length > 0  ? 
														item.children.map((items, index)=> 
															<div className={ backgId === items.id ? `${_style.list} ${ _style.active}` : _style.list}  key={items.id}
																onClick={()=>this.change(items)} onDoubleClick={this.dialog}>
																<div className={_style.list_left}>
																	<img src={items.headImg}/>
																</div>
																<div className={_style.list_right}>
																	<h4> {items.name} </h4>
																	<span> { items.autograph ? `公告:${items.autograph}` : '' } </span>
																</div>
															</div>
														)
														:
														''
												}
											</div>
										</dd>
									)
								}
							</dl>
							<dl>
								<dt>好友</dt>
								{
									friends.map((item,index)=>
										<dd  key={item.id}>
											<div className={_style.group} onClick={(e)=>this.changeGroup(e,item)}>
												<Icon type="right" />
												<span className={_style.tit}> {item.name} </span>
												<span className={_style.num}>
													<span> {item.onLine}/{item.num} </span>
													<Icon type="setting" />
												</span>
											</div>
											<div className={_style.group_content}>
												{
													item.children.length > 0  ? 
														item.children.map((items, index)=> 
															<div className={ backgId === items.id ? `${_style.list} ${ _style.active}` : _style.list} key={items.id}
																onClick={()=>this.change(items)} onDoubleClick={this.dialog}>
																<div className={_style.list_left}>
																	<img src={ items.headImg }/>
																</div>
																<div className={_style.list_right}>
																	<h4> {items.name} </h4>
																	<span> 
																		{ 
																			items.autograph ? `[${items.stateTxt}] ${items.autograph}`
																			:  
																			`[${items.stateTxt}]`
																		}
																	</span>
																</div>
															</div>
														)
														: ''
												}
											</div>
										</dd>
									)
								}
							</dl>
							{
//								<dl>
//									<dt>群组</dt>
//									<dd>
//										<div className={_style.group}>
//											<Icon className={_style.rotateZ} type="right" />
//											<span className={_style.tit}>分组一</span>
//											<span className={_style.num}>
//												<span>10</span>
//												<Icon type="setting" />
//											</span>
//										</div>
//										<div className={_style.group_content}>
//											<div className={_style.list}
//												onClick={()=>this.change()}>
//												<div className={_style.list_left}>
//													<img src={img}/>
//												</div>
//												<div className={_style.list_right}>
//													<h4>群一</h4>
//													<span>公告</span>
//												</div>
//											</div>
//										</div>
//									</dd>
//									<dd>
//										<div className={_style.group}>
//											<Icon type="right" />
//											<span className={_style.tit}>分组二</span>
//											<span className={_style.num}>
//												<span>2</span>
//												<Icon type="setting" />
//											</span>
//										</div>
//									</dd>
//								</dl>
							}
						</div>
					</div>
				</div>
				<div className={_style.pageRight}>
					{
						id  && item ? <MailListRight _style={_style}/> : noData()
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