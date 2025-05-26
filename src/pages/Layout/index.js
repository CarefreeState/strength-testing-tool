import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Image, Typography } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import bytedanceLogo from '@/assets/bytedance.png';
import './index.scss';

const { Content, Sider } = Layout;
const { Title } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('强度查询', '/search', <DesktopOutlined />, [
    getItem('机器人', '/search/robot'),
    getItem('国服', '/search/domestic'), 
    getItem('外服', '/search/overseas'),
  ]),
  getItem('战斗模拟', '/combat', <PieChartOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 修复导航点击问题
  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  // 修复后的面包屑导航生成函数
  const generateBreadcrumbItems = () => {
    const path = ['/', '/search'].includes(location.pathname) 
      ? '/search/robot' 
      : location.pathname;
    const pathSnippets = path.split('/').filter(i => i);
    
    return pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const findLabel = (menuItems, path) => {
        for (const item of menuItems) {
          if (item.key === path) return item.label;
          if (item.children) {
            const found = item.children.find(child => child.key === path);
            if (found) return found.label;
          }
        }
        return null;
      };
      
      const label = findLabel(items, url);
      return label ? { title: label, path: url } : null;
    }).filter(Boolean);
  };

  // 确保所有Robot组件路径都选中机器人菜单项
  const currentPath = ['/', '/search', '/search/robot'].includes(location.pathname) 
    ? '/search/robot' 
    : location.pathname;

  return (
    <Layout className="layout-container">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo-container">
          <Image src={bytedanceLogo} preview={false} width={collapsed ? 32 : 64} />
          {!collapsed && <Title level={4} style={{ color: 'white', margin: 0 }}>强度测试工具</Title>}
        </div>
        <Menu 
          theme="dark" 
          selectedKeys={[currentPath]}  // 使用修正后的路径
          defaultOpenKeys={['/search']}  // 强制展开/search菜单
          mode="inline" 
          items={items} 
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Content className="content-container">
          <Breadcrumb 
            className="breadcrumb-container"
            items={[
              { title: '首页', onClick: () => navigate('/') },
              ...generateBreadcrumbItems().map(item => ({
                title: item.title,
                onClick: () => navigate(item.path)
              }))
            ]} 
          />
          <div
            className="content-wrapper"
            style={{
              '--color-bg-container': colorBgContainer,
              '--border-radius-lg': borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;