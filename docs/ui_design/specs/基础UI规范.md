# 跨平台基础框架 - UI设计规范与交互原则

## 1. 视觉规范 (Visual Specs)

### 1.1. 色彩系统
- **主色 (Primary):** #1890ff (科技蓝) - 用于主按钮、激活状态、关键链接。
- **成功色 (Success):** #52c41a - 用于成功提示、完成状态。
- **警告色 (Warning):** #faad14 - 用于警告提示、待处理状态。
- **错误色 (Error):** #f5222d - 用于错误提示、危险操作。
- **中性色 (Neutral):** 
  - 标题: #262626
  - 正文: #595959
  - 辅助: #8c8c8c
  - 边框: #d9d9d9
  - 背景: #f0f2f5

### 1.2. 字体系统
- **中文字体:** PingFang SC, Microsoft YaHei, sans-serif
- **英文字体:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial
- **字号:**
  - 标题 1: 24px (Bold)
  - 标题 2: 20px (Bold)
  - 标题 3: 16px (Medium)
  - 正文: 14px
  - 辅助: 12px

### 1.3. 间距与圆角
- **基础间距:** 8px (4px, 8px, 16px, 24px, 32px)
- **圆角:** 4px (基础), 8px (卡片), 50% (圆形)

## 2. 交互原则 (Interaction Principles)

### 2.1. 响应式策略
- **断点设计:**
  - Mobile: < 576px
  - Tablet: 576px - 992px
  - Desktop: > 992px
- **布局转换:**
  - PC端: 侧边栏导航 + 顶部面包屑 + 内容区。
  - 移动端: 底部标签栏 (Tabbar) 或 顶部汉堡菜单 + 全屏内容区。

### 2.2. 模块化扩展原则
- **插槽式设计:** 界面框架提供标准的 Header, Sider, Content, Footer 插槽。
- **动态菜单:** 菜单项由后端配置动态生成，支持图标 + 标题 + 路由。
- **窗口化展示:** 点击菜单后，模块在主内容区的 Tab 或 独立容器中展示。

### 2.3. 反馈机制
- **加载状态:** 全局 Loading 或 局部 Skeleton Screen。
- **操作反馈:** Toast (移动端) / Message (PC端) 提示。
- **空状态:** 统一的 Empty 组件展示。
