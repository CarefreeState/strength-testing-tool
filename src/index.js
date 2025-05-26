import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from '@/router/AppRouter';
import AppStore from '@/store/AppStore';
import 'normalize.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppStore>
    <AppRouter />
  </AppStore>
);

