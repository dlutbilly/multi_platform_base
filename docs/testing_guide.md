# 前端测试指南

## 概述

本文档详细介绍了跨平台基础框架前端项目的测试策略、测试环境配置、测试用例编写规范以及最佳实践。项目采用 **Jest** 作为测试框架，结合 **React Testing Library** 进行组件测试，确保代码质量和功能的正确性。

## 测试策略

本项目采用分层测试策略，涵盖单元测试、集成测试和端到端测试三个层次，确保从最小的函数单元到完整的用户流程都得到充分验证。

### 测试金字塔

测试金字塔是一种广泛采用的测试策略模型，强调在不同层次上合理分配测试资源。本项目遵循这一原则，确保测试的高效性和可维护性。

| 测试类型 | 占比 | 特点 | 适用场景 |
|---------|------|------|---------|
| **单元测试** | 70% | 速度快、隔离性强、易于维护 | 工具函数、状态管理、API 封装 |
| **集成测试** | 20% | 测试模块间交互、真实性较高 | 页面逻辑、组件协作、数据流 |
| **E2E 测试** | 10% | 模拟真实用户操作、覆盖完整流程 | 关键业务流程、用户旅程 |

## 测试环境配置

### 技术栈

项目使用以下测试工具和库来构建完整的测试环境：

- **Jest** - JavaScript 测试框架，提供断言、Mock、覆盖率统计等功能
- **React Testing Library** - React 组件测试库，强调从用户角度测试组件
- **@testing-library/jest-dom** - 提供额外的 DOM 断言匹配器
- **@testing-library/user-event** - 模拟真实用户交互
- **babel-jest** - 支持 TypeScript 和 JSX 的转译

### 安装依赖

在项目根目录下执行以下命令安装测试依赖：

```bash
cd /home/ubuntu/multi_platform_base/frontend/taro-app
pnpm install
```

所有测试相关的依赖已在 `package.json` 的 `devDependencies` 中配置完成。

### Jest 配置

项目的 Jest 配置文件位于 `jest.config.js`，主要配置项包括：

**测试环境：** 使用 `jsdom` 模拟浏览器环境，支持 DOM 操作和事件模拟。

**文件匹配规则：** 测试文件需要放置在 `__tests__` 目录下，或者文件名包含 `.test.` 或 `.spec.` 后缀。

**模块路径映射：** 支持 `@/` 别名，映射到 `src/` 目录，保持与项目代码一致的导入方式。

**样式和静态资源 Mock：** 对 CSS、SCSS 和图片文件进行 Mock 处理，避免在测试中引入样式依赖。

**覆盖率阈值：** 设置全局代码覆盖率目标为 70%，包括分支、函数、行和语句覆盖率。

### Taro API Mock

由于项目基于 Taro 框架，测试环境中需要 Mock Taro 的 API。在 `jest.setup.js` 中，我们对常用的 Taro API 进行了全局 Mock，包括：

- `Taro.request` - HTTP 请求
- `Taro.navigateTo` / `Taro.redirectTo` / `Taro.navigateBack` - 路由导航
- `Taro.showToast` - 消息提示
- `Taro.getStorageSync` / `Taro.setStorageSync` - 本地存储

这些 Mock 确保测试可以在 Node.js 环境中顺利运行，而无需真实的 Taro 运行时环境。

## 测试用例编写

### 单元测试

单元测试关注独立的函数或模块，确保其在各种输入条件下都能正确工作。

#### 工具函数测试示例

以 `storage` 工具类为例，测试其对 Taro 本地存储 API 的封装：

```typescript
// src/utils/__tests__/storage.test.ts
import { storage } from '../storage'
import Taro from '@tarojs/taro'

describe('Storage Utility', () => {
  it('should call Taro.setStorageSync with stringified value on set', () => {
    const key = 'test_key'
    const value = { a: 1, b: 'test' }
    storage.set(key, value)
    expect(Taro.setStorageSync).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  it('should return null if Taro.getStorageSync returns null', () => {
    const key = 'test_key'
    ;(Taro.getStorageSync as jest.Mock).mockReturnValue(null)
    const result = storage.get(key)
    expect(result).toBeNull()
  })
})
```

**测试要点：**

- 验证函数是否正确调用了底层 API
- 测试边界条件（如空值、异常输入）
- 确保返回值符合预期

#### API 服务测试示例

测试 `request` 服务的 HTTP 请求封装：

```typescript
// src/services/__tests__/request.test.ts
import { request } from '../request'
import Taro from '@tarojs/taro'

describe('Request Service', () => {
  it('should make a GET request successfully', async () => {
    const mockResponse = { code: 200, data: { message: 'success' }, message: 'OK' }
    ;(Taro.request as jest.Mock).mockResolvedValue({ data: mockResponse })

    const response = await request.get('/test')
    expect(Taro.request).toHaveBeenCalledWith(expect.objectContaining({ method: 'GET' }))
    expect(response).toEqual(mockResponse)
  })

  it('should handle request failure with non-200 code', async () => {
    const mockResponse = { code: 400, data: null, message: 'Bad Request' }
    ;(Taro.request as jest.Mock).mockResolvedValue({ data: mockResponse })

    await expect(request.get('/test')).rejects.toThrow('Bad Request')
    expect(Taro.showToast).toHaveBeenCalledWith({ title: 'Bad Request', icon: 'none' })
  })
})
```

**测试要点：**

- Mock 异步 API 的返回值
- 测试成功和失败两种情况
- 验证错误处理逻辑

#### 状态管理测试示例

测试 Zustand Store 的状态更新逻辑：

```typescript
// src/store/__tests__/userStore.test.ts
import { useUserStore } from '../userStore'
import { act } from '@testing-library/react'

describe('useUserStore', () => {
  it('should set user and update isLoggedIn status', () => {
    const newUser = { id: '1', username: 'testuser', email: 'test@example.com' }
    act(() => {
      useUserStore.getState().setUser(newUser)
    })
    const { user, isLoggedIn } = useUserStore.getState()
    expect(user).toEqual(newUser)
    expect(isLoggedIn).toBe(true)
  })

  it('should clear user, token and isLoggedIn status on logout', () => {
    act(() => {
      useUserStore.getState().logout()
    })
    const { user, token, isLoggedIn } = useUserStore.getState()
    expect(user).toBeNull()
    expect(token).toBeNull()
    expect(isLoggedIn).toBe(false)
  })
})
```

**测试要点：**

- 使用 `act` 包裹状态更新操作
- 验证状态变化是否符合预期
- 测试状态的初始值和重置逻辑

### 组件测试

组件测试关注 React 组件的渲染和交互行为，使用 React Testing Library 从用户角度进行测试。

#### Header 组件测试

```typescript
// src/components/Layout/Header/__tests__/index.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../index'

describe('Header Component', () => {
  it('should render title when provided', () => {
    render(<Header title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should call onSearchClick when search bar is clicked', () => {
    const onSearchClick = jest.fn()
    render(<Header onSearchClick={onSearchClick} />)
    fireEvent.click(screen.getByText('Search services & products'))
    expect(onSearchClick).toHaveBeenCalledTimes(1)
  })
})
```

**测试要点：**

- 测试组件的条件渲染
- 验证事件处理函数是否被正确调用
- 使用语义化查询（如 `getByText`、`getByRole`）

#### GridMenu 组件测试

```typescript
// src/components/GridMenu/__tests__/index.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import GridMenu, { MenuItem } from '../index'

const mockItems: MenuItem[] = [
  { id: '1', title: 'Food', icon: '🍴', color: '#ff6b6b' },
  { id: '2', title: 'Travel', icon: '✈️', color: '#4ecdc4' },
]

describe('GridMenu Component', () => {
  it('should render all menu items', () => {
    render(<GridMenu items={mockItems} />)
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(screen.getByText('Travel')).toBeInTheDocument()
  })

  it('should call onItemClick with the correct item when clicked', () => {
    const onItemClick = jest.fn()
    render(<GridMenu items={mockItems} onItemClick={onItemClick} />)
    fireEvent.click(screen.getByText('Food'))
    expect(onItemClick).toHaveBeenCalledWith(mockItems[0])
  })
})
```

**测试要点：**

- 测试列表渲染
- 验证点击事件传递的参数
- 测试组件的样式属性

### 集成测试

集成测试验证多个模块协同工作的场景，通常涉及页面级别的逻辑。

#### 登录页面集成测试

```typescript
// src/pages/login/__tests__/index.integration.test.tsx
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Login from '../index'
import { useUserStore } from '@/store/userStore'
import * as UserAPI from '@/services/api/user'

jest.mock('@/services/api/user')
const mockedUserAPI = UserAPI as jest.Mocked<typeof UserAPI>

describe('Login Page Integration Test', () => {
  it('should allow a user to log in and update the user store', async () => {
    const mockLoginResponse = {
      token: 'fake-jwt-token',
      user: { id: '1', username: 'testuser', email: 'test@example.com' },
    }
    mockedUserAPI.login.mockResolvedValue({ code: 200, data: mockLoginResponse, message: 'Success' })

    render(<Login />)
    const usernameInput = screen.getByPlaceholderText('Email or Phone')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByRole('button', { name: /Login/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    await act(async () => {
      fireEvent.click(loginButton)
    })

    expect(mockedUserAPI.login).toHaveBeenCalledWith({ 
      username: 'testuser', 
      password: 'password123' 
    })

    const { user, token, isLoggedIn } = useUserStore.getState()
    expect(user).toEqual(mockLoginResponse.user)
    expect(token).toBe(mockLoginResponse.token)
    expect(isLoggedIn).toBe(true)
  })
})
```

**测试要点：**

- Mock 外部 API 调用
- 模拟用户完整的操作流程
- 验证状态管理的更新
- 测试成功和失败两种场景

### E2E 测试

端到端测试模拟真实用户在浏览器中的操作，验证完整的业务流程。本项目预留了 E2E 测试的占位符，建议使用 **Cypress** 或 **Playwright** 进行实现。

#### E2E 测试示例（Cypress）

```typescript
// e2e/login.e2e.test.ts
describe("Login Flow E2E", () => {
  it("should successfully log in a user and redirect to the home page", () => {
    cy.visit("/pages/login/index")
    cy.get("input[placeholder=\"Email or Phone\"]").type("testuser@example.com")
    cy.get("input[placeholder=Password]").type("password123")
    cy.get("button").contains("Login").click()
    cy.url().should("include", "/pages/index/index")
    cy.contains("Welcome, testuser").should("be.visible")
  })
})
```

**测试要点：**

- 在真实浏览器环境中运行
- 测试完整的用户旅程
- 验证页面跳转和 UI 反馈

## 运行测试

### 运行所有测试

在项目根目录下执行以下命令运行所有测试用例：

```bash
cd /home/ubuntu/multi_platform_base/frontend/taro-app
pnpm test
```

### 监听模式

在开发过程中，可以使用监听模式自动运行相关测试：

```bash
pnpm test:watch
```

### 生成覆盖率报告

运行以下命令生成代码覆盖率报告：

```bash
pnpm test:coverage
```

覆盖率报告将生成在 `coverage/` 目录下，可以在浏览器中打开 `coverage/lcov-report/index.html` 查看详细的覆盖率信息。

## 测试覆盖率

项目设置了全局代码覆盖率目标为 **70%**，包括以下四个维度：

| 维度 | 目标 | 说明 |
|------|------|------|
| **分支覆盖率** | 70% | 测试是否覆盖了所有条件分支 |
| **函数覆盖率** | 70% | 测试是否调用了所有函数 |
| **行覆盖率** | 70% | 测试是否执行了所有代码行 |
| **语句覆盖率** | 70% | 测试是否执行了所有语句 |

### 当前测试覆盖情况

本项目已为以下模块编写了测试用例：

**组件测试：**
- ✅ Header 组件
- ✅ GridMenu 组件
- ✅ ContentCard 组件

**工具函数测试：**
- ✅ storage 本地存储工具

**服务测试：**
- ✅ request HTTP 请求封装

**状态管理测试：**
- ✅ userStore 用户状态管理

**集成测试：**
- ✅ 登录页面集成测试

**E2E 测试：**
- ⏳ 预留占位符，待后续实现

## 最佳实践

### 测试命名规范

测试用例的命名应该清晰地描述测试的目的和预期结果，遵循以下格式：

```
should [expected behavior] when [condition]
```

**示例：**

- `should render title when provided`
- `should call onSearchClick when search bar is clicked`
- `should return null if Taro.getStorageSync returns null`

### 测试隔离

每个测试用例应该是独立的，不依赖于其他测试的执行结果。使用 `beforeEach` 和 `afterEach` 钩子进行测试前的准备和测试后的清理工作。

```typescript
describe('Test Suite', () => {
  beforeEach(() => {
    // 重置状态、清除 Mock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
```

### Mock 的使用

合理使用 Mock 可以隔离外部依赖，提高测试的稳定性和速度。但要注意不要过度 Mock，以免测试失去真实性。

**应该 Mock 的场景：**

- 外部 API 调用
- 第三方库的复杂功能
- 浏览器 API（如 `localStorage`、`fetch`）

**不应该 Mock 的场景：**

- 项目内部的业务逻辑
- 简单的工具函数

### 测试覆盖率的合理性

虽然项目设置了 70% 的覆盖率目标，但不应盲目追求 100% 覆盖率。应该关注以下优先级：

**高优先级：**

- 核心业务逻辑
- 用户关键路径
- 容易出错的复杂逻辑

**低优先级：**

- 配置文件
- 类型定义文件
- 简单的 UI 展示组件

### 持续集成

建议将测试集成到 CI/CD 流程中，在每次代码提交或合并前自动运行测试，确保代码质量。可以使用 GitHub Actions、GitLab CI 等工具实现。

**GitHub Actions 示例：**

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm test:coverage
```

## 常见问题

### 1. 测试中如何处理异步操作？

使用 `async/await` 或 `waitFor` 等待异步操作完成：

```typescript
it('should fetch data', async () => {
  render(<MyComponent />)
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument()
  })
})
```

### 2. 如何测试路由跳转？

Mock Taro 的路由 API 并验证其调用：

```typescript
it('should navigate to home page', () => {
  render(<MyComponent />)
  fireEvent.click(screen.getByText('Go Home'))
  expect(Taro.navigateTo).toHaveBeenCalledWith({ url: '/pages/index/index' })
})
```

### 3. 如何测试样式？

React Testing Library 不推荐直接测试样式，而是测试样式带来的行为变化。如果必须测试样式，可以使用 `toHaveStyle` 匹配器：

```typescript
expect(element).toHaveStyle('display: none')
```

### 4. 测试运行很慢怎么办？

- 减少不必要的渲染和 DOM 操作
- 使用 `jest.mock` 隔离外部依赖
- 避免在测试中使用真实的网络请求
- 使用 `--maxWorkers` 参数控制并发数

## 参考资源

本测试指南参考了以下资源和最佳实践：

- [Jest 官方文档](https://jestjs.io/)
- [React Testing Library 文档](https://testing-library.com/react)
- [Taro 测试指南](https://taro-docs.jd.com/docs/test)
- [测试金字塔理论](https://martinfowler.com/articles/practical-test-pyramid.html)

---

**作者：** Manus AI  
**更新时间：** 2026-01-13
