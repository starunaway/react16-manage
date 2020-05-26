import React, {Component} from 'react';
import {Form, Select, Input} from 'antd';

const Option = Select.Option;
const Item = Form.Item;

class AddForm extends Component {
  componentDidMount() {
    this.props.setForm(this.form);
  }
  render() {
    const {categorys, parentId} = this.props;
    return (
      <Form ref={(ref) => (this.form = ref)} initialValues={{parentId, categoryName: ''}}>
        <Item name='parentId'>
          <Select>
            <Option value='0'>一级分类</Option>
            {categorys.map((c) => (
              <Option value={c._id} key={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item name='categoryName' rules={[{required: true, message: '分类名称必须输入'}]}>
          <Input placeholder='请输入分类名称'></Input>
        </Item>
      </Form>
    );
  }
}

export default AddForm;
