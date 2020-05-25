import React, {Component} from 'react';
import LinkButton from '../../components/link-button';
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {Card, Table, Button, message, Modal} from 'antd';
import {reqCategorys, reqAddCategory, reqUpdateCategory} from '../../api';
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
      subCategorys: [],
      loading: false,
      parentId: '0', //当前显示的父分类Id
      parentName: '', // 当前显示的父分类名字
      showStatus: 0, // 确认框 是否显示 0 - 都不显示，1- 显示添加 2- 显示更新
    };
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        dataIndex: '',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={this.showUpdateModal}>修改分类</LinkButton>
            {this.state.parentId === '0' && (
              <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
            )}
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    this.getCategorys();
  }

  //    异步获取一级或二级列表
  getCategorys = async () => {
    this.setState({loading: true});
    const {parentId} = this.state;
    const result = await reqCategorys(parentId);
    console.log(result);

    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === '0') {
        this.setState({categorys, loading: false});
      } else {
        this.setState({subCategorys: categorys, loading: false});
      }
    } else {
      message.error('获取分类列表失败');
    }
  };

  showSubCategorys = (category) => {
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      this.getCategorys()
    );
  };
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: [],
    });
  };

  showAddModal = () => {
    this.setState({showStatus: 1});
  };

  showUpdateModal = () => {
    this.setState({showStatus: 2});
  };

  addCategory = () => {};

  updateCategory = (category) => {};

  handleCancel = () => {
    this.setState({showStatus: 0});
  };

  render() {
    const {categorys, loading, parentId, parentName, subCategorys, showStatus} = this.state;
    const title =
      parentId === '0' ? (
        '一级分类列表'
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <ArrowRightOutlined style={{marginRight: 10}}></ArrowRightOutlined>
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type='primary' onClick={this.showAddModal}>
        <PlusOutlined />
        添加
      </Button>
    );

    return (
      <div className='header'>
        <Card title={title} extra={extra} style={{width: '100%'}}>
          <Table
            bordered
            loading={loading}
            dataSource={parentId === '0' ? categorys : subCategorys}
            columns={this.columns}
            rowKey={'_id'}
            pagination={{
              defaultPageSize: 5,
              showQuickJumper: true,
            }}
          />
        </Card>

        <Modal title='添加分类' visible={showStatus === 1} onOk={this.addCategory} onCancel={this.handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>

        <Modal title='更新分类' visible={showStatus === 2} onOk={this.updateCategory} onCancel={this.handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default Category;
