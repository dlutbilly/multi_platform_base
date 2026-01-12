// 用户相关类型
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  phone?: string
}

// 菜单项类型
export interface MenuItem {
  id: string
  title: string
  icon: string
  color: string
  path?: string
}

// 内容卡片类型
export interface CardData {
  id: string
  title: string
  image: string
  description?: string
  category?: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 分页参数类型
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应类型
export interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
