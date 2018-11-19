/**
 * 面包屑导航标签
 */
import React, { Component } from "react";
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentWillMount(){
	}
	render() {
		const { data } = this.props;
		return(
			<Breadcrumb style={{marginBottom:'15px'}}>
			    <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
			    {
				    	data && data.map((item,i)=>
				    		i === data.length - 1 ? 
				    			<Breadcrumb.Item key={i}>
				    				<span>{item}</span>
			    				</Breadcrumb.Item>
				    			: 
				    			<Breadcrumb.Item key={i}>
				    				{
				    					item instanceof Object ?
				    						<Link to={item.path}>{item.name}</Link>
				    						:
				    						item
				    				}
				    			</Breadcrumb.Item>
				    )
			    }
			</Breadcrumb>
		);
	}
}
export default IndexPage;