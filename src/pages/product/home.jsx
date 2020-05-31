import React, {Component} from 'react';
import {Card, Select, Input, Button, Table} from 'antd';
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons';
import LinkButton from '../../components/link-button';

const Option = Select.Option;
class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          name: 'sfjsdg',
          desc: 'jzgxv',
          price: 15,
          status: '1',
        },
      ],
    };
  }

  componentWillMount() {
    this.initColumns();
  }
  initColumns = () => {
    this.columns = [
      {dataIndex: 'name', title: '商品名称'},
      {dataIndex: 'desc', title: '商品描述'},
      {dataIndex: 'price', title: '价格', render: (price) => `￥${price}`},

      {
        dataIndex: 'status',
        title: '状态',
        width: 100,

        render: (status) => {
          return (
            <span>
              <Button type='primary'>下架</Button>
              <span>在售</span>
            </span>
          );
        },
      },

      {
        title: '操作',
        width: 100,

        render: () => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  };

  render() {
    const title = (
      <span>
        <Select value='1'>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'> 按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}}></Input>
        <Button type='primary'>搜索</Button>
      </span>
    );

    const extra = (
      <Button type='primary'>
        <PlusOutlined></PlusOutlined>
        添加商品
      </Button>
    );

    return (
      <div className='header'>
        <Card title={title} extra={extra}>
          <Table
            bordered
            // loading={loading}
            rowKey='_id'
            dataSource={this.state.products}
            columns={this.columns}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default ProductHome;
