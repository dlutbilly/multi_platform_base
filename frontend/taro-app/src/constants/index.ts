// API 相关常量
export const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080/api' 
  : 'https://api.example.com'

// 本地存储 Key
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  THEME: 'theme',
  LANGUAGE: 'language'
}

// 页面路径
export const PAGES = {
  INDEX: '/pages/index/index',
  EXPLORE: '/pages/explore/index',
  PROFILE: '/pages/profile/index',
  LOGIN: '/pages/login/index'
}

// 模块路径
export const MODULES = {
  FOOD: '/modules/food',
  TRAVEL: '/modules/travel',
  FITNESS: '/modules/fitness',
  EVENTS: '/modules/events'
}

// 主题色
export const COLORS = {
  PRIMARY: '#1890ff',
  SUCCESS: '#52c41a',
  WARNING: '#faad14',
  ERROR: '#f5222d',
  INFO: '#1890ff'
}
