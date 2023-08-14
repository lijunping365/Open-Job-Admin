import { request } from 'umi';
import { getAccessToken, getRefreshToken } from '@/utils/cache';

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
    params: { accessToken: getAccessToken() },
  });
}

/** 退出登录接口 GET /login/refreshToken */
export async function tryRefreshToken() {
  return request('/login/refreshToken', {
    method: 'GET',
    params: { refreshToken: getRefreshToken() },
  });
}

export async function getFakeImageCaptcha(params: Partial<API.CaptchaParams>) {
  return request('/captcha/create/image', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getFakeSmsCaptcha(params: Partial<API.CaptchaParams>) {
  return request('/captcha/create/sms', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function fetchUserPage(params: {
  /** 当前的页码 */
  pageNum?: number;
  /** 页面的容量 */
  pageSize?: number;
  /** 任务名称 */
  name?: string;
}) {
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
    data: { ...params },
  });
}

export async function addUser(params: API.User) {
  return request('/user/save', {
    method: 'POST',
    data: { ...params },
  });
}

export async function removeUser(params: { ids: number[] }) {
  return request('/user/delete', {
    method: 'DELETE',
    data: { ...params },
  });
}

export async function fetchInstancePage(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  /** 实例id */
  clientId?: any;
  /** 应用id */
  appId?: any;
  /** 实例状态 */
  status?: number;
}) {
  return request('/instance/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function fetchAllInstance(appId: any) {
  return request('/instance/list', {
    method: 'GET',
    params: { appId },
  });
}

export async function updateInstance(params: Partial<API.Instance>) {
  return request('/instance/update', {
    method: 'PUT',
    data: { ...params },
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

export async function fetchTaskLogPage(params: {
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
}) {
  return request('/logger/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeTaskLog(params: { ids: number[] }) {
  return request('/logger/delete', {
    method: 'DELETE',
    data: { ...params },
  });
}

export async function killScheduleTask(id: number) {
  return request(`/logger/killTask/${id}`, {
    method: 'PUT',
  });
}

export async function fetchAlarmRecordPage(params: {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  /** 应用id */
  appId?: number;
  /** 任务id */
  jobId?: number;
  /** 报警时间 */
  createTime?: Date;
}) {
  return request('/alarm/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeAlarmRecord(params: { ids: number[] }) {
  return request('/alarm/delete', {
    method: 'DELETE',
    data: { ...params },
  });
}

export async function fetchScheduleTaskPage(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  /** 爬虫id */
  spiderId?: any;
  /** 任务状态 */
  status?: number;
}) {
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
    data: { ...params },
  });
}

export async function addScheduleTask(params: Partial<API.OpenJob>) {
  return request('/task/save', {
    method: 'POST',
    data: { ...params },
  });
}

export async function removeScheduleTask(params: { ids: number[] }) {
  return request('/task/delete', {
    method: 'DELETE',
    data: { ...params },
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

export async function runScheduleTask(id: number) {
  return request(`/task/run/${id}`, {
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

export async function fetchAnalysisNumber() {
  return request('/analysis/statistic', {
    method: 'GET',
  });
}

export async function fetchAppAnalysisNumber(appId: number) {
  return request('/analysis/appStatistic', {
    method: 'GET',
    params: {
      appId,
    },
  });
}

export async function fetchJobAnalysisNumber(appId: number, jobId: number) {
  return request('/analysis/jobStatistic', {
    method: 'GET',
    params: {
      appId,
      jobId,
    },
  });
}

export async function fetchInstanceAnalysisNumber(appId: number, serverId: string) {
  return request('/analysis/instanceStatistic', {
    method: 'GET',
    params: {
      appId,
      serverId,
    },
  });
}

export async function fetchAnalysisChart(params: API.ChartParam) {
  return request('/analysis/chart', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function fetchJobTimeChart(params: API.JobChartParam) {
  return request('/analysis/jobChart', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function fetchJobTok(params: API.JobTokParam) {
  return request('/analysis/jobTok', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function fetchInstanceTok(params: API.InstanceTokParam) {
  return request('/analysis/instanceTok', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function validateCronExpress(cronExpress: string) {
  return request(`/task/validateCron`, {
    method: 'GET',
    params: {
      cronExpress,
    },
  });
}

export async function fetchOpenJobAppPage(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  /** 爬虫id */
  spiderId?: any;
  /** 任务状态 */
  status?: number;
}) {
  return request('/app/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateOpenJobApp(params: Partial<API.OpenJob>) {
  return request('/app/update', {
    method: 'PUT',
    data: { ...params },
  });
}

export async function addOpenJobApp(params: Partial<API.OpenJob>) {
  return request('/app/save', {
    method: 'POST',
    data: { ...params },
  });
}

export async function removeOpenJobApp(params: { ids: number[] }) {
  return request('/app/delete', {
    method: 'DELETE',
    data: { ...params },
  });
}

export async function fetchOpenJobAppList(appName?: string) {
  return request('/app/list', {
    method: 'GET',
    params: { appName },
  });
}
