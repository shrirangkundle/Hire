
import { Table, Popconfirm, Tag } from 'antd';
import React, { Fragment, useState } from 'react';
import "../styles/table.css";
import Icons from "../components/Icons";
import moment from 'moment';
import Icon from '../components/Icons';
// import { Button, Form, Input } from 'antd';



const data = [];

for (let i = 0; i < 30; i++) {
	data.push({
	  key: i,
	  name: `Loknath Reddy`,
	  age: 32,
	  date_added: "2022-03-12",
	  last_active_date: "2022-03-14",
	  email: "Reddy.Loknath@bridgentech.com",
	  address: `London, Park Lane no. ${i}`,
	  invoice:"Eurofins-ASP.NET Full STack Developer-22062022",
	  incentive: "₹ 20,000.00",
	  status: i==0 ? "Paid" : i==1 ? "Cancelled" : i==2 ? "Due" : "Paid"
	});
}



function TableComponent(props) { 

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {config, id} = props;

  const onSelectChange = (newSelectedRowKeys) => {
	console.log('selectedRowKeys changed: ', selectedRowKeys);
	setSelectedRowKeys(newSelectedRowKeys);
  };

  const [dataSource, setDataSource] = useState(data)
  const [pagination, setPagination] = useState({
	// current: 1,
	pageSize: 5,
  });
  const handleDelete = (key) => {
	const newData = dataSource.filter((item) => item.key !== key);
	setDataSource(newData);
  };
  	let columns = [];
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange
	};

	if(id=="user-table") {
		columns = [
			{
			title: 'Name',
			dataIndex: 'name',
			render:(text, record) => {
				return (
				<Fragment>
					<div className='multi-display-wrapper'>
					<div className='img'></div> 
					<div>
						<div className='cell-title'>{record.name}</div>
						<div>{record.email}</div>
					</div>
					</div>
				</Fragment>
				)
			},
			multiple: {
				name:1,
				email: 2
			}
			},
			{
			title: 'Date added',
			dataIndex: 'date_added',
			render: (text, record) => moment(text).format("MMM DD, YYYY")
			},
			{
			title: 'Last active',
			dataIndex: 'last_active_date',
			render: (text, record) => moment(text).format("MMM DD, YYYY")
			},
			{
			title: '',
			dataIndex: 'operation',
			width: 50,
			render: (_, record) =>
				dataSource.length >= 1 ? (
				<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
					<Icons type="delete" width={15} height={15}/>
				</Popconfirm>
				) : null,
			},
			{
			title: '',
			dataIndex: 'edit',
			width: 50,
			render: (_, record) =>
				dataSource.length >= 1 ? (
				<Icons type="pencil" width={15} height={15}/>
		
				) : null,
			},
			
		];
	} else if(id == "incentive") {
		columns = [
			{
			title: <div>Invoice <Icon type="direction-down" width={12} height={12}/></div>,
			dataIndex: 'invoice',
			showSorterTooltip: false,
			// sorter: (a, b) => a.invoice - b.invoice,
			},
			{
				title:  "Incentive",
				dataIndex: "incentive",
				align:"right"
			},
			{
				title: 'Date Due',
				dataIndex: 'date_added',
				render: (text, record) => moment(text).format("MMM DD, YYYY")
			},
			{
				title: 'Satus',
				dataIndex: 'status',
				render: (text, { tags }) => {
					let colorMapping = {
						"Paid": "green",
						"Cancelled":"red",
						"Due":"yellow"
					}
					return <Tag color={colorMapping[text]} key={text}>{text.toUpperCase()}</Tag>
				}
			},
			{
				title: "",
				dataIndex:'name',
				render: () => <Icon type="download-cloud" width={18} height={18}/>
			}

		];

	}
  	return <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={pagination} />;
}
export default TableComponent;