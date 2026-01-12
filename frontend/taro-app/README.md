# Multi-Platform App - Taro Frontend

基于 Taro + React + TypeScript 的跨平台前端应用框架。

## 技术栈

- **框架：** Taro 4.x + React 18
- **语言：** TypeScript
- **UI 库：** NutUI (京东凹凸实验室的跨端 UI 组件库)
- **样式：** SCSS
- **状态管理：** Zustand
- **路由：** Taro Router
- **HTTP 客户端：** Taro.request 封装

## 项目结构

```
src/
├── app.config.ts              # Taro 应用配置
├── app.scss                   # 全局样式
├── app.tsx                    # 应用入口
├── assets/                    # 静态资源
├── components/                # 公共组件
│   ├── Layout/                # 布局组件
│   ├── GridMenu/              # 宫格菜单
│   ├── ContentCard/           # 内容卡片
│   └── SearchBar/             # 搜索栏
├── pages/                     # 页面
│   ├── index/                 # 首页
│   ├── explore/               # 探索页
│   ├── profile/               # 个人中心
│   └── login/                 # 登录页
├── modules/                   # 业务模块
├── store/                     # 状态管理
├── services/                  # API 服务
├── utils/                     # 工具函数
├── constants/                 # 常量
└── types/                     # TypeScript 类型定义
```

## 功能特性

### 1. 跨平台支持
- ✅ H5 (Web)
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 其他小程序平台

### 2. 核心功能
- ✅ 用户登录认证
- ✅ 状态管理 (Zustand)
- ✅ API 请求封装
- ✅ 本地存储工具
- ✅ 响应式布局
- ✅ 模块化设计

### 3. UI 组件
- ✅ Header 顶部导航
- ✅ GridMenu 宫格菜单
- ✅ ContentCard 内容卡片
- ✅ 底部 TabBar

## 开发指南

### 安装依赖

```bash
cd /home/ubuntu/multi_platform_base/frontend/taro-app
pnpm install
```

### 开发运行

```bash
# H5 开发
pnpm dev:h5

# 微信小程序开发
pnpm dev:weapp
```

### 生产构建

```bash
# H5 构建
pnpm build:h5

# 微信小程序构建
pnpm build:weapp
```

## 配置说明

### 环境变量

在 `config/dev.ts` 和 `config/prod.ts` 中配置不同环境的参数。

### API 地址

在 `src/constants/index.ts` 中配置 API 基础地址：

```typescript
export const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080/api' 
  : 'https://api.example.com'
```

## 模块扩展

### 添加新页面

1. 在 `src/pages/` 下创建新页面目录
2. 创建 `index.tsx`、`index.scss`、`index.config.ts`
3. 在 `src/app.config.ts` 的 `pages` 数组中注册页面路径

### 添加新模块

1. 在 `src/modules/` 下创建新模块目录
2. 按照页面结构组织模块代码
3. 在菜单配置中添加模块入口

### 添加新 API

1. 在 `src/services/api/` 下创建对应的 API 文件
2. 使用 `request` 实例发起请求
3. 定义请求参数和响应类型

## 最佳实践

1. **组件化开发：** 将可复用的 UI 抽象为组件
2. **类型安全：** 充分利用 TypeScript 的类型系统
3. **状态管理：** 使用 Zustand 管理全局状态
4. **代码规范：** 遵循 ESLint 和 Prettier 规则
5. **性能优化：** 使用 React.memo、useMemo、useCallback 等优化手段

## 注意事项

- 小程序平台的样式单位会自动转换为 rpx
- 不同平台的 API 可能有差异，需要做兼容处理
- 图片资源建议使用 CDN 或在线地址
- 本地存储在不同平台有大小限制

## License

MIT
