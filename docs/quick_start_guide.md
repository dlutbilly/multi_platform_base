# 跨平台前端框架快速上手指南

## 1. 项目概述

本指南将引导您快速上手并运行跨平台前端框架。该框架基于 **Taro + React + TypeScript** 构建，旨在提供一个可扩展、可维护的基础，支持多端（H5、小程序等）应用开发。

### 技术栈

| 技术 | 版本 | 用途 |
|---|---|---|
| Taro | 4.x | 跨平台框架 |
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型系统 |
| Zustand | 5.x | 状态管理 |
| SCSS | - | 样式预处理 |
| Jest | 29.x | 测试框架 |
| React Testing Library | 14.x | 组件测试 |

## 2. 环境准备

在开始之前，请确保您的开发环境中已安装以下软件：

- **Node.js**: `v18.x` 或更高版本
- **pnpm**: `v8.x` 或更高版本（推荐使用 `npm install -g pnpm` 进行安装）

## 3. 安装与运行

### 步骤 1：克隆仓库

首先，将项目代码克隆到您的本地计算机。

```bash
git clone https://github.com/dlutbilly/multi_platform_base.git
cd multi_platform_base/frontend/taro-app
```

### 步骤 2：安装依赖

在项目根目录 (`frontend/taro-app`) 下，使用 `pnpm` 安装所有依赖项。

```bash
pnpm install
```

### 步骤 3：运行开发服务器

框架支持多种平台的开发模式，最常用的是 H5 (Web) 和微信小程序。

**运行 H5 (Web) 开发模式：**

```bash
pnpm dev:h5
```

该命令会启动一个本地开发服务器。您可以在浏览器中访问 `http://localhost:10086` 查看应用。

**运行微信小程序开发模式：**

```bash
pnpm dev:weapp
```

该命令会实时编译代码。您需要使用**微信开发者工具**导入 `frontend/taro-app` 目录，即可预览和调试小程序。

### 步骤 4：生产构建

当您准备好部署应用时，可以运行以下命令进行生产构建。

**构建 H5 应用：**

```bash
pnpm build:h5
```

构建产物将生成在 `dist/` 目录下，您可以将此目录下的文件部署到任何静态 Web 服务器。

**构建微信小程序：**

```bash
pnpm build:weapp
```

构建产物同样位于 `dist/` 目录。您可以使用微信开发者工具上传构建后的小程序代码。

## 4. 如何使用测试用例

项目集成了一套完整的测试体系，使用 **Jest** 和 **React Testing Library** 保证代码质量。

### 运行所有测试

执行以下命令，运行项目中的所有单元测试和集成测试。

```bash
pnpm test
```

测试结果将直接显示在终端中。

### 监听模式（推荐在开发中使用）

在开发过程中，您可以使用监听模式。该模式会在文件发生变化时自动重新运行相关的测试用例，提供即时反馈。

```bash
pnpm test:watch
```

### 生成代码覆盖率报告

要检查测试对代码的覆盖程度，可以运行以下命令生成覆盖率报告。

```bash
pnpm test:coverage
```

报告生成后，您可以在浏览器中打开 `coverage/lcov-report/index.html` 文件，查看详细的覆盖率数据，包括每个文件、函数和代码行的覆盖情况。

### 查看测试用例

所有测试用例都遵循与源文件相同的目录结构，并放置在 `__tests__` 子目录中。例如：

- `src/components/Header/` (组件代码)
- `src/components/Header/__tests__/index.test.tsx` (对应的测试用例)

## 5. 项目结构与开发

了解项目结构有助于您快速定位和修改代码。

### 核心目录结构

```
src/
├── components/      # 可复用的公共组件
├── pages/           # 主页面（首页、探索页等）
├── modules/         # 独立的业务模块
├── services/        # API 请求服务
├── store/           # 全局状态管理 (Zustand)
├── utils/           # 工具函数
├── constants/       # 全局常量
└── types/           # TypeScript 类型定义
```

### 开发流程示例：添加一个新页面

1.  **创建页面文件**：在 `src/pages/` 目录下创建一个新目录，例如 `new-page`，并添加 `index.tsx`, `index.scss`, `index.config.ts` 三个文件。

2.  **编写页面代码**：在 `index.tsx` 中编写您的 React 组件代码。

3.  **注册页面路由**：打开 `src/app.config.ts` 文件，在 `pages` 数组中添加新页面的路径：

    ```typescript
    export default defineAppConfig({
      pages: [
        'pages/index/index',
        'pages/new-page/index', // 新增页面路径
        // ...
      ]
    })
    ```

## 6. 配置文件说明

-   **API 地址**：在 `src/constants/index.ts` 文件中修改 `API_BASE_URL` 常量，以对接您的后端服务。
-   **Taro 配置**：在 `config/index.ts` 文件中可以配置项目名称、设计稿宽度等 Taro 相关参数。
-   **测试配置**：在 `jest.config.js` 文件中可以调整测试框架的行为，例如修改覆盖率阈值、添加新的 Mock 等。

---

**作者：** Manus AI  
**更新时间：** 2026-01-13
