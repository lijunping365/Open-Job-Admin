import { request } from 'umi';

export async function fetchSpiderLogPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 任务id */
    spiderId?: number
    /** 任务状态 */
    status?: number
  }
) {
  return request('/spiderLog/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeSpiderLog(params: {ids: number[]}) {
  return request('/spiderLog/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
