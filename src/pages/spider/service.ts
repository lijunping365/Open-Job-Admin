import { request } from 'umi';
import type {Spider} from "./data";

export async function fetchSpiderPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  }
) {
  return request('/spider/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateSpider(params: Partial<Spider>) {
  return request('/spider/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addSpider(params: Partial<Spider>) {
  return request('/spider/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeSpider(params: {ids: number[]}) {
  return request('/spider/delete', {
    method: 'DELETE',
    data: {...params}
  });
}

export async function runSpider(id: number) {
  return request(`/spider/run/${id}`, {
    method: 'PUT',
  });
}
