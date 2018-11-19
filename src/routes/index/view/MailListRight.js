/*
 资料信息
 * */
import React, { Component } from "react";
import { connect } from 'dva';
import { Icon } from 'antd';
import moment from 'moment';

@connect(({ MailList, App }) => ({ $MailList: MailList, $App: App }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount(){
	}
	//发起会话
	dialog = () => {
		const { item } = this.props.$MailList;
		this.props.dispatch({type: 'App/dialog', payload: item});
	}
	render(){
		const { item } = this.props.$MailList;
		const { _style } = this.props;
		return (
			<div className={_style.right}>
				<div className={_style.top}>
					<div>
						<div className={_style.headImg}><img src={ item.headImg } /></div>
						<div><h2> { item.remark ? item.remark : item.name } </h2></div>
						{
							item.type === 'group' ? 
								<div className={_style.number}>群号: {item.number}</div>
								: ''
						}
						<div  className={_style.iconList}>
							<Icon type="message" onClick={this.dialog} title="会话"/>
							<Icon type="mail" title="邮箱"/>
							<Icon type="home" title="空间"/>
						</div>
					</div>
				</div>
				<div className={_style.bottom}>
					{
						//群
						item.type === 'group' ? 
							<div className={_style.group}>
								<div>
									<div>
										<label>群名称</label>
										<span> {item.name} </span>
									</div>
									<div>
										<label>群备注</label>
										<span> { item.remark ? item.remark : '' }</span>
									</div>
								</div>
								<div>
									<div>
										<label>我的群名片</label>
										<span>{ item.businessCard }</span>
									</div>
								</div>
								<div>
									<div>
										<label>成员(7人)</label>
										<span className={_style.a}>查看</span>
									</div>
								</div>
								<div>
									<div>
										<label>群公告</label>
										<p> {item.notice} </p>
									</div>
								</div>
							</div>
							: ''
					}
					{
						//好友
						item.type.indexOf('friends') >= 0  || item.type === 'me'? 
							<div className={_style.friends}>
								<div className={_style.bTop}>
									<div>
										{
											item.sex === '1' ? 
												<span className={_style.man}>♂</span> :
												item.sex === '2' ? 
													<span className={_style.girl}>♀</span> :
													<span className={_style.man}></span>
										}
										<span>性别</span>
									</div>
									<div>
										<span className={_style.year}>{ item.age }</span>
										<span>年龄</span>
									</div>
									<div>
										<span className={_style.birthday}>
											<span> { parseInt(moment(item.birthday).format('MM')) } </span>
											|
											<span>{  parseInt(moment(item.birthday).format('DD')) } </span>
										</span>
										<span>生日</span>
									</div>
								</div>
								<div className={_style.bBottom}>
									<div>
										<label>QQ</label>
										<span> { item.qq } </span>
									</div>
									<div>
										<label>昵称</label>
										<span> { item.name } </span>
									</div>
									<div>
										<label>Q龄</label>
										<span> { item.qAge } 年</span>
									</div>
									<div>
										<label>手机</label>
										<span> { item.tel } </span>
									</div>
									<div>
										<label>邮箱</label>
										<span> { item.mail } </span>
									</div>
									<div className={_style.marginTop}>
										<label>说明</label>
										<span> { item.explain } </span>
									</div>
								</div>
							</div>
							:
							''
					}
				</div>
			</div>
		)
	}
}
export default IndexPage;