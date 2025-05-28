import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppRouter from '@/router/AppRouter';
import AppStore from '@/store/AppStore';
import 'normalize.css'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';  // 修改为从es目录导入
import 'moment/dist/locale/zh-cn';
import 'moment/locale/zh-cn'
import moment from 'moment'

moment.locale('zh-cn')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN} theme={{token:{colorPrimary: "#2D59C6"}}}>
    <AppStore>
      <AppRouter />
    </AppStore>
  </ConfigProvider>
);

