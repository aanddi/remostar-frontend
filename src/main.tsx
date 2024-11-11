import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import them from '@config/app-them';

import { ReduxProvider, TanstackProvider, ToasterProvider } from '@common/providers';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <TanstackProvider>
          <ConfigProvider theme={them} locale={ruRU}>
            <App />
          </ConfigProvider>
          <ToasterProvider />
        </TanstackProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
