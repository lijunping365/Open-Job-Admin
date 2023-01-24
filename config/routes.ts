export default [
  {
    path: '/login',
    layout: false,
    name: 'login',
    component: './login',
    hideInMenu: true,
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },

  {
    name: 'app',
    icon: 'table',
    path: '/app',
    component: './app',
  },
  {
    name: 'job',
    icon: 'table',
    path: '/job',
    component: './job',
  },
  {
    name: 'user',
    icon: 'table',
    path: '/user',
    component: './user',
  },
  {
    name: 'dashboard',
    icon: 'table',
    path: '/dashboard',
    component: './dashboard',
    hideInMenu: true,
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
    hideInMenu: true,
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
