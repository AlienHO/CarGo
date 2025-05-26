# 贡献指南

欢迎为 CarGo 项目贡献代码！本文档将指导您如何参与项目开发。

## 开发环境设置

### 环境要求

- **Node.js**: >= 16.0.0
- **npm/yarn**: 推荐使用 yarn
- **Git**: 用于版本控制
- **TypeScript**: 项目使用 TypeScript 开发

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone <repository-url>
   cd shc
   ```

2. **安装依赖**
   ```bash
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   yarn start
   ```

4. **运行类型检查**
   ```bash
   yarn type-check
   ```

## 代码规范

### TypeScript 规范

1. **类型定义**
   - 所有组件必须有明确的类型定义
   - 使用 `React.FC` 定义函数组件
   - 为 props 定义接口

   ```typescript
   interface MyComponentProps {
     title: string;
     count: number;
     optional?: boolean;
   }

   const MyComponent: React.FC<MyComponentProps> = ({ title, count, optional }) => {
     // 组件实现
   };
   ```

2. **接口命名**
   - 接口名使用 PascalCase
   - Props 接口以 `Props` 结尾
   - 数据模型接口使用描述性名称

   ```typescript
   interface Vehicle { /* ... */ }
   interface VehicleCardProps { /* ... */ }
   interface FormData { /* ... */ }
   ```

3. **类型导入**
   - 明确区分类型导入和值导入
   ```typescript
   import React from 'react';
   import type { Vehicle } from '../types';
   ```

### React 组件规范

1. **组件结构**
   ```typescript
   import React from 'react';
   // 其他导入...

   interface ComponentProps {
     // props 定义
   }

   const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
     // Hooks
     const [state, setState] = useState<Type>(initialValue);
     
     // 事件处理函数
     const handleEvent = () => {
       // 处理逻辑
     };

     // 渲染
     return (
       <div>
         {/* JSX */}
       </div>
     );
   };

   export default Component;
   ```

2. **状态管理**
   - 使用 `useState` 时明确指定类型
   - 复杂状态使用 `useReducer`
   - 避免不必要的状态

3. **事件处理**
   - 使用明确的事件类型
   ```typescript
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     // 处理逻辑
   };

   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
     // 处理逻辑
   };
   ```

### 样式规范

1. **Tailwind CSS**
   - 优先使用 Tailwind CSS 类
   - 保持类名的可读性
   - 使用响应式设计类

2. **自定义样式**
   - 仅在 Tailwind 无法满足时使用自定义 CSS
   - 使用 CSS Modules 或 styled-components

## 文件组织

### 目录结构

```
src/
├── components/          # 可复用组件
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── VehicleCard.tsx
├── pages/              # 页面组件
│   ├── Home.tsx
│   ├── Mall.tsx
│   ├── VehicleDetails.tsx
│   └── AdminPanel.tsx
├── types/              # 类型定义（未来规划）
│   └── index.ts
├── utils/              # 工具函数（未来规划）
│   └── helpers.ts
├── hooks/              # 自定义Hooks（未来规划）
│   └── useVehicles.ts
└── styles/             # 样式文件
    └── index.css
```

### 命名约定

1. **文件命名**
   - 组件文件：PascalCase (例：`VehicleCard.tsx`)
   - 页面文件：PascalCase (例：`AdminPanel.tsx`)
   - 工具文件：camelCase (例：`apiHelpers.ts`)

2. **变量命名**
   - 使用 camelCase
   - 布尔值以 `is`、`has`、`can` 开头
   - 常量使用 SCREAMING_SNAKE_CASE

## Git 工作流

### 分支管理

1. **主分支**
   - `main`: 生产环境代码
   - `develop`: 开发环境代码

2. **功能分支**
   - 从 `develop` 创建功能分支
   - 命名格式：`feature/功能名称`
   - 例：`feature/vehicle-search`

3. **修复分支**
   - 从 `main` 创建热修复分支
   - 命名格式：`hotfix/问题描述`

### 提交规范

使用 Conventional Commits 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(vehicle): add vehicle search functionality

Add search bar and filter options to vehicle mall page.
Includes brand, energy type, and vehicle type filters.

Closes #123
```

### Pull Request 流程

1. **创建 PR**
   - 从功能分支向 `develop` 分支发起 PR
   - 填写清晰的 PR 描述
   - 添加相关的标签和审查者

2. **PR 模板**
   ```markdown
   ## 变更描述
   简要描述本次变更的内容

   ## 变更类型
   - [ ] 新功能
   - [ ] Bug修复
   - [ ] 文档更新
   - [ ] 代码重构
   - [ ] 性能优化

   ## 测试
   - [ ] 本地测试通过
   - [ ] 类型检查通过
   - [ ] 构建成功

   ## 相关Issue
   关闭 #issue_number
   ```

3. **代码审查**
   - 至少需要一人审查
   - 解决所有审查意见
   - 确保 CI/CD 检查通过

## 测试指南

### 测试类型

1. **单元测试**
   - 测试单个组件或函数
   - 使用 Jest + React Testing Library

2. **集成测试**
   - 测试组件之间的交互
   - 测试页面级功能

3. **端到端测试**
   - 测试完整的用户流程
   - 使用 Cypress 或 Playwright

### 测试编写原则

1. **测试文件命名**
   - 与被测试文件同名，后缀 `.test.tsx`
   - 放置在 `__tests__` 目录或与源文件同级

2. **测试结构**
   ```typescript
   import { render, screen } from '@testing-library/react';
   import MyComponent from './MyComponent';

   describe('MyComponent', () => {
     it('should render correctly', () => {
       render(<MyComponent prop="value" />);
       expect(screen.getByText('Expected Text')).toBeInTheDocument();
     });

     it('should handle click events', () => {
       const handleClick = jest.fn();
       render(<MyComponent onClick={handleClick} />);
       
       screen.getByRole('button').click();
       expect(handleClick).toHaveBeenCalled();
     });
   });
   ```

## 性能优化

### 代码优化

1. **React 优化**
   - 使用 `React.memo` 包装纯组件
   - 使用 `useMemo` 和 `useCallback` 优化计算和函数
   - 避免在渲染函数中创建对象

2. **包大小优化**
   - 使用动态导入分割代码
   - 移除未使用的依赖
   - 优化图片资源

### 性能监控

1. **开发工具**
   - React DevTools Profiler
   - Chrome DevTools Performance
   - webpack-bundle-analyzer

## 发布流程

### 版本管理

使用语义化版本控制：
- **MAJOR**: 不兼容的 API 变更
- **MINOR**: 向后兼容的功能性新增
- **PATCH**: 向后兼容的问题修正

### 发布步骤

1. **准备发布**
   ```bash
   # 更新版本号
   yarn version [patch|minor|major]
   
   # 构建生产版本
   yarn build
   
   # 运行完整测试
   yarn test
   ```

2. **创建发布标签**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

3. **部署到生产环境**
   - 通过 CI/CD 自动部署
   - 或手动部署到服务器

## 问题反馈

### Bug 报告

请使用 Issue 模板报告 bug：

```markdown
**Bug 描述**
简明扼要地描述遇到的问题

**复现步骤**
1. 访问 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

**预期行为**
描述期望的正确行为

**截图**
如果适用，添加截图帮助解释问题

**环境信息**
- OS: [例如 iOS, Windows, macOS]
- 浏览器 [例如 chrome, safari]
- 版本 [例如 22]
```

### 功能请求

使用功能请求模板：

```markdown
**功能描述**
清晰简洁地描述希望的功能

**解决的问题**
描述此功能要解决什么问题

**替代方案**
描述考虑过的其他解决方案

**附加信息**
添加任何其他相关信息或上下文
```

## 联系方式

- **项目维护者**: [维护者姓名]
- **技术讨论**: [讨论群组或论坛]
- **紧急问题**: [联系方式]

感谢您对 CarGo 项目的贡献！
