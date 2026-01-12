'''
import { storage } from '../storage'
import Taro from '@tarojs/taro'

describe('Storage Utility', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call Taro.setStorageSync with stringified value on set', () => {
    const key = 'test_key'
    const value = { a: 1, b: 'test' }
    storage.set(key, value)
    expect(Taro.setStorageSync).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  it('should call Taro.getStorageSync and parse the value on get', () => {
    const key = 'test_key'
    const value = { a: 1, b: 'test' }
    ;(Taro.getStorageSync as jest.Mock).mockReturnValue(JSON.stringify(value))
    
    const result = storage.get(key)
    expect(Taro.getStorageSync).toHaveBeenCalledWith(key)
    expect(result).toEqual(value)
  })

  it('should return null if Taro.getStorageSync returns null', () => {
    const key = 'test_key'
    ;(Taro.getStorageSync as jest.Mock).mockReturnValue(null)
    
    const result = storage.get(key)
    expect(result).toBeNull()
  })

  it('should call Taro.removeStorageSync on remove', () => {
    const key = 'test_key'
    storage.remove(key)
    expect(Taro.removeStorageSync).toHaveBeenCalledWith(key)
  })

  it('should call Taro.clearStorageSync on clear', () => {
    storage.clear()
    expect(Taro.clearStorageSync).toHaveBeenCalled()
  })
});
'''
