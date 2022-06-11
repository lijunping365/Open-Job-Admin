import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/open-job/api';
import {requestInterceptor, responseInterceptor} from "@/utils/request";
import {ignorePath} from "@/utils/utils";
import defaultSettings from "../config/defaultSettings";

const loginPath = '/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
}> {
  if (ignorePath()) {
    try {
      const currentUser: any = await queryCurrentUser();
      return {
        currentUser,
        settings: defaultSettings,
      };
    } catch (error) {
      history.push(loginPath);
    }
  }
  return {
    settings: defaultSettings,
  };
}

/**
 * ProLayout 支持的api https://procomponents.ant.design/components/layout
 */
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: 'Open-Job',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      if (!initialState?.currentUser && !ignorePath()) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor]
};
