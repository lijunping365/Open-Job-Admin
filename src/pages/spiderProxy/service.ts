import { request } from 'umi';
import type {Proxy} from "./data";

export async function fetchProxyPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 分组名称 */
    groupId?: any
    /** 分组名称 */
    ip?: string
    /** 分组名称 */
    type?: number
    /** 分组名称 */
    status?: number
  }
) {
  return request('/spiderProxy/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateProxy(params: Partial<Proxy>) {
  return request('/spiderProxy/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addProxy(params: Proxy) {
  return request('/spiderProxy/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeProxy(params: {ids: number[]}) {
  return request('/spiderProxy/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
