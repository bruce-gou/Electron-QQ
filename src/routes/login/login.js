/**
 * 登录页
 */
import React, { Component } from "react";
import { connect } from 'dva';
import { message, Icon, Checkbox, Spin } from "antd";
//静态资源
import styles from "./login.less";
import logo from '@/assets/logo-home.png';
import bg from '@/assets/bg.jpg';
@connect(({ Login }) => ({ $data:Login }))
class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			user:'admin',
			pwd:'123456',
			isRememberPwd: false
		};
	}
	//用户名
	userChange = (e) =>{
		this.setState({user: e.target.value});
	}
	//密码
	pwdChange = (e) =>{
		this.setState({pwd: e.target.value});
	}
	//是否记住密码
	checkBoxChange = (e) =>{
		this.setState({isRememberPwd: e.target.checked});
	}
	//登录
	loginSubmit = e => {
		const {user, pwd, isRememberPwd} = this.state;
		if(!user || !pwd){
			message.warning('用户名密码不能为空！');
			return;
		}
		this.setState({
			loading: true
		})
		const data = {
			user: user,
			pwd: pwd
		}
		this.props.dispatch({type: 'Login/login',payload: data});
	};
	render() {
		const { user, pwd, isRememberPwd } = this.state;
		const { loading } =  this.props.$data;
		return (
			<div className={styles.form_wrapper}>
				<img className={styles.logo} src={logo} />
	        		<img className={styles.network} src={bg} />
		        <form className={styles.form_box}>
		        		<Spin size='large' tip='登录中...' spinning={loading}>
						<div className={styles.login_title}>
							<h1>管理系统</h1>
						</div>
						<div className={styles.login_form}>
							<div className={styles.input_items}>
								<Icon className={styles.icon} type="user" />
				            		<input type="text" onChange={this.userChange} value={user} placeholder="请输入账号"/>
				          	</div>
				          	<div className={styles.input_items}>
				            		<Icon className={styles.icon} type="lock" />
				            		<input type="password" onChange={this.pwdChange} value={pwd}  placeholder="请输入密码"/>
				          	</div>
				          	<div className={styles.other}>
				            		<Checkbox onChange={this.checkBoxChange} value={isRememberPwd} >记住密码</Checkbox>
				            		{/* <div className={styles.forget}>忘记密码？</div> */}
				          	</div>
				          	<div className={styles.form_items}>
				            		<button type="submit" onClick={this.loginSubmit}>登 录</button>
				          	</div>
			          	</div>
		          	</Spin>
		        </form>
	        		<div className={styles.foot}>版权所有 不得转载 古诗词网站系统</div>
			</div>
		);
	}
}
//const mapStoreStateToProps = state => ({
//$data: state.login
//});
//export default connect(mapStoreStateToProps)(LoginPage);
export default LoginPage;
