# 跨平台基础框架项目 (Multi-Platform Base Framework)

## 项目简介

本项目是一个现代化的跨平台基础框架，旨在为未来的应用开发提供统一的技术基础。通过"一次编写，多端运行"的理念，极大地提升开发效率，降低维护成本，同时保证各端用户体验的一致性。

## 核心特性

- **全平台支持：** 支持Web（PC/Mac/移动端）、原生移动应用（iOS/Android）、小程序（微信/支付宝等）和桌面应用（Windows/macOS）
- **统一技术栈：** 前端采用Taro + React，后端使用Go + Gin，实现高效的跨平台开发
- **模块化架构：** 核心功能以独立模块形式存在，支持动态加载，便于扩展
- **完整的基础功能：** 内置用户认证、支付、广告、用户中心等常用功能模块
- **高性能设计：** Go语言后端保证高并发处理能力，前端优化确保流畅体验

## 技术栈

### 前端技术栈
- **框架：** Taro 4.x + React 18
- **桌面端：** Electron
- **UI库：** TaroUI / NutUI + TailwindCSS
- **状态管理：** Zustand
- **HTTP客户端：** Axios

### 后端技术栈
- **语言：** Go 1.21+
- **Web框架：** Gin
- **ORM：** GORM
- **数据库：** PostgreSQL + Redis
- **认证：** OAuth 2.1 + JWT
- **微服务通信：** gRPC

### DevOps
- **容器化：** Docker
- **CI/CD：** GitHub Actions
- **版本控制：** Git

## 项目结构

```
multi_platform_base/
├── docs/                          # 项目文档
│   ├── requirements/              # 需求文档
│   │   └── 产品需求文档.md
│   ├── architecture/              # 架构设计文档
│   └── research/                  # 技术调研文档
│       └── 前端跨平台技术方案深度解析.md
├── frontend/                      # 前端代码
│   ├── taro/                      # Taro跨平台应用
│   └── electron/                  # Electron桌面应用
├── backend/                       # 后端代码
│   ├── api/                       # API服务
│   ├── services/                  # 业务服务
│   └── models/                    # 数据模型
└── README.md                      # 项目说明
```

## 核心功能模块

### 1. 用户认证模块
- 账号密码登录/注册
- 短信验证码登录
- 第三方OAuth2授权登录（微信、QQ、GitHub等）
- Token管理（JWT + Refresh Token）
- 基于角色的访问控制（RBAC）

### 2. 用户中心模块
- 个人信息管理
- 账户安全设置
- 订单历史查询
- 消息通知中心

### 3. 支付模块
- 统一支付下单接口
- 多渠道支付集成（支付宝、微信支付、PayPal、Stripe）
- 支付回调处理
- 订单管理
- 退款功能

### 4. 广告服务模块
- 广告SDK集成（Google AdMob、Meta Audience Network）
- 广告位管理
- 广告事件追踪

### 5. 模块化系统
- 模块动态加载
- 模块注册与发现
- 菜单动态生成
- 模块间通信

### 6. 统一API服务组件
- 统一请求封装
- 请求/响应拦截器
- 自动化错误处理
- 请求重试机制

## 快速开始

### 环境要求
- Node.js 18+
- Go 1.21+
- PostgreSQL 14+
- Redis 7+
- Docker (可选)

### 安装依赖

**前端：**
```bash
cd frontend/taro
npm install
```

**后端：**
```bash
cd backend
go mod download
```

### 开发运行

**前端开发：**
```bash
# 运行H5
npm run dev:h5

# 运行微信小程序
npm run dev:weapp

# 运行React Native
npm run dev:rn
```

**后端开发：**
```bash
cd backend
go run main.go
```

## 文档

- [产品需求文档](./docs/requirements/产品需求文档.md)
- [前端跨平台技术方案深度解析](./docs/research/前端跨平台技术方案深度解析.md)

## 贡献指南

欢迎提交Issue和Pull Request来帮助改进项目。

## 许可证

本项目采用 MIT 许可证。

## 联系方式

如有问题或建议，请通过GitHub Issues联系我们。
