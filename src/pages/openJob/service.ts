import { request } from 'umi';
import type {OpenJob} from "./data";

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

export async function updateScheduleTask(params: Partial<OpenJob>) {
  return request('/task/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addScheduleTask(params: Partial<OpenJob>) {
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
