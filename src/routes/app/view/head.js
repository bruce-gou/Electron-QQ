/**
 * 头部
 */
import React, { Component } from "react";
import { Input } from 'antd';
//资源
import _style from '../style.less';
import  headIcon  from '@/assets/headIcon.png';
const Search = Input.Search;
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0
		};
	}
	componentWillReceiveProps(nexrProps){
		const { index } = nexrProps;
		this.setState({
			index: index
		})
	}
	//菜单切换
	change = ( num ) => {
		const { index } = this.state;
		const { headNavClick } = this.props;
		if (num === index) {
			return;
		}
		this.setState({
			index: num
		})
		headNavClick(num);
	}
	render() {
		const { index } = this.state;
		return(
			<header className={_style.head}>
	            <div className={_style.left}>
					 <input type="text" className={_style.search}/>
	            </div>
	            <div className={_style.center}>
	            		<div>
	            			<div onClick={()=>this.change(0)} className={ index === 0 ? _style.xx_a : _style.xx }></div>
	            			<div onClick={()=>this.change(1)} className={ index === 1 ? _style.txl_a : _style.txl }></div>
	            			<div onClick={()=>this.change(2)} className={	index === 2 ? _style.gd_a : _style.gd }></div>
	            		</div>
	            </div>
	            <div className={_style.right}>
	            		<div className={_style.headPortrait}><img src={require('@/assets/myHead.jpeg')}/></div>
	            </div>
          	</header>
		);
	}
}
export default IndexPage;