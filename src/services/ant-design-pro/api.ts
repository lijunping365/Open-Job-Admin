import { request } from 'umi';
import {getAccessToken} from "@/utils/cache";

/** 获取当前的用户 GET /user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /login/list */
export async function login(body: API.LoginParams) {
  return request(`/login/${body.type}`, {
    method: 'POST',
    data: body,
  });
}

/** 退出登录接口 POST /login/outLogin */
export async function outLogin() {
  return request('/login/outLogin', {
    method: 'GET',
    params: {accessToken: getAccessToken()}
  });
}


/** 发送验证码 POST /validate/code/ */
export async function getFakeCaptcha(params: Partial<API.CaptchaParams>) {
  return request('/captcha/create', {
    method: 'POST',
    data: {
      ...params,
    },
    responseType: 'blob'
  });
}
