import { request } from 'umi';
import type {Instance} from "./data";

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
  return request('/instanceManager/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateInstance(params: Partial<Instance>) {
  return request('/instanceManager/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function offline(clientId: string) {
  return request(`/instanceManager/offline/${clientId}`, {
    method: 'PUT',
  });
}

export async function online(clientId: string) {
  return request(`/instanceManager/online/${clientId}`, {
    method: 'PUT',
  });
}
