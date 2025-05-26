# CarGo - 中国二手车出口平台

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> 🚗 专业的中国二手车出口在线平台，采用现代化TypeScript + React技术栈构建

## 📋 项目概述

CarGo 是一个专注于中国二手车出口业务的综合性在线平台。平台提供车辆展示、在线商城、详情查看和后台管理等完整功能，帮助海外买家轻松找到心仪的中国品牌二手车。

### 🌟 核心特色

- 🔍 **智能筛选** - 按品牌、车型、能源类型等多维度筛选
- 📱 **响应式设计** - 完美适配桌面、平板和移动设备
- 🛒 **一站式服务** - 从浏览到购买的完整流程
- ⚡ **高性能** - TypeScript + React18 带来极致用户体验
- 🎨 **现代UI** - Tailwind CSS 打造的美观界面
- 🔐 **类型安全** - TypeScript 提供编译时类型检查

## 🛠 技术栈

### 前端框架
- **React 18** - 现代化前端框架
- **TypeScript** - 类型安全的JavaScript
- **React Router DOM** - 单页应用路由管理

### 样式与UI
- **Tailwind CSS** - 实用优先的CSS框架
- **Font Awesome** - 丰富的图标库
- **响应式设计** - 移动优先的设计理念

### 开发工具
- **React Scripts** - 零配置开发环境
- **Yarn** - 快速可靠的包管理器
- **ESLint** - 代码质量检查

## 📁 项目结构

```
src/
├── components/              # 可复用组件
│   ├── Header.tsx          # 顶部导航栏
│   ├── Footer.tsx          # 页脚组件
│   └── VehicleCard.tsx     # 车辆卡片组件
├── pages/                  # 页面组件
│   ├── Home.tsx           # 首页 - 平台介绍与特色车辆
│   ├── Mall.tsx           # 车辆商城 - 浏览和筛选
│   ├── VehicleDetails.tsx # 车辆详情 - 详细信息展示
│   └── AdminPanel.tsx     # 管理后台 - 车辆库存管理
├── hooks/                  # 自定义Hooks
├── context/               # React Context状态管理
├── utils/                 # 工具函数
├── App.tsx               # 主应用组件
├── index.tsx             # 应用入口点
├── index.css             # 全局样式
└── types/                # TypeScript类型定义
```

## 📚 项目文档

本项目提供了完整的文档体系，涵盖开发、部署和维护的各个方面：

### 核心文档
- **[README.md](README.md)** - 项目概述和快速开始指南
- **[CHANGELOG.md](CHANGELOG.md)** - 版本更新历史和变更记录

### 开发文档
- **[API 文档](docs/API.md)** - 数据模型、接口规范和类型定义
- **[组件文档](docs/COMPONENTS.md)** - 组件架构、使用方法和最佳实践
- **[贡献指南](docs/CONTRIBUTING.md)** - 代码规范、开发流程和协作指南

### 运维文档
- **[部署指南](docs/DEPLOYMENT.md)** - 各种环境的部署方案和配置说明

### 技术栈文档
详细的技术栈说明请参考各个文档：
- TypeScript 类型系统 → [API 文档](docs/API.md)
- React 组件架构 → [组件文档](docs/COMPONENTS.md)
- 项目配置和工具链 → [贡献指南](docs/CONTRIBUTING.md)

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- Yarn >= 1.22.0 (推荐) 或 npm >= 6.0.0

### 安装依赖

```bash
# 使用 Yarn (推荐)
yarn install

# 或使用 npm
npm install
```

### 启动开发服务器

```bash
# 使用 Yarn
yarn start

# 或使用 npm
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动

### 构建生产版本

```bash
# 使用 Yarn
yarn build

# 或使用 npm
npm run build
```

## 🗺 路由结构

| 路径 | 页面 | 描述 |
|------|------|------|
| `/` | 首页 | 平台介绍、特色车辆展示 |
| `/mall` | 车辆商城 | 车辆浏览、筛选功能 |
| `/vehicle/:id` | 车辆详情 | 车辆详细信息、规格参数 |
| `/admin` | 管理后台 | 车辆库存管理、数据录入 |

## 💡 功能特性

### 🏠 首页 (Home)
- 🌟 平台品牌展示
- 🚗 精选车辆推荐
- 📊 业务数据统计
- 🌍 服务地区覆盖

### 🛒 车辆商城 (Mall)
- 🔍 多维度筛选：品牌、车型、能源类型
- 📋 车辆列表展示
- 💰 价格信息
- 📱 响应式网格布局

### 📄 车辆详情 (VehicleDetails)
- 🖼 高清车辆图片
- 📊 详细技术规格
- ✨ 车辆特色功能
- 📞 联系购买按钮

### ⚙️ 管理后台 (AdminPanel)
- ➕ 新增车辆信息
- ✏️ 编辑车辆状态
- 🗑 删除车辆记录
- 📈 库存状态管理

## 🔧 TypeScript 特性

### 类型定义
项目中定义了完整的TypeScript接口：

```typescript
// 车辆数据接口
interface Vehicle {
  id: number;
  name: string;
  price: string;
  image: string;
  available: boolean;
  brand: string;
  energyType: string;
  vehicleType: string;
}

// 组件Props接口
interface VehicleCardProps {
  vehicle: Vehicle;
}
```

### 类型安全
- ✅ 所有组件都有完整的类型定义
- ✅ 事件处理器类型安全
- ✅ Props和State类型检查
- ✅ 编译时错误捕获

## 📱 响应式设计

项目采用移动优先的响应式设计：

- **移动设备** (< 768px) - 单列布局
- **平板设备** (768px - 1024px) - 双列布局  
- **桌面设备** (> 1024px) - 多列布局

## 🎨 设计系统

### 颜色主题
- **主色调**: Green (绿色系) - 环保、可持续发展
- **辅助色**: Gray (灰色系) - 专业、简洁
- **强调色**: Red (红色) - 状态提示

### 组件设计
- **卡片式布局** - 信息层次清晰
- **圆角设计** - 现代化视觉体验
- **阴影效果** - 增强层次感

## 🔮 未来规划

### 即将推出的功能
- [ ] 用户认证系统
- [ ] 在线支付集成
- [ ] 多语言支持
- [ ] 实时聊天功能
- [ ] 车辆比较工具
- [ ] 收藏夹功能

### 技术优化
- [ ] PWA支持
- [ ] 服务端渲染(SSR)
- [ ] 数据库集成
- [ ] API接口开发
- [ ] 单元测试覆盖

## 📄 开发规范

### 代码风格
- 使用TypeScript严格模式
- 遵循React Hooks最佳实践
- Tailwind CSS类名按功能分组
- 组件采用函数式组件 + Hooks

### 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建工具或辅助工具的变动
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature-name`
3. 提交更改：`git commit -m 'Add some feature'`
4. 推送分支：`git push origin feature/your-feature-name`
5. 创建 Pull Request

详细信息请参考 [贡献指南](docs/CONTRIBUTING.md)。

## 📧 联系方式

- **项目维护者**: CarGo Team
- **邮箱**: contact@cargo-export.com
- **官网**: https://cargo-export.com

## 📝 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情

---

<div align="center">

**🚗 CarGo - 让中国汽车走向世界 🌍**

Made with ❤️ by CarGo Team

</div>
