import { request } from 'umi';
import {getAccessToken} from "@/utils/cache";

/** 获取当前的用户 GET /user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /login/list */
export async function login(body: API.LoginParams) {
  return request(`/login/${body.type}`, {
    method: 'POST',
    data: body,
  });
}

/** 退出登录接口 POST /login/outLogin */
export async function outLogin() {
  return request('/login/outLogin', {
    method: 'GET',
    params: {accessToken: getAccessToken()}
  });
}


/** 发送验证码 POST /validate/code/ */
export async function getFakeCaptcha(params: Partial<API.CaptchaParams>) {
  return request('/captcha/create', {
    method: 'POST',
    data: {
      ...params,
    },
    responseType: 'blob'
  });
}

export async function fetchUserPage(
  params: {
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 任务名称 */
    name?: string
  },
) {
  return request('/user/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateUser(params: Partial<API.User>) {
  return request('/user/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addUser(params: API.User) {
  return request('/user/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeUser(params: {ids: number[]}) {
  return request('/user/delete', {
    method: 'PUT',
    data: {...params}
  });
}


export async function fetchInstancePage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 实例id */
    clientId?: any
    /** 实例状态 */
    status?: number
  }
) {
  return request('/instance/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateInstance(params: Partial<API.Instance>) {
  return request('/instance/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function offline(clientId: string) {
  return request(`/instance/offline/${clientId}`, {
    method: 'PUT',
  });
}

export async function online(clientId: string) {
  return request(`/instance/online/${clientId}`, {
    method: 'PUT',
  });
}

export async function fetchTaskLogPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 任务id */
    jobId?: number;
    /** 任务状态 */
    status?: number;
    /** 任务执行时间 */
    createTime?: Date;
  }
) {
  return request('/logger/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeTaskLog(params: {ids: number[]}) {
  return request('/logger/delete', {
    method: 'DELETE',
    data: {...params}
  });
}

export async function fetchScheduleTaskPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 爬虫id */
    spiderId?: any
    /** 任务状态 */
    status?: number
  }
) {
  return request('/task/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateScheduleTask(params: Partial<API.OpenJob>) {
  return request('/task/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addScheduleTask(params: Partial<API.OpenJob>) {
  return request('/task/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeScheduleTask(params: {ids: number[]}) {
  return request('/task/delete', {
    method: 'DELETE',
    data: {...params}
  });
}

export async function startScheduleTask(id: number) {
  return request(`/task/start/${id}`, {
    method: 'PUT',
  });
}

export async function stopScheduleTask(id: number) {
  return request(`/task/stop/${id}`, {
    method: 'PUT',
  });
}

export async function nextTriggerTime(cronExpress: string) {
  return request(`/task/nextTriggerTime`, {
    method: 'GET',
    params: {
      cronExpress,
    },
  });
}

