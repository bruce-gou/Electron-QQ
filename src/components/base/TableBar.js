import React, { Component } from "react";
import { Table } from "antd";
/** 
 * config配置格式如下：
 * const TableConfig = {
        dataSource: this.props.suggestState.dataSource,//表格数据
        columns: columns,//表格配置
        loading: this.props.suggestState.loading,//加载动画
        pagination: {
            simple: fasle,//当添加该属性时，显示为简单分页
            size: 'small',//取值: 'middle', 'small'
            current: this.state.current,//当前页数
            pageSize: this.state.pageSize,//分页大小
            total: this.props.suggestState.total,//总页数
            onChange: pagination.changePageCb,//点击翻页的回调
            pageSizeOptions: pagination.pageSizeOptions,//分页配置数组
            showSizeChanger: pagination.showSizeChanger,//是否可配置分页大小
            onShowSizeChange: pagination.onShowSizeChangeCb,//点击改变分页大小的回调
            showQuickJumper: pagination.showQuickJumper,//是否可以快速跳转至某页
            showTotal:(total, range) => `共 ${total} 条  显示  ${range[0]}-${range[1]} 条`
        },
        //pagination: false,//如果不需要分页时传false
        rowSelection: this.rowSelection,
        isBordered: true,
        scroll: { x: true, y: 300 },
        onRowClickCb: this.onRowClick,
        title:() => 'Header',
        footer:() => 'Footer'
    }

 * 改变pageSize的回调 
 * onShowSizeChange(current, size){
		this.setState({current:1, pageSize:size})
		this.fetchData()
    }
 *点击行的回调
 * onRowClick(record, index){
        console.log(record, index)
    }
 *多选的回调
 * const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        // getCheckboxProps: record => ({
        //   disabled: record.name === 'Disabled User', // 规定不可选的字段
        //   name: record.name,
        // }),
    }
 * 其中colums配置格式如下：
 * const columnsConfig = [
 *  { 
 *      titile: "列头显示文字",
 *      dataIndex: "列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法",
 *      fixed: "列是否固定，可选 true(等效于 left) 'left' 'right'",
 *      width: "列宽，支持number，百分比等",
 *      key: "React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性",
 *      className: "列的类名，定义样式",
 *      render: "生成复杂数据的渲染函数，参数分别为当前行的值(text)，当前行数据(record)，行索引(index)，@return里面可以设置表格行/列合并",
 *      align: "设置列内容的对齐方式，'left' | 'right' | 'center'",
 *      children: "合并嵌套子列"
 *  }
 * ]
*/

class TableBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { config } = this.props;
    config.bordered = true;
    return (
      <Table 
      	{...config}
      	rowKey={record => record.id}
      />
    ); //表格尾部处理回调
  }
}

export default TableBar;
