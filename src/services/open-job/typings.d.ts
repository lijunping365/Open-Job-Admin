// @ts-ignore
/* eslint-disable */

declare namespace API {
  type User = {
    id: number;
    username: string;
    status: number;
    phone: string;
    createTime: Date
  };

  type Instance = {
    serverId: string;
    onlineTime: Date;
    status: string;
    weight: number;
  };

  type StatisticNumber = {
    taskTotalNum: number;
    taskRunningNum: number;
    scheduleTotalNum: number;
    scheduleSucceedNum: number;
    executorTotalNum: number;
    executorOnlineNum: number;
  }

  type StatisticReport = {
    date: Date;
    name: string;
    value: number;
  }

  type OpenJobLog = {
    id: number;
    appId: number;
    jobId: number;
    status: number;
    cause: string;
    serverId: string;
    createTime: Date;
  };

  type OpenJobApp = {
    id: number;
    appName: string;
    appDesc: string;
    createTime: Date;
    createUser: number;
  };

  type OpenJob = {
    id: number;
    appId: number;
    jobName: string;
    handlerName: string;
    cronExpression: string;
    params: string;
    status: number;
    createTime: Date;
    createUser: number;
  };

  type CurrentUser = {
    username?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type CaptchaParams = {
    deviceId?: string;
    mobile?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    deviceId?: string;
    mobile?: string;
    captcha?: string;
    type?: string;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
