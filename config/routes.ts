export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'dashboard',
    icon: 'table',
    path: '/dashboard',
    component: './dashboard',
  },
  {
    name: 'openJob',
    icon: 'table',
    path: '/openJob',
    component: './openJob',
  },
  {
    name: 'logger',
    icon: 'smile',
    path: 'logger',
    component: './logger',
    hideInMenu: true,
  },
  {
    name: 'executor',
    icon: 'table',
    path: '/executor',
    component: './executor',
  },
  {
    name: 'admin',
    icon: 'table',
    path: '/admin',
    component: './admin',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
