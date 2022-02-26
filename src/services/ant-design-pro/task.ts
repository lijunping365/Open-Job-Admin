import { request } from 'umi';


export async function fetchTaskPage(
  params: {
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 任务名称 */
    name?: string
  },
) {
  return request('/task/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateTask(params: Partial<API.TypeListItem>) {
  return request('/task/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addTask(params: API.TypeListItem) {
  return request('/task/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeTask(params: {ids: number[]}) {
  return request('/task/delete', {
    method: 'PUT',
    data: {...params}
  });
}
