import React from 'react';
import ReactDOM from 'react-dom';

import { ElonRouter as Router } from '@elonwu/router';

import routes from './routes';

import './index.css';
import { MediaQueryProvider } from '@elonwu/hooks';
import { Spin } from '@douyinfe/semi-ui';

ReactDOM.render(
  // limits = [768, 1024, 1440, 1920] 默认的 breakPoints, 与 tailwind 配置一致
  <MediaQueryProvider>
    <Router
      basename="/"
      rootRoutes={routes}
      loading={
        <div className="w-full h-full grid place-content-center bg-gray-600 dark:bg-gray-50 bg-opacity-40">
          <Spin size="large" />
        </div>
      }
    />
  </MediaQueryProvider>,
  document.getElementById('root'),
);
