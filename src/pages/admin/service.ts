import { request } from 'umi';


export async function fetchUserPage(
  params: {
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 任务名称 */
    name?: string
  },
) {
  return request('/user/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateUser(params: Partial<API.User>) {
  return request('/user/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addUser(params: API.User) {
  return request('/user/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeUser(params: {ids: number[]}) {
  return request('/user/delete', {
    method: 'PUT',
    data: {...params}
  });
}
