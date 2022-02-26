import { request } from 'umi';


export async function fetchServerPage(
  params: {
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 任务名称 */
    name?: string
  },
) {
  return request('/server/getInstances', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateServer(params: Partial<API.TypeListItem>) {
  return request('/server/update', {
    method: 'PUT',
    data: {...params}
  });
}


export async function removeServer(params: {ids: number[]}) {
  return request('/server/delete', {
    method: 'PUT',
    data: {...params}
  });
}
