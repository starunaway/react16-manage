import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import moment from 'moment';
import LinkButton from '../../components/link-button';
import {reqDeleteUser, reqUsers, reqAddOrUpdateUser} from '../../api';
import UserForm from './user-form';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], // 所有用户列表
      roles: [], // 所有角色列表
      isShow: false, // 是否显示确认框
    };
  }

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getUsers();
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },

      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate,
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id],
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        ),
      },
    ];
  };

  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    // 保存
    this.roleNames = roleNames;
  };

  getUsers = async () => {
    const result = await reqUsers();
    if (result.status === 0) {
      const {users, roles} = result.data;
      this.initRoleNames(roles);
      this.setState({
        users,
        roles,
      });
    }
  };

  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id);
        if (result.status === 0) {
          message.success('删除用户成功!');
          this.getUsers();
        }
      },
    });
  };

  addOrUpdateUser = async () => {
    this.setState({isShow: false});

    const user = this.form.getFieldsValue();
    const user = this.user || {};

    this.form.setFieldsValue({
      username: user.username,
      password: user.password,
      phone: user.phone,
      email: user.email,
      role_id: user.role_id,
    });

    // 如果是更新, 需要给user指定_id属性
    if (this.user) {
      user._id = this.user._id;
    }

    // 2. 提交添加的请求
    const result = await reqAddOrUpdateUser(user);
    // 3. 更新列表显示
    if (result.status === 0) {
      message.success(`${this.user ? '修改' : '添加'}用户成功`);
      this.getUsers();
    }
  };

  showAdd = () => {
    this.user = null; // 去除前面保存的user
    this.setState({isShow: true});
  };

  showUpdate = (user) => {
    this.user = user; // 保存user
    this.setState({
      isShow: true,
    });
  };

  handleModalClose = () => {
    this.setState({isShow: false}, () => {
      const user = this.user || {};

      this.form.setFieldsValue({
        username: user.username,
        password: user.password,
        phone: user.phone,
        email: user.email,
        role_id: user.role_id,
      });
    });
  };

  render() {
    const {users, roles, isShow} = this.state;
    const user = this.user || {};
    const title = (
      <Button type='primary' onClick={this.showAdd}>
        创建用户
      </Button>
    );
    return (
      <Card title={title}>
        <Table bordered rowKey='_id' dataSource={users} columns={this.columns} pagination={{defaultPageSize: 2}} />

        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={this.handleModalClose}
        >
          <UserForm setForm={(form) => (this.form = form)} roles={roles} user={user} />
        </Modal>
      </Card>
    );
  }
}

export default User;
