import { request } from 'umi';

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
