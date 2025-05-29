import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppRouter from '@/router/AppRouter';
import AppStore from '@/store/AppStore';
import 'normalize.css'
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider theme={{token:{colorPrimary: "#2D59C6"}}}>
    <AppStore>
      <AppRouter />
    </AppStore>
  </ConfigProvider>
);

