import React, {Component} from 'react';
import {Form, Select, Input} from 'antd';

const Item = Form.Item;
const Option = Select.Option;

class UserForm extends Component {
  componentWillMount() {
    this.props.setForm(this.form);
  }

  render() {
    const {roles, user} = this.props;
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {span: 4}, // 左侧label的宽度
      wrapperCol: {span: 20}, // 右侧包裹的宽度
    };

    return (
      <Form
        {...formItemLayout}
        ref={(ref) => {
          this.form = ref;
        }}
        initialValues={{
          username: user.username,
          password: user.password,
          phone: user.phone,
          email: user.email,
          role_id: user.role_id,
        }}
      >
        <Item label='用户名' name='username'>
          <Input placeholder='请输入用户名' />
        </Item>

        {user._id ? null : (
          <Item label='密码' name='password'>
            <Input type='password' placeholder='请输入密码' />
          </Item>
        )}

        <Item label='手机号' name='phone'>
          <Input placeholder='请输入手机号' />
        </Item>
        <Item label='邮箱' name='email'>
          <Input placeholder='请输入邮箱' />
        </Item>

        <Item label='角色' name='role_id'>
          <Select>
            {roles.map((role) => (
              <Option key={role._id} value={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Item>
      </Form>
    );
  }
}
export default UserForm;
