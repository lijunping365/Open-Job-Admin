/**
 * 从 localStorage 中获取 accessToken
 */
import { generateUUID } from '@/utils/utils';

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

/**
 * 把 accessToken 存储到 localStorage
 * @param accessToken
 */
export function setAccessToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

/**
 * 从 localStorage 中获取 deviceId
 * localStorage:localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。
 */
export function getDeviceId() {
  const deviceId = localStorage.getItem('deviceId');
  return deviceId || setDeviceId();
}

/**
 * 把 deviceId 存储到 localStorage
 * @param deviceId
 */
export function setDeviceId() {
  const deviceId = generateUUID();
  localStorage.setItem('deviceId', deviceId);
  return deviceId;
}
