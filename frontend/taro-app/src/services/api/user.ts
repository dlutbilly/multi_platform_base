import request from '../request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    username: string
    email: string
    avatar?: string
  }
}

export interface UserInfo {
  id: string
  username: string
  email: string
  avatar?: string
  phone?: string
}

// 用户登录
export const login = (params: LoginParams) => {
  return request.post<LoginResponse>('/user/login', params)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get<UserInfo>('/user/info')
}

// 更新用户信息
export const updateUserInfo = (data: Partial<UserInfo>) => {
  return request.put<UserInfo>('/user/update', data)
}

// 用户登出
export const logout = () => {
  return request.post('/user/logout')
}
