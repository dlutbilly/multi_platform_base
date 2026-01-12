import Taro from '@tarojs/taro'

interface RequestConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
}

interface Response<T = any> {
  code: number
  data: T
  message: string
}

const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080/api' 
  : 'https://api.example.com'

class Request {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(config: RequestConfig): Promise<Response<T>> {
    const { url, method = 'GET', data, header = {} } = config

    // 从本地存储获取 token
    const token = Taro.getStorageSync('token')
    if (token) {
      header['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await Taro.request({
        url: `${this.baseURL}${url}`,
        method,
        data,
        header: {
          'Content-Type': 'application/json',
          ...header
        }
      })

      const result = response.data as Response<T>

      // 统一错误处理
      if (result.code !== 200) {
        Taro.showToast({
          title: result.message || 'Request failed',
          icon: 'none'
        })
        throw new Error(result.message)
      }

      return result
    } catch (error) {
      console.error('Request error:', error)
      Taro.showToast({
        title: 'Network error',
        icon: 'none'
      })
      throw error
    }
  }

  get<T>(url: string, data?: any): Promise<Response<T>> {
    return this.request<T>({ url, method: 'GET', data })
  }

  post<T>(url: string, data?: any): Promise<Response<T>> {
    return this.request<T>({ url, method: 'POST', data })
  }

  put<T>(url: string, data?: any): Promise<Response<T>> {
    return this.request<T>({ url, method: 'PUT', data })
  }

  delete<T>(url: string, data?: any): Promise<Response<T>> {
    return this.request<T>({ url, method: 'DELETE', data })
  }
}

export const request = new Request(BASE_URL)
export default request
