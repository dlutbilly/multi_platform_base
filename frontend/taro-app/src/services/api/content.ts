import request from '../request'

export interface ContentItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  createdAt: string
}

export interface ContentListParams {
  page?: number
  pageSize?: number
  category?: string
}

export interface ContentListResponse {
  list: ContentItem[]
  total: number
  page: number
  pageSize: number
}

// 获取内容列表
export const getContentList = (params: ContentListParams) => {
  return request.get<ContentListResponse>('/content/list', params)
}

// 获取内容详情
export const getContentDetail = (id: string) => {
  return request.get<ContentItem>(`/content/${id}`)
}

// 搜索内容
export const searchContent = (keyword: string) => {
  return request.get<ContentItem[]>('/content/search', { keyword })
}
