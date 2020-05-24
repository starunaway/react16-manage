import React, {Component} from 'react';

import {PlusOutlined} from '@ant-design/icons';
import {Card, Table, Button} from 'antd';

class Category extends Component {
  render() {
    const title = '一级分类列表';
    const extra = (
      <Button type='primary'>
        <PlusOutlined />
        添加
      </Button>
    );
    return (
      <div className='header'>
        <Card title={title} extra={extra} style={{width: '100%'}}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    );
  }
}

export default Category;
