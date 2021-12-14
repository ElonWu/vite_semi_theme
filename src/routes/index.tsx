import { ElonRoute } from '@elonwu/router';

import {
  IconClock,
  IconHome,
  IconPhone,
  IconUserAdd,
  IconUserCircle,
  IconUserGroup,
  IconUserSetting,
} from '@douyinfe/semi-icons';

// pages
import GlobalNotFound from '../pages/GlobalNotFound';

import BI from '../pages/BI';
import FormHook from '../pages/FormHook';

// layout
import Global from '../layout/Global';
import Layout from '../layout/Layout';

const routes: ElonRoute[] = [
  // 默认页面
  {
    path: '/',
    key: 'Global',
    component: Global,
    routes: [
      {
        index: true,
        redirect: '/home',
      },
      {
        component: Layout,
        key: 'Layout',
        routes: [
          {
            inMenu: true,
            title: '首页',
            path: '/home',
            component: FormHook,
            key: 'home',
            icon: <IconHome />,
          },
          {
            inMenu: true,
            title: '新增用户',
            path: '/newly-user',
            component: BI,
            key: 'newly-user',
            icon: <IconUserAdd />,
          },
          {
            inMenu: true,
            title: '活跃用户',
            path: '/active-user',
            component: BI,
            key: 'active-user',
            icon: <IconUserCircle />,
          },
          {
            inMenu: true,
            title: '活跃分析',
            path: '/user-distribute',
            component: BI,
            key: 'user-distribute',
            icon: <IconUserGroup />,
          },
          {
            inMenu: true,
            title: '在线习惯',
            path: '/user-habit',
            component: BI,
            key: 'user-habit',
            icon: <IconClock />,
          },
          {
            inMenu: true,
            title: '设备分析',
            path: '/device',
            component: BI,
            key: 'device',
            icon: <IconPhone />,
          },
          {
            inMenu: true,
            title: '用户流失',
            path: '/user-lost',
            key: 'user-lost',
            icon: <IconUserSetting />,

            routes: [
              {
                index: true,
                redirect: '/user-lost/analyze',
              },
              {
                inMenu: true,
                title: '流失分析',
                path: '/user-lost/analyze',
                key: 'user-lost-analyze',
                component: BI,
              },
              {
                inMenu: true,
                title: '回流分析',
                path: '/user-lost/retain',
                key: 'user-lost-retain',
                component: BI,
              },
            ],
          },
        ],
      },
      // 全局 404页面
      {
        path: '*',
        key: 'GlobalNotFound',
        component: GlobalNotFound,
        title: '404',
      },
    ],
  },
];

export default routes;
