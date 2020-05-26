import React, {Component} from 'react';
import {Form, Input} from 'antd';

const Item = Form.Item;

class UpdateForm extends Component {
  componentDidMount() {
    this.props.setForm(this.form);
  }

  render() {
    const {categoryName = ''} = this.props;
    console.log('render', categoryName);
    return (
      <Form ref={(ref) => (this.form = ref)} initialValues={{categoryName}}>
        <Item name='categoryName'>
          <Input placeholder='请输入分类名称'></Input>
        </Item>
      </Form>
    );
  }
}

export default UpdateForm;
