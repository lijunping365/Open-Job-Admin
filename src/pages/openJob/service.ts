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
  return request('/openJob/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateScheduleTask(params: Partial<OpenJob>) {
  return request('/openJob/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addScheduleTask(params: Partial<OpenJob>) {
  return request('/openJob/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeScheduleTask(params: {ids: number[]}) {
  return request('/openJob/delete', {
    method: 'DELETE',
    data: {...params}
  });
}

export async function startScheduleTask(id: number) {
  return request(`/openJob/start/${id}`, {
    method: 'PUT',
  });
}

export async function stopScheduleTask(id: number) {
  return request(`/openJob/stop/${id}`, {
    method: 'PUT',
  });
}

export async function nextTriggerTime(cronExpress: string) {
  return request(`/openJob/nextTriggerTime`, {
    method: 'GET',
    params: {
      cronExpress,
    },
  });
}
