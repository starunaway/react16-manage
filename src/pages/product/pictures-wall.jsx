import React, {Component} from 'react';
import {Upload, Modal, message} from 'antd';
import {reqDeleteImg} from '../../api';
import {PlusOutlined} from '@ant-design/icons';

import {BASE_IMG_URL} from '../../utils/constants';

class PicturesWall extends Component {
  constructor(props) {
    super(props);

    let fileList = [];
    const {imgs} = this.props;
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index, // 每个file都有自己唯一的id
        name: img, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: BASE_IMG_URL + img,
      }));
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList,
    };
  }

  getImgs = () => {
    return this.state.fileList.map((file) => file.name);
  };

  handleCancel = () => this.setState({previewVisible: false});

  handlePreview = (file) => {
    console.log('handlePreview()', file);
    // 显示指定file对应的大图
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = async ({file, fileList, event}) => {
    if (file.status === 'done') {
      const result = file.response;
      if (result.status === 0) {
        message.success('上传图片成功!');
        const {name, url} = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error('上传图片失败');
      }
    } else if (file.status === 'removed') {
      const result = await reqDeleteImg(file.name);
      if (result.status === 0) {
        message.success('删除图片成功!');
      } else {
        message.error('删除图片失败!');
      }
    }
    //  需要不断更新 fileList 状态才能不停的拿到 新的 file.status
    this.setState({fileList});
  };

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div>Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action='/manage/img/upload' /*上传图片的接口地址*/
          accept='image/*' /*只接收图片格式*/
          name='image' /*请求参数名*/
          listType='picture-card' /*卡片样式*/
          fileList={fileList} /*所有已上传图片文件对象的数组*/
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{width: '100%'}} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall;
