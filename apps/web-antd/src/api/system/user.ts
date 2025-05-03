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
    username: string;
    /** 密码 */
    password?: string;
    /** 昵称 */
    nickname: string;
    /** 邮箱 */
    email: string;
    /** 电话 */
    phone?: string;
    /** 状态 */
    status: (typeof UserStatus)[number];
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  /** 用户列表查询参数 */
  export interface UserListParams {
    /** 页码 */
    page: number;
    /** 每页条数 */
    pageSize: number;
    /** 用户名 */
    username?: string;
    /** 昵称 */
    nickname?: string;
    /** 状态 */
    status?: (typeof UserStatus)[number];
  }

  /** 用户列表查询结果 */
  export interface UserListResult {
    /** 用户列表 */
    items: SystemUser[];
    /** 总数 */
    total: number;
  }
}

/**
 * 获取用户列表
 */
async function getUserList(params: Recordable<any>) {
  return requestClient.get<Array<SystemUserApi.UserListResult>>(
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
