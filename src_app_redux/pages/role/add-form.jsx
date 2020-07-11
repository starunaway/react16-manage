import React, {Component} from 'react';
import {Form, Input} from 'antd';

const Item = Form.Item;

/*
添加分类的form组件
 */
class AddForm extends Component {
  componentDidMount() {
    this.props.setForm(this.form);
  }

  render() {
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {span: 4}, // 左侧label的宽度
      wrapperCol: {span: 20}, // 右侧包裹的宽度
    };

    return (
      <Form
        initialValues={{roleName: ''}}
        {...formItemLayout}
        ref={(ref) => {
          this.form = ref;
        }}
      >
        <Item name='roleName' label='角色名称' rules={[{required: true, message: '分类名称必须输入'}]}>
          <Input placeholder='请输入角色名称' />
        </Item>
      </Form>
    );
  }
}

export default AddForm;
