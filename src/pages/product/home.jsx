import React, {Component} from 'react';
import {Card, Select, Input, Button, Table, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api';
import {PAGE_SIZE} from '../../utils/constants';
const Option = Select.Option;
class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.initColumns();
    this.state = {
      loading: false,
      total: 0, //商品总数
      products: [],
      searchName: '',
      searchType: 'productName',
    };
  }

  componentDidMount() {
    this.getProducts(1);
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

        render: (product) => {
          const {status, _id} = product;
          const newStatus = status === 1 ? 2 : 1;

          return (
            <span>
              <Button type='primary' onClick={() => this.updateStatus(_id, newStatus)}>
                {status === 1 ? '下架' : '上架'}
              </Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          );
        },
      },

      {
        title: '操作',
        width: 100,

        render: (product) => {
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  };
  getProducts = async (pageNum) => {
    this.pageNum = pageNum; // 保存pageNum, 让其它方法可以看到
    this.setState({loading: true}); // 显示loading
    const {searchName, searchType} = this.state;
    this.setState({loading: false}); // 隐藏loading

    let result;
    if (searchName) {
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType});
    } else {
      // 一般分页请求
      result = await reqProducts(pageNum, PAGE_SIZE);
    }

    if (result.status === 0) {
      const {total, list} = result.data;
      this.setState({total, products: list});
    }
  };

  /*
  更新指定商品的状态
   */
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      message.success('更新商品成功');
      this.getProducts(this.pageNum);
    }
  };

  render() {
    const {products, total, loading, searchName, searchType} = this.state;
    const title = (
      <span>
        <Select value={searchType} onChange={(value) => this.setState({searchType: value})}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='prodcutDesc'> 按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{width: 150, margin: '0 15px'}}
          onChange={(e) => this.setState({searchName: e.target.value})}
          value={searchName}
        ></Input>
        <Button type='primary' onClick={() => this.getProducts(1)}>
          搜索
        </Button>
      </span>
    );

    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
        <PlusOutlined></PlusOutlined>
        添加商品
      </Button>
    );

    return (
      <div className='header'>
        <Card title={title} extra={extra}>
          <Table
            bordered
            rowKey='_id'
            loading={loading}
            dataSource={products}
            columns={this.columns}
            pagination={{
              current: this.pageNum,

              defaultPageSize: PAGE_SIZE,
              showQuickJumper: true,
              total,
              onChange: this.getProducts,
            }}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default ProductHome;
