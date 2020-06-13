import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import moment from 'moment';
import {PAGE_SIZE} from '../../utils/constants';
import AddForm from './add-form';
import AuthForm from './auth-form';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [], // 所有角色的列表
      role: {}, // 选中的role
      isShowAdd: false, // 是否显示添加界面
      isShowAuth: false, // 是否显示设置权限界面
    };
    this.columns = this.initColumns();
  }

  initColumns = () => {
    return [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'craate_time',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ];
  };

  onRow = (role) => {
    return {
      onClick: (event) => {},
    };
  };

  render() {
    const {roles} = this.state;

    const title = (
      <span>
        {' '}
        <Button type='primary'>创建角色</Button>
        <Button type='primary'>设置角色权限</Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          rowSelection={{
            type: 'radio',
          }}
          onRow={this.onRow}
          pagination={{
            defaultPageSize: PAGE_SIZE,
          }}
        ></Table>
      </Card>
    );
  }
}

export default Role;
