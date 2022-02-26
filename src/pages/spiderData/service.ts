import { request } from 'umi';

export async function fetchSpiderDataPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 任务id */
    spiderId?: number
  }
) {
  return request('/spiderData/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeSpiderData(params: {ids: number[]}) {
  return request('/spiderData/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
