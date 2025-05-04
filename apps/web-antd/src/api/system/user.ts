import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemUserApi {
  /** 用户状态集合 */
  export const UserStatus = [0, 1] as const;

  /** 系统用户 */
  export interface SystemUser {
    /** 用户ID */
    id?: number;
    /** 用户名 */
    name: string;
    /** 密码 */
    password?: string;
    /** 真实姓名 */
    realName: string;
    /** 邮箱 */
    email: string;
    /** 电话 */
    phone?: string;
    /** 状态 */
    status: (typeof UserStatus)[number];
    /** 创建时间 */
    createdAt?: string;
    /** 角色ID列表 */
    roleIds?: string[];
    /** 更新时间 */
    // updateTime?: string;
  }
}

/**
 * 获取用户列表
 */
async function getUserList(params: Recordable<any>) {
  return requestClient.get<Array<SystemUserApi.SystemUser>>(
    '/AdminUser/GetAllAdminUsers',
    { params },
  );
}

/**
 * 获取用户详情
 */
async function getUserInfo(id: number) {
  return requestClient.get<SystemUserApi.SystemUser>('/user/info', {
    params: { id },
  });
}

/**
 * 创建用户
 */
async function createUser(data: SystemUserApi.SystemUser) {
  return requestClient.post('/api/user/add', data);
}

/**
 * 更新用户
 */
async function updateUser(data: SystemUserApi.SystemUser) {
  return requestClient.put('/api/user/update', data);
}

/**
 * 删除用户
 */
async function deleteUser(id: number) {
  return requestClient.delete('/api/user/delete', {
    params: { id },
  });
}

export { createUser, deleteUser, getUserInfo, getUserList, updateUser };
