/**
 * 该组件为列表页表格查询条件
 */
import React, { Component } from "react";
import { Input, Select, Icon, Cascader, DatePicker, Button, Row
		} from "antd";
import styles from "./index.less";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
const Search = Input.Search;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
export default class SearchBar extends Component {
	constructor(props) {
		super(props);
	}
	//不可选的日期
	disabledDate = current => {
		return current > moment().endOf("day");
	};
	//不可选的月份
	disabledMonth = current => {
		return current > moment(new Date(), "YYYY-MM");
	};
	//生产search
	createSearch = arry => {
		return (
			arry.map((item,i)=>
				<Search
					key={i}
					{...item}
				/>
			)
		)
	}
	//生成select
	createSelect = arr => {
		return (
	    		arr.map((item,i)=>
	    			<Select 
	    				key={i}
	    				{...item}
	    				style={{ width: 120}}
	    				className={styles.select}
	    			>
	    				{
	    					item.data && item.data.map((item,j)=>
	    						<Option key={j} value={item.id}>{item.txt}</Option>
	    					)
	    				}
	    			</Select>
			)
	    )
	};
	//生成button
	createButton = arry => {
		return (
			arry.map((item,i)=>
	    			<Button
	    				key={i}
			        {...item}
			      >
			        {item.text}
	      		</Button>
			)
		);
	};
	//生成 Cascader
	createCascader = arry => {
		return (
			arry.map((item,i)=>
				<Cascader
					key={i}
					{...item}
				/>
			)
		);
	};
	//生成DatePicker
	createDatePicker = arry => {
		return (
			arry.map((item,i)=>
				<DatePicker
					key={i}
					placeholder={"请选择日期"}
					disabledDate={this.disabledDate}
					{...item}
				/>
			)
		);
	};
	//生成MonthPicker
	createMonthPicker = arry => {
		return (
			arry.map((item,i)=>
				<MonthPicker
					key={i}
					placeholder={"请选择月份"}
					disabledDate={this.disabledDate}
					{...item}
				/>
			)
		);
	};
	//生成RangePicker
	createRangPicker = arry => {
		return (
			arry.map((item,i)=>
				<RangePicker
					key={i}
					disabledDate={this.disabledDate}
					{...item}
				/>
			)
		);
	};
	//根据config生成条件查询项
	searchChildrens = () => {
		const { config } = this.props;
		const childrens = [];
		// 新增
		if (config.btn) {
			 childrens.push(this.createButton(config.btn));
		}
		// 下拉选择
		if (config.select) {
			childrens.push(this.createSelect(config.select));
		}
		// 日期
		if (config.datePicker) {
			childrens.push(this.createDatePicker(config.datePicker));
		}
		// 时间区间
		if (config.rangePicker) {
			childrens.push(this.createRangPicker(config.rangePicker));
		}
		// 月份
		if (config.monthPicker) {
			childrens.push(this.createMonthPicker(config.monthPicker));
		}
		//联动选择
		if (config.cascader) {
			childrens.push(this.createCascader(config.cascader));
		}
		// 搜索
		if (config.search) {
			childrens.push(this.createSearch(config.search));
		}
		return childrens;
	};
	render() {
		const data = this.searchChildrens();
		return (
			<Row className={styles.toolbar}>
				{
					data.map((item,i)=>
						<span key={i}>{item}</span>
					)
				}
			</Row>
		)
	}
}
