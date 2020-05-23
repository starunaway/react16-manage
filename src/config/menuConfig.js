import React from 'react';
import {
  UserOutlined,
  BellOutlined,
  CodeSandboxOutlined,
  BarsOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';

const menuList = [
  {title: '首页', key: '/home', icon: <PieChartOutlined />},
  {
    title: '商品',
    key: '/products',
    icon: <MailOutlined />,
    children: [
      {title: '品类管理', key: '/category', icon: <BarsOutlined />},
      {title: '商品管理', key: '/product', icon: <CodeSandboxOutlined />},
    ],
  },
  {title: '用户管理', key: '/user', icon: <UserOutlined />},
  {title: '角色管理', key: '/role', icon: <BellOutlined />},
  {
    title: '图形图表',
    key: '/charts',
    icon: <PieChartOutlined />,
    children: [
      {title: '柱状图', key: '/charts/bar', icon: ''},
      {title: '线型图', key: '/charts/line', icon: ''},
      {title: '饼图', key: '/charts/pie', icon: ''},
    ],
  },
];

export default menuList;
