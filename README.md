# 跨平台基础项目框架

一个功能完整、易于扩展的跨平台应用开发基础框架，支持 Web、移动端、小程序等多端部署。

## 项目简介

本项目旨在提供一个开箱即用的跨平台应用开发基础框架，帮助开发者快速启动新项目，避免重复开发基础功能。框架采用现代化的技术栈，具有良好的可扩展性和可维护性。

## 核心特性

### 前端框架

- ✅ **跨平台支持** - 基于 Taro 4.x，一套代码支持 H5、微信小程序、支付宝小程序等多端运行
- ✅ **现代化技术栈** - React 18 + TypeScript + SCSS，提供类型安全和开发效率
- ✅ **状态管理** - 集成 Zustand 轻量级状态管理方案
- ✅ **响应式设计** - 支持 PC、平板、移动端自适应布局
- ✅ **模块化架构** - 组件化、模块化设计，易于扩展和维护

### 功能模块

- ✅ **用户认证** - 支持账号密码登录、手机验证码登录、第三方 OAuth 登录
- ✅ **用户中心** - 统一的用户信息管理、账户安全设置
- ✅ **API 服务** - 统一的 HTTP 请求封装，自动处理 Token、错误提示
- ✅ **本地存储** - 封装的存储工具类，支持数据持久化
- ✅ **路由管理** - 基于 Taro Router 的页面导航系统

### 测试体系

- ✅ **单元测试** - 使用 Jest + React Testing Library 进行组件和函数测试
- ✅ **集成测试** - 验证模块间协作和数据流
- ✅ **代码覆盖率** - 设置 70% 的覆盖率目标，确保代码质量
- ✅ **测试文档** - 完整的测试指南和最佳实践

## 技术架构

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Taro | 4.1.9 | 跨平台框架 |
| React | 18.3.1 | UI 框架 |
| TypeScript | 5.7.3 | 类型系统 |
| Zustand | 5.0.2 | 状态管理 |
| SCSS | 1.83.4 | 样式预处理 |
| NutUI | 2.7.5 | UI 组件库 |
| Jest | 29.7.0 | 测试框架 |

### 后端技术栈（规划）

| 技术 | 版本 | 用途 |
|------|------|------|
| Go | 1.21+ | 后端语言 |
| Gin | 1.9+ | Web 框架 |
| PostgreSQL | 15+ | 关系数据库 |
| Redis | 7+ | 缓存数据库 |
| JWT | - | 认证方案 |

## 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.x

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/dlutbilly/multi_platform_base.git
cd multi_platform_base/frontend/taro-app

# 安装依赖
pnpm install

# 运行 H5 开发模式
pnpm dev:h5

# 运行微信小程序开发模式
pnpm dev:weapp

# 构建生产版本
pnpm build:h5
pnpm build:weapp
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 监听模式（开发时使用）
pnpm test:watch

# 生成覆盖率报告
pnpm test:coverage
```

## 项目结构

```
multi_platform_base/
├── docs/                          # 项目文档
│   ├── requirements/              # 需求文档
│   │   └── 产品需求文档.md
│   ├── research/                  # 技术调研
│   │   └── 前端跨平台技术方案深度解析.md
│   ├── ui_design/                 # UI 设计
│   │   ├── assets/                # 设计图
│   │   └── specs/                 # 设计规范
│   ├── frontend_development_guide.md  # 前端开发指南
│   ├── testing_guide.md           # 测试指南
│   └── quick_start_guide.md       # 快速上手指南
├── frontend/                      # 前端项目
│   └── taro-app/                  # Taro 应用
│       ├── config/                # 编译配置
│       ├── src/
│       │   ├── components/        # 公共组件
│       │   ├── pages/             # 页面
│       │   ├── modules/           # 业务模块
│       │   ├── services/          # API 服务
│       │   ├── store/             # 状态管理
│       │   ├── utils/             # 工具函数
│       │   ├── constants/         # 常量定义
│       │   └── types/             # 类型定义
│       ├── jest.config.js         # Jest 配置
│       └── package.json
└── README.md                      # 项目说明
```

## 文档导航

### 新手入门

- [快速上手指南](docs/quick_start_guide.md) - 5 分钟快速上手
- [产品需求文档](docs/requirements/产品需求文档.md) - 了解项目需求和功能规划

### 开发指南

- [前端开发指南](docs/frontend_development_guide.md) - 详细的前端开发文档
- [测试指南](docs/testing_guide.md) - 测试用例编写和最佳实践
- [前端跨平台技术方案](docs/research/前端跨平台技术方案深度解析.md) - 技术选型分析

### 设计资源

- [UI 设计方案](docs/ui_design/前端UI设计方案.md) - 完整的 UI 设计规范
- [设计图资源](docs/ui_design/assets/) - 登录页、主界面等设计图

## 核心功能说明

### 1. 用户认证模块

支持多种登录方式：

- **账号密码登录** - 传统的用户名/邮箱 + 密码登录
- **手机验证码登录** - 短信验证码快速登录
- **第三方登录** - 支持微信、QQ、GitHub 等 OAuth 2.0 登录

### 2. 模块化系统

采用插槽式设计，业务模块可以动态加载：

- **动态菜单** - 根据配置动态生成菜单项
- **独立窗口** - 每个模块在独立的容器中展示
- **统一通信** - 模块间通过事件总线进行通信

### 3. API 服务封装

统一的 HTTP 请求处理：

- **自动 Token 注入** - 从本地存储读取 Token 并自动添加到请求头
- **错误处理** - 统一的错误提示和异常处理
- **请求拦截** - 支持请求和响应拦截器
- **重试机制** - 网络失败时自动重试

### 4. 状态管理

使用 Zustand 进行全局状态管理：

- **用户状态** - 登录信息、用户资料、Token
- **应用状态** - 加载状态、主题、语言
- **持久化** - 支持状态持久化到本地存储

## 开发规范

### 代码风格

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 严格模式

### 命名规范

- **组件命名** - PascalCase（如 `Header`, `GridMenu`）
- **文件命名** - kebab-case（如 `user-store.ts`）
- **变量命名** - camelCase（如 `userName`, `isLoggedIn`）
- **常量命名** - UPPER_SNAKE_CASE（如 `API_BASE_URL`）

### Git 提交规范

遵循 Conventional Commits 规范：

- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `style:` - 代码格式调整
- `refactor:` - 代码重构
- `test:` - 测试相关
- `chore:` - 构建/工具链更新

## 扩展开发

### 添加新页面

1. 在 `src/pages/` 下创建新目录
2. 创建 `index.tsx`, `index.scss`, `index.config.ts`
3. 在 `src/app.config.ts` 中注册页面路径

### 添加新组件

1. 在 `src/components/` 下创建组件目录
2. 创建 `index.tsx`, `index.scss`
3. 在需要的地方导入使用

### 添加新 API

1. 在 `src/services/api/` 下创建 API 文件
2. 使用 `request` 实例发起请求
3. 定义请求参数和响应类型

## 常见问题

### 1. 如何配置后端 API 地址？

在 `src/constants/index.ts` 文件中修改 `API_BASE_URL` 常量。

### 2. 如何添加新的第三方登录？

在登录页面的 `social-login` 区域添加新的图标，并在点击事件中调用对应的 OAuth API。

### 3. 如何自定义主题色？

在 `src/constants/index.ts` 中修改 `COLORS` 对象，或在 `src/app.scss` 中定义全局 CSS 变量。

### 4. 测试覆盖率不达标怎么办？

运行 `pnpm test:coverage` 查看详细报告，为覆盖率较低的模块补充测试用例。

### 5. 安装依赖时报错 `@nutui/icons-react-taro` 版本不匹配？

这是由于该包的版本命名规则较为特殊。项目已在 `package.json` 中锁定了可用版本 `0.0.1-3`。如果手动更新依赖时遇到问题，请确保使用该特定版本。

## 后续规划

### 短期（1-2 个月）

- [ ] 完善用户中心功能（头像上传、密码修改等）
- [ ] 实现支付模块（支付宝、微信支付）
- [ ] 集成广告服务（Google Ads、Facebook Ads）
- [ ] 开发后端 API（Go + Gin）

### 中期（3-6 个月）

- [ ] 实现 E2E 测试（Cypress）
- [ ] 集成 CI/CD 流程（GitHub Actions）
- [ ] 性能优化（代码分割、懒加载）
- [ ] 国际化支持（i18n）

### 长期（6-12 个月）

- [ ] 微服务架构拆分
- [ ] 容器化部署（Docker + Kubernetes）
- [ ] 监控和日志系统
- [ ] 数据分析和埋点

## 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

- **项目仓库**: https://github.com/dlutbilly/multi_platform_base
- **问题反馈**: https://github.com/dlutbilly/multi_platform_base/issues

---

**作者：** Manus AI  
**更新时间：** 2026-01-13
