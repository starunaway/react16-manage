import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import moment from 'moment';
import {PAGE_SIZE} from '../../utils/constants';
import AddForm from './add-form';
import {reqRoles, reqAddRole, reqUpdateRole} from '../../api';
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
    // 用createRef创建的ref ，属性需要从ref.current里面取
    //  this.form = React.createRef()
  }

  initColumns = () => {
    return [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => {
          let c = moment(create_time).format('YYYY-MM-DD HH:mm:ss');
          return c;
        },
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (auth_time) => (auth_time ? moment(auth_time).format('YYYY-MM-DD HH:mm:ss') : ''),
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ];
  };

  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({
        roles,
      });
    }
  };

  /*
  添加角色
   */
  addRole = () => {
    // 进行表单验证, 只能通过了才向下处理
    this.form.validateFields().then(async (values) => {
      // 隐藏确认框
      this.setState({
        isShowAdd: false,
      });

      // 收集输入数据
      const {roleName} = values;
      this.form.setFieldsValue({
        roleName: '',
      });

      // 请求添加
      const result = await reqAddRole(roleName);
      // 根据结果提示/更新列表显示
      if (result.status === 0) {
        message.success('添加角色成功');
        // this.getRoles()
        // 新产生的角色
        const role = result.data;
        // 更新roles状态
        /*const roles = this.state.roles
			roles.push(role)
			this.setState({
			  roles
			})*/

        // 更新roles状态: 基于原本状态数据更新
        this.setState((state) => ({
          roles: [...state.roles, role],
        }));
      } else {
        message.success('添加角色失败');
      }
    });
  };

  /*
  更新角色
   */
  updateRole = async () => {
    // 隐藏确认框
    this.setState({
      isShowAuth: false,
    });

    const role = this.state.role;
    // 得到最新的menus
    const menus = this.auth.getMenus();
    role.menus = menus;
    role.auth_time = Date.now();
    role.auth_name = memoryUtils.user.username;

    // 请求更新
    const result = await reqUpdateRole(role);
    if (result.status === 0) {
      // this.getRoles()
      // 如果当前更新的是自己角色的权限, 强制退出
      if (role._id === memoryUtils.user.role_id) {
        memoryUtils.user = {};
        storageUtils.removeUser();
        this.props.history.replace('/login');
        message.success('当前用户角色权限成功');
      } else {
        message.success('设置角色权限成功');
        this.setState({
          roles: [...this.state.roles],
        });
      }
    }
  };
  componentDidMount() {
    this.getRoles();
  }

  onRow = (role) => {
    return {
      onClick: (event) => {
        this.setState({
          role,
        });
      },
    };
  };

  render() {
    const {roles, role, isShowAdd, isShowAuth} = this.state;

    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>
          创建角色
        </Button>
        &nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>
          设置角色权限
        </Button>
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
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              // 选择某个radio时回调
              this.setState({
                role,
              });
            },
          }}
          onRow={this.onRow}
          pagination={{
            defaultPageSize: PAGE_SIZE,
          }}
        ></Table>

        <Modal
          title='添加角色'
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({isShowAdd: false}, () => {
              this.form.setFieldsValue({
                roleName: '',
              });
            });
          }}
        >
          <AddForm
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
        <Modal
          title='设置角色权限'
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({isShowAuth: false});
          }}
        >
          <AuthForm
            ref={(ref) => {
              this.auth = ref;
            }}
            role={role}
          />
        </Modal>
      </Card>
    );
  }
}

export default Role;
