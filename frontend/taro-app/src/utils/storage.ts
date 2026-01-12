import Taro from '@tarojs/taro'

/**
 * 本地存储工具类
 */
class Storage {
  /**
   * 设置存储
   */
  set(key: string, value: any): void {
    try {
      const data = JSON.stringify(value)
      Taro.setStorageSync(key, data)
    } catch (error) {
      console.error('Storage set error:', error)
    }
  }

  /**
   * 获取存储
   */
  get<T>(key: string): T | null {
    try {
      const data = Taro.getStorageSync(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Storage get error:', error)
      return null
    }
  }

  /**
   * 删除存储
   */
  remove(key: string): void {
    try {
      Taro.removeStorageSync(key)
    } catch (error) {
      console.error('Storage remove error:', error)
    }
  }

  /**
   * 清空所有存储
   */
  clear(): void {
    try {
      Taro.clearStorageSync()
    } catch (error) {
      console.error('Storage clear error:', error)
    }
  }
}

export const storage = new Storage()
export default storage
