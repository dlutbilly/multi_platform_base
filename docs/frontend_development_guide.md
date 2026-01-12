# 前端开发指南

## 项目概述

本项目是一个基于 **Taro + React + TypeScript** 的跨平台前端应用框架，支持 Web、小程序等多端运行。项目采用模块化设计，具有良好的可扩展性和可维护性。

## 技术架构

### 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Taro | 4.x | 跨平台框架 |
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型系统 |
| Zustand | 5.x | 状态管理 |
| SCSS | - | 样式预处理 |
| NutUI | 2.x | UI 组件库 |

### 项目结构

前端项目位于 `frontend/taro-app` 目录下，采用标准的 Taro 项目结构：

```
frontend/taro-app/
├── config/                    # 编译配置
│   ├── index.ts              # 主配置
│   ├── dev.ts                # 开发环境配置
│   └── prod.ts               # 生产环境配置
├── src/
│   ├── app.tsx               # 应用入口
│   ├── app.config.ts         # 应用配置
│   ├── app.scss              # 全局样式
│   ├── components/           # 公共组件
│   │   ├── Layout/           # 布局组件
│   │   │   ├── Header/       # 顶部导航
│   │   │   └── TabBar/       # 底部标签栏
│   │   ├── GridMenu/         # 宫格菜单
│   │   └── ContentCard/      # 内容卡片
│   ├── pages/                # 页面
│   │   ├── index/            # 首页
│   │   ├── explore/          # 探索页
│   │   ├── profile/          # 个人中心
│   │   └── login/            # 登录页
│   ├── modules/              # 业务模块
│   ├── store/                # 状态管理
│   │   ├── userStore.ts      # 用户状态
│   │   └── appStore.ts       # 应用状态
│   ├── services/             # API 服务
│   │   ├── request.ts        # 请求封装
│   │   └── api/              # API 接口
│   ├── utils/                # 工具函数
│   ├── constants/            # 常量定义
│   └── types/                # 类型定义
├── package.json
├── tsconfig.json
└── README.md
```

## 核心功能实现

### 1. 布局系统

#### Header 组件

顶部导航组件，支持搜索功能和自定义标题：

```typescript
<Header 
  title="Home" 
  showSearch 
  onSearchClick={() => console.log('Search')} 
/>
```

#### GridMenu 组件

宫格菜单组件，用于展示业务模块入口：

```typescript
const menuItems: MenuItem[] = [
  { id: '1', title: 'Food', icon: '🍴', color: '#ff6b6b' },
  // ...
]

<GridMenu items={menuItems} columns={4} onItemClick={handleClick} />
```

#### ContentCard 组件

内容卡片组件，用于展示图文内容：

```typescript
const cardData: CardData = {
  id: '1',
  title: 'Mountain Adventure',
  image: 'https://...',
  description: 'Explore nature'
}

<ContentCard data={cardData} onClick={handleClick} />
```

### 2. 状态管理

使用 **Zustand** 进行状态管理，提供了用户状态和应用状态两个 Store：

#### 用户状态 (userStore)

```typescript
import { useUserStore } from '@/store'

const { user, isLoggedIn, setUser, logout } = useUserStore()
```

#### 应用状态 (appStore)

```typescript
import { useAppStore } from '@/store'

const { loading, theme, setLoading, setTheme } = useAppStore()
```

### 3. API 服务

#### 请求封装

所有 API 请求通过统一的 `request` 实例发起，自动处理 Token 注入、错误处理等：

```typescript
import request from '@/services/request'

// GET 请求
const response = await request.get('/user/info')

// POST 请求
const response = await request.post('/user/login', { username, password })
```

#### API 接口定义

在 `services/api/` 目录下按模块组织 API 接口：

```typescript
// services/api/user.ts
export const login = (params: LoginParams) => {
  return request.post<LoginResponse>('/user/login', params)
}

export const getUserInfo = () => {
  return request.get<UserInfo>('/user/info')
}
```

### 4. 路由导航

使用 Taro 内置的路由系统进行页面跳转：

```typescript
import Taro from '@tarojs/taro'

// 跳转到新页面
Taro.navigateTo({ url: '/pages/login/index' })

// 重定向
Taro.redirectTo({ url: '/pages/index/index' })

// 返回上一页
Taro.navigateBack()
```

## 开发流程

### 1. 环境准备

```bash
# 进入项目目录
cd /home/ubuntu/multi_platform_base/frontend/taro-app

# 安装依赖
pnpm install
```

### 2. 开发运行

```bash
# H5 开发模式
pnpm dev:h5

# 微信小程序开发模式
pnpm dev:weapp
```

### 3. 生产构建

```bash
# H5 构建
pnpm build:h5

# 微信小程序构建
pnpm build:weapp
```

## 扩展开发

### 添加新页面

**步骤 1：** 创建页面目录和文件

```bash
mkdir -p src/pages/new-page
touch src/pages/new-page/index.tsx
touch src/pages/new-page/index.scss
touch src/pages/new-page/index.config.ts
```

**步骤 2：** 编写页面代码

```typescript
// src/pages/new-page/index.tsx
import { View } from '@tarojs/components'
import './index.scss'

const NewPage = () => {
  return (
    <View className="new-page">
      <View>New Page Content</View>
    </View>
  )
}

export default NewPage
```

**步骤 3：** 注册页面路由

在 `src/app.config.ts` 中添加页面路径：

```typescript
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/new-page/index',  // 新增
    // ...
  ]
})
```

### 添加新组件

**步骤 1：** 创建组件目录

```bash
mkdir -p src/components/NewComponent
touch src/components/NewComponent/index.tsx
touch src/components/NewComponent/index.scss
```

**步骤 2：** 编写组件代码

```typescript
// src/components/NewComponent/index.tsx
import { View } from '@tarojs/components'
import './index.scss'

interface NewComponentProps {
  title: string
}

const NewComponent: React.FC<NewComponentProps> = ({ title }) => {
  return (
    <View className="new-component">
      {title}
    </View>
  )
}

export default NewComponent
```

### 添加新 API

**步骤 1：** 创建 API 文件

```bash
touch src/services/api/newModule.ts
```

**步骤 2：** 定义 API 接口

```typescript
// src/services/api/newModule.ts
import request from '../request'

export interface NewModuleData {
  id: string
  name: string
}

export const getNewModuleList = () => {
  return request.get<NewModuleData[]>('/new-module/list')
}
```

## 样式规范

### 1. 尺寸单位

Taro 会自动将 `px` 转换为 `rpx`（小程序）或 `rem`（H5），设计稿基准为 **750px**。

```scss
.container {
  width: 750px;      // 全屏宽度
  padding: 32px;     // 16px 实际大小
  font-size: 28px;   // 14px 实际大小
}
```

### 2. 响应式设计

使用媒体查询适配不同屏幕尺寸：

```scss
// 移动端
.content-grid {
  grid-template-columns: repeat(2, 1fr);
}

// 平板
@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

// 桌面端
@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 3. 主题色

在 `src/constants/index.ts` 中定义了主题色常量：

```typescript
export const COLORS = {
  PRIMARY: '#1890ff',
  SUCCESS: '#52c41a',
  WARNING: '#faad14',
  ERROR: '#f5222d'
}
```

## 最佳实践

### 1. 组件设计原则

- **单一职责：** 每个组件只负责一个功能
- **可复用性：** 通过 Props 传递配置，提高组件复用性
- **类型安全：** 为组件 Props 定义 TypeScript 接口

### 2. 状态管理原则

- **局部状态：** 使用 `useState` 管理组件内部状态
- **全局状态：** 使用 Zustand Store 管理跨组件共享状态
- **持久化：** 需要持久化的状态使用 Zustand 的 `persist` 中间件

### 3. 性能优化

- 使用 `React.memo` 避免不必要的组件重渲染
- 使用 `useMemo` 和 `useCallback` 缓存计算结果和函数
- 图片使用懒加载和 CDN 加速
- 列表渲染使用虚拟滚动

### 4. 代码规范

- 遵循 ESLint 和 Prettier 规则
- 使用有意义的变量和函数命名
- 添加必要的注释说明
- 保持代码简洁和可读性

## 常见问题

### 1. 样式不生效

**原因：** 小程序平台对某些 CSS 属性不支持

**解决：** 查阅 Taro 文档，使用平台兼容的样式写法

### 2. 请求跨域

**原因：** H5 开发时存在跨域限制

**解决：** 配置开发服务器代理或后端开启 CORS

### 3. 图片加载失败

**原因：** 小程序平台对图片域名有白名单限制

**解决：** 在小程序后台配置合法域名

## 参考资源

- [Taro 官方文档](https://taro-docs.jd.com/)
- [React 官方文档](https://react.dev/)
- [Zustand 文档](https://zustand-demo.pmnd.rs/)
- [NutUI Taro 文档](https://nutui.jd.com/taro/react/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
