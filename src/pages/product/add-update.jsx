import React, {Component} from 'react';
import {Card, Form, Input, Cascader, Button, message} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import PicturesWall from './pictures-wall';
import RichTextEditor from './rich-text-editor';
import LinkButton from '../../components/link-button';
import {reqCategorys, reqAddOrUpdateProduct} from '../../api';
const {Item} = Form;
const {TextArea} = Input;

class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    // this.pw = React.createRef();
    // this.editor = React.createRef();
  }

  componentDidMount() {
    this.getCategorys('0');
  }

  UNSAFE_componentWillMount() {
    // 取出携带的state
    const product = this.props.location.state; // 如果是添加没值, 否则有值
    // 保存是否是更新的标识
    this.isUpdate = !!product;
    // 保存商品(如果没有, 保存是{})
    this.product = product || {};
  }

  initOptions = async (categorys) => {
    // 根据categorys生成options数组
    const options = categorys.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false, // 不是叶子
    }));

    // 如果是一个二级分类商品的更新
    const {isUpdate, product} = this;
    const {pCategoryId} = product;
    if (isUpdate && pCategoryId !== '0') {
      // 获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId);
      // 生成二级下拉列表的options
      const childOptions = subCategorys.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));

      // 找到当前商品对应的一级option对象
      const targetOption = options.find((option) => option.value === pCategoryId);

      // 关联对应的一级option上
      targetOption.children = childOptions;
    }

    // 更新options状态
    this.setState({
      options,
    });
  };

  /*
  获取一级/二级分类列表
  async函数的返回值是一个新的promise对象, promise的结果和值由async的结果来决定
   */
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId); // {status: 0, data: categorys}
    if (result.status === 0) {
      const categorys = result.data;
      // 如果是一级分类列表
      if (parentId === '0') {
        this.initOptions(categorys);
      } else {
        // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
        return categorys;
      }
    }
  };
  loadData = async (selectedOptions) => {
    // 得到选择的option对象
    const targetOption = selectedOptions[0];
    // 显示loading
    targetOption.loading = true;

    // getCategorys 是个async ，需要await 获取
    const subCategorys = await this.getCategorys(targetOption.value);
    // 隐藏loading
    targetOption.loading = false;
    // 二级分类数组有数据
    if (subCategorys && subCategorys.length > 0) {
      // 生成一个二级列表的options
      const childOptions = subCategorys.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      // 关联到当前option上
      targetOption.children = childOptions;
    } else {
      // 当前选中的分类没有二级分类
      targetOption.isLeaf = true;
    }

    // 更新options状态
    this.setState({
      options: [...this.state.options],
    });
  };
  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback(); // 验证通过
    } else {
      callback('价格必须大于0'); // 验证没通过
    }
  };

  submit = () => {
    // 进行表单验证, 如果通过了, 才发送请求
    this.form.validateFields().then(async (values) => {
      // 1. 收集数据, 并封装成product对象
      console.log('submit');
      const {name, desc, price, categoryIds} = values;
      let pCategoryId, categoryId;
      if (categoryIds.length === 1) {
        pCategoryId = '0';
        categoryId = categoryIds[0];
      } else {
        pCategoryId = categoryIds[0];
        categoryId = categoryIds[1];
      }

      debugger;
      //   如果是 通过 React.createRef()创建的，需要 使用this.pw.current 才能获取当前子组件的属性
      const imgs = this.pw.getImgs();
      return;
      const detail = this.editor.current.getDetail();

      const product = {name, desc, price, imgs, detail, pCategoryId, categoryId};

      // 如果是更新, 需要添加_id
      if (this.isUpdate) {
        product._id = this.product._id;
      }

      // 2. 调用接口请求函数去添加/更新
      const result = await reqAddOrUpdateProduct(product);

      // 3. 根据结果提示
      if (result.status === 0) {
        message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`);
        this.props.history.goBack();
      } else {
        message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`);
      }
    });
  };

  render() {
    const {isUpdate, product} = this;
    const {pCategoryId, categoryId, imgs, detail} = product;
    // 用来接收级联分类ID的数组
    const categoryIds = [];
    if (isUpdate) {
      // 商品是一个一级分类的商品
      if (pCategoryId === '0') {
        categoryIds.push(categoryId);
      } else {
        // 商品是一个二级分类的商品
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }

    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {span: 4}, // 左侧label的宽度
      wrapperCol: {span: 12}, // 右侧包裹的宽度
    };

    // 头部左侧标题
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <ArrowLeftOutlined />
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    );
    return (
      <Card title={title}>
        <Form
          {...formItemLayout}
          ref={(ref) => (this.form = ref)}
          initialValues={{
            name: product.name,
            desc: product.desc,
            price: product.price,
            categoryIds: categoryIds,
          }}
        >
          <Item label='商品名称' name='name' rules={[{required: true, message: '必须输入商品名称'}]}>
            <Input placeholder='请输入商品名称' />
          </Item>
          <Item label='商品描述' name='desc' rules={[{required: true, message: '必须输入商品描述'}]}>
            <TextArea placeholder='请输入商品描述' autosize={{minRows: 2, maxRows: 6}} />
          </Item>
          <Item
            label='商品价格'
            name='price'
            rules={[{required: true, message: '必须输入商品价格'}, {validator: this.validatePrice}]}
          >
            <Input type='number' placeholder='请输入商品价格' addonAfter='元' />
          </Item>
          <Item label='商品分类' name='categoryIds' rules={[{required: true, message: '必须指定商品分类'}]}>
            <Cascader
              placeholder='请指定商品分类'
              options={this.state.options} /*需要显示的列表数据数组*/
              loadData={this.loadData} /*当选择某个列表项, 加载下一级列表的监听回调*/
            />
          </Item>
          <Item label='商品图片'>
            <PicturesWall ref={(ref) => (this.pw = ref)} imgs={imgs} />
            {/* <PicturesWall ref={this.pw} imgs={imgs} /> */}
          </Item>
          <Item label='商品详情' labelCol={{span: 4}} wrapperCol={{span: 20}}>
            <RichTextEditor ref={(ref) => (this.editor = ref)} detail={detail} />
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default ProductAddUpdate;
