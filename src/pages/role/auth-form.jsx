import React, {PureComponent} from 'react';
import {Form, Input, Tree} from 'antd';
import menuList from '../../config/menuConfig';

const Item = Form.Item;
const {TreeNode} = Tree;

export default class AuthForm extends PureComponent {
  constructor(props) {
    super(props);
    console.log('constructor', props.role);
    this.state = {
      checkedKeys: props.role.menus,
    };
  }

  /*
  为父组件提交获取最新menus数据的方法
   */
  getMenus = () => this.state.checkedKeys;

  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      );
      return pre;
    }, []);
  };

  // 选中某个node时的回调
  onCheck = (checkedKeys) => {
    this.setState({checkedKeys});
  };

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList);
  }

  // 根据新传入的role来更新checkedKeys状态
  /*
  当组件接收到新的属性时自动调用
   */
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    this.setState({
      checkedKeys: nextProps.role.menus,
    });
  }

  render() {
    const {role} = this.props;
    const {checkedKeys} = this.state;
    console.log('render', checkedKeys);

    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {span: 4}, // 左侧label的宽度
      wrapperCol: {span: 20}, // 右侧包裹的宽度
    };

    return (
      <div>
        <Form
          {...formItemLayout}
          initialValues={{
            rolename: role.name,
          }}
        >
          <Item name='rolename' label='角色名称'>
            <Input disabled />
          </Item>
        </Form>

        <Tree checkable defaultExpandAll={true} checkedKeys={checkedKeys} onCheck={this.onCheck}>
          <TreeNode title='平台权限' key='all'>
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    );
  }
}
