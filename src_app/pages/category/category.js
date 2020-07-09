import React, {Component} from 'react';
import LinkButton from '../../components/link-button';
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {Card, Table, Button, message, Modal} from 'antd';
import {reqCategorys, reqAddCategory, reqUpdateCategory} from '../../api';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';

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
            <LinkButton onClick={() => this.showUpdateModal(category)}>修改分类</LinkButton>
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
  getCategorys = async (parentId) => {
    this.setState({loading: true});
    parentId = parentId || this.state.parentId;
    const result = await reqCategorys(parentId);

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

  //  显示子分类列表
  showSubCategorys = (category) => {
    this.category = category;
    console.log('查看子分类', category);
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        this.getCategorys();
      }
    );
  };
  //   显示一级分类
  showCategorys = () => {
    this.category = {
      _id: '0',
    };
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: [],
    });
  };

  showAddModal = () => {
    console.log('showAddModal', this.category, this.state);

    this.setState({showStatus: 1});
    this.addForm &&
      this.addForm.setFieldsValue({
        parentId: this.category.parentId === '0' ? this.category._id : this.category.parentId,
      });
  };

  addCategory = () => {
    //   隐藏弹窗
    this.addForm
      .validateFields()
      .then(async (values) => {
        // 隐藏确认框
        this.setState({
          showStatus: 0,
        });

        // 收集数据, 并提交添加分类的请求
        const {parentId, categoryName} = values;
        // 清除输入数据
        this.addForm.resetFields();

        const result = await reqAddCategory(categoryName, parentId);
        if (result.status === 0) {
          // 添加的分类就是当前分类列表下的分类
          if (parentId === this.state.parentId) {
            // 重新获取当前分类列表显示
            this.getCategorys();
          } else if (parentId === '0') {
            // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
            this.getCategorys('0');
          }
        }
      })
      .catch((error) => {});
  };

  showUpdateModal = (category) => {
    console.log('showUpdateModal', category);
    this.category = category;
    this.updateForm &&
      this.updateForm.setFieldsValue({
        categoryName: this.category.name,
      });
    this.setState({showStatus: 2});
  };

  updateCategory = () => {
    this.updateForm
      .validateFields()
      .then(async (values) => {
        // 隐藏确认框
        this.setState({
          showStatus: 0,
        });

        const categoryId = this.category._id;
        const {categoryName} = values;

        // this.updateForm.resetFields();
        const result = await reqUpdateCategory(categoryId, categoryName);
        if (result.status === 0) {
          this.getCategorys();
        }
      })
      .catch((error) => {});
  };

  handleCancel = () => {
    this.addForm && this.addForm.resetFields();
    this.updateForm && this.updateForm.resetFields();

    this.setState({showStatus: 0});
  };

  render() {
    const {categorys, loading, parentId, parentName, subCategorys, showStatus} = this.state;
    const category = this.category || {};
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
          <AddForm
            setForm={(form) => {
              this.addForm = form;
            }}
            parentId={parentId}
            categorys={categorys}
          ></AddForm>
        </Modal>

        <Modal title='更新分类' visible={showStatus === 2} onOk={this.updateCategory} onCancel={this.handleCancel}>
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {
              this.updateForm = form;
            }}
          ></UpdateForm>
        </Modal>
      </div>
    );
  }
}

export default Category;
