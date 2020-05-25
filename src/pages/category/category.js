import React, {Component} from 'react';
import LinkButton from '../../components/link-button';
import {PlusOutlined} from '@ant-design/icons';
import {Card, Table, Button, message} from 'antd';
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
            <LinkButton>修改分类</LinkButton>
            <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
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
        parentId: category.id,
        parentName: category.name,
      },
      this.getCategorys()
    );
  };

  render() {
    const title = '一级分类列表';
    const extra = (
      <Button type='primary'>
        <PlusOutlined />
        添加
      </Button>
    );

    const {categorys, loading, parentId, parentName, subCategorys} = this.state;

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
      </div>
    );
  }
}

export default Category;
