# 组件文档

本文档详细介绍了 CarGo 项目中所有组件的设计、用法和API。

## 组件架构

### 组件层次结构

```
src/
├── components/          # 可复用组件
│   ├── Header.tsx      # 页面头部组件
│   ├── Footer.tsx      # 页面底部组件
│   └── VehicleCard.tsx # 车辆卡片组件
└── pages/              # 页面组件
    ├── Home.tsx        # 首页
    ├── Mall.tsx        # 车辆商城
    ├── VehicleDetails.tsx # 车辆详情
    └── AdminPanel.tsx  # 管理后台
```

### 设计原则

1. **单一职责**: 每个组件只负责一个功能
2. **可复用性**: 组件设计考虑复用场景
3. **类型安全**: 所有组件都有完整的TypeScript类型定义
4. **响应式**: 支持多种设备尺寸
5. **无障碍**: 遵循WCAG无障碍设计标准

## 通用组件 (Components)

### Header 组件

导航头部组件，提供全站导航功能。

#### 类型定义

```typescript
interface HeaderProps {}

const Header: React.FC<HeaderProps>
```

#### 功能特性

- 🧭 主导航菜单
- 📱 响应式设计
- 🎨 统一的品牌展示
- 🔗 路由链接集成

#### 使用示例

```typescript
import Header from '../components/Header';

function App() {
  return (
    <div>
      <Header />
      {/* 其他内容 */}
    </div>
  );
}
```

#### 样式类名

```css
/* 主要容器 */
.header-container {
  @apply bg-white shadow-md;
}

/* 导航链接 */
.nav-link {
  @apply text-gray-700 hover:text-blue-600;
}

/* 品牌Logo */
.brand-logo {
  @apply text-xl font-bold text-blue-600;
}
```

#### 响应式行为

- **桌面端**: 水平导航菜单
- **平板端**: 压缩导航
- **移动端**: 汉堡菜单（待实现）

---

### Footer 组件

页面底部组件，显示版权信息和链接。

#### 类型定义

```typescript
interface FooterProps {}

const Footer: React.FC<FooterProps>
```

#### 功能特性

- 📄 版权声明
- 🔗 重要链接
- 📞 联系信息
- 🎨 一致的视觉设计

#### 使用示例

```typescript
import Footer from '../components/Footer';

function App() {
  return (
    <div>
      {/* 主要内容 */}
      <Footer />
    </div>
  );
}
```

#### 内容结构

```typescript
// Footer 包含的链接和信息
const footerData = {
  copyright: "© 2024 CarGo Platform. All rights reserved.",
  links: [
    { name: "关于我们", href: "/about" },
    { name: "联系我们", href: "/contact" },
    { name: "隐私政策", href: "/privacy" },
    { name: "服务条款", href: "/terms" }
  ]
};
```

---

### VehicleCard 组件

车辆信息卡片组件，用于展示车辆基本信息。

#### 类型定义

```typescript
interface Vehicle {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  available: boolean;
  energyType: string;
  vehicleType: string;
  mileage?: string;
  location?: string;
  description?: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: (vehicle: Vehicle) => void;
  className?: string;
}

const VehicleCard: React.FC<VehicleCardProps>
```

#### 功能特性

- 🚗 车辆信息展示
- 🖼️ 图片懒加载
- 💰 价格高亮显示
- 🔗 点击跳转详情
- 🏷️ 可用性状态指示
- 📱 响应式卡片布局

#### 使用示例

```typescript
import VehicleCard from '../components/VehicleCard';

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "BYD Han EV",
    brand: "BYD",
    price: "$19,500",
    image: "/images/byd-han.jpg",
    available: true,
    energyType: "Electric",
    vehicleType: "Sedan"
  }
];

function VehicleList() {
  const handleCardClick = (vehicle: Vehicle) => {
    navigate(`/vehicle/${vehicle.id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map(vehicle => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}
```

#### Props 详解

| 属性 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `vehicle` | `Vehicle` | ✅ | - | 车辆数据对象 |
| `onClick` | `(vehicle: Vehicle) => void` | ❌ | - | 点击事件处理函数 |
| `className` | `string` | ❌ | `""` | 额外的CSS类名 |

#### 状态指示器

```typescript
// 可用性状态样式
const statusStyles = {
  available: "bg-green-500 text-white",
  sold: "bg-red-500 text-white", 
  pending: "bg-yellow-500 text-black"
};

// 能源类型标签
const energyTypeColors = {
  Electric: "bg-green-100 text-green-800",
  Gasoline: "bg-blue-100 text-blue-800",
  Hybrid: "bg-purple-100 text-purple-800"
};
```

#### 自定义样式示例

```typescript
// 使用自定义样式
<VehicleCard
  vehicle={vehicle}
  className="shadow-lg hover:shadow-xl transition-shadow"
  onClick={handleCardClick}
/>
```

## 页面组件 (Pages)

### Home 页面

应用首页，展示平台介绍和核心功能。

#### 类型定义

```typescript
interface HomeProps {}

const Home: React.FC<HomeProps>
```

#### 页面结构

```typescript
// 首页内容结构
const homeContent = {
  hero: {
    title: "中国二手车出口平台",
    subtitle: "专业、可靠、高效的二手车出口服务",
    cta: "浏览车辆"
  },
  features: [
    {
      icon: "🚗",
      title: "精选车辆",
      description: "严格筛选的优质二手车"
    },
    {
      icon: "🌍", 
      title: "全球出口",
      description: "覆盖全球主要市场"
    },
    {
      icon: "📋",
      title: "完整手续",
      description: "提供完整的出口文件"
    }
  ]
};
```

#### 功能特性

- 🎯 品牌介绍和价值主张
- 🚀 快速导航到主要功能
- 💼 核心服务展示
- 📊 平台统计数据
- 📱 响应式英雄区块

---

### Mall 页面

车辆商城页面，提供车辆浏览和筛选功能。

#### 类型定义

```typescript
interface Filters {
  energyType: string;
  vehicleType: string;
  brand: string;
}

interface MallProps {}

const Mall: React.FC<MallProps>
```

#### 状态管理

```typescript
// 页面状态
const [vehicles, setVehicles] = useState<Vehicle[]>([]);
const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
const [filters, setFilters] = useState<Filters>({
  energyType: '',
  vehicleType: '',
  brand: ''
});
const [loading, setLoading] = useState<boolean>(true);
```

#### 筛选功能

```typescript
// 筛选逻辑
const applyFilters = useCallback(() => {
  let filtered = vehicles;
  
  if (filters.energyType) {
    filtered = filtered.filter(v => v.energyType === filters.energyType);
  }
  
  if (filters.vehicleType) {
    filtered = filtered.filter(v => v.vehicleType === filters.vehicleType);
  }
  
  if (filters.brand) {
    filtered = filtered.filter(v => v.brand === filters.brand);
  }
  
  setFilteredVehicles(filtered);
}, [vehicles, filters]);
```

#### 功能特性

- 🔍 多条件筛选
- 📋 车辆列表展示
- 🏷️ 品牌和类型分类
- ⚡ 实时筛选更新
- 📱 响应式网格布局
- 🔄 加载状态管理

---

### VehicleDetails 页面

车辆详情页面，显示单个车辆的完整信息。采用现代化互动设计，包含图片轮播、悬浮元素、响应式导航和推荐车辆卡片。

#### 核心功能

- **图片轮播效果** - 实现淡入淡出动画效果，提升用户体验
- **悬浮图片设计** - 车辆主图像悬浮在绿色和白色区域交界处，创造时尚视觉效果
- **联动导航菜单** - 随用户滚动页面，导航菜单高亮当前浏览区域
- **醒目价格显示** - 车辆价格使用绿色加粗样式，增强视觉吸引力
- **交互式推荐卡片** - 新设计的车辆推荐卡片，整体可点击，并添加悬停放大动画效果

#### 类型定义

```typescript
interface VehicleSpecs {
  year: string;
  mileage: string;
  energyType: string;
  transmission: string;
  location: string;
}

interface VehicleData {
  name: string;
  price: string;
  image: string;
  description: string;
  specs: VehicleSpecs;
  features: string[];
}

interface VehicleDatabase {
  [key: string]: VehicleData;
}

interface VehicleDetailsProps {}

const VehicleDetails: React.FC<VehicleDetailsProps>
```

#### 路由参数处理

```typescript
// URL参数获取
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();

// 数据获取
const vehicle = id ? vehicleData[id] : undefined;

// 错误处理
if (!vehicle) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          车辆未找到
        </h2>
        <button onClick={() => navigate('/mall')}>
          返回车辆商城
        </button>
      </div>
    </div>
  );
}
```

#### 数据结构

```typescript
// 车辆详情数据示例
const vehicleData: VehicleDatabase = {
  "1": {
    name: "BYD Han EV 2022",
    price: "$19,500",
    image: "/images/byd-han.jpg",
    description: "比亚迪汉EV是一款豪华纯电动轿车...",
    specs: {
      year: "2022",
      mileage: "45,000 km",
      energyType: "Electric",
      transmission: "Automatic",
      location: "Shanghai"
    },
    features: [
      "Advanced safety features",
      "Export documentation ready",
      "Professional inspection completed"
    ]
  }
};
```

#### 功能特性

- 🖼️ 高质量车辆图片
- 📝 详细车辆描述
- 📊 完整技术规格
- ✨ 特色功能列表
- 💰 价格信息展示
- 🔙 返回导航
- 📱 响应式详情布局

---

### AdminPanel 页面

管理后台页面，提供车辆管理功能。

#### 类型定义

```typescript
interface FormData {
  name: string;
  brand: string;
  type: string;
  energyType: string;
  mileage: string;
  price: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface AdminPanelProps {}

const AdminPanel: React.FC<AdminPanelProps>
```

#### 表单状态管理

```typescript
// 表单数据状态
const [formData, setFormData] = useState<FormData>({
  name: '',
  brand: '',
  type: '',
  energyType: '',
  mileage: '',
  price: '',
  location: '',
  description: '',
  imageUrl: ''
});

// 车辆列表状态
const [vehicles, setVehicles] = useState<Vehicle[]>([]);
const [editingId, setEditingId] = useState<number | null>(null);
```

#### 表单处理

```typescript
// 表单提交处理
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (editingId) {
    // 更新现有车辆
    setVehicles(prev => prev.map(vehicle =>
      vehicle.id === editingId
        ? { ...vehicle, ...formData }
        : vehicle
    ));
    setEditingId(null);
  } else {
    // 添加新车辆
    const newVehicle: Vehicle = {
      id: Date.now(),
      ...formData,
      available: true
    };
    setVehicles(prev => [...prev, newVehicle]);
  }
  
  // 重置表单
  setFormData({
    name: '', brand: '', type: '', energyType: '',
    mileage: '', price: '', location: '', description: '', imageUrl: ''
  });
};
```

#### 功能特性

- ➕ 添加新车辆
- ✏️ 编辑现有车辆
- 🗑️ 删除车辆
- 📋 车辆列表管理
- 📝 表单验证
- 💾 数据持久化
- 🔄 实时数据更新

## 样式系统

### Tailwind CSS 类名约定

#### 布局类名

```css
/* 容器 */
.container-default { @apply container mx-auto px-4 py-8; }

/* 网格系统 */
.grid-responsive { @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6; }

/* 弹性布局 */
.flex-center { @apply flex items-center justify-center; }
.flex-between { @apply flex items-center justify-between; }
```

#### 组件样式

```css
/* 按钮样式 */
.btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700; }
.btn-secondary { @apply bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300; }

/* 卡片样式 */
.card-default { @apply bg-white rounded-lg shadow-md p-6; }
.card-hover { @apply hover:shadow-lg transition-shadow duration-300; }

/* 表单样式 */
.form-input { @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500; }
.form-label { @apply block text-sm font-medium text-gray-700 mb-2; }
```

#### 响应式断点

```css
/* 移动端优先 */
.mobile-first {
  /* 默认样式 (mobile) */
  @apply text-sm;
}

/* 平板端 */
@media (min-width: 768px) {
  .mobile-first {
    @apply text-base;
  }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .mobile-first {
    @apply text-lg;
  }
}
```

## 最佳实践

### 组件开发

1. **类型安全**
   ```typescript
   // ✅ 好的做法
   interface Props {
     title: string;
     count: number;
     optional?: boolean;
   }
   
   const Component: React.FC<Props> = ({ title, count, optional = false }) => {
     // 组件实现
   };
   
   // ❌ 避免
   const Component = (props: any) => {
     // 缺乏类型安全
   };
   ```

2. **Props 验证**
   ```typescript
   // ✅ 使用接口定义
   interface VehicleCardProps {
     vehicle: Vehicle;
     onClick?: (vehicle: Vehicle) => void;
   }
   
   // ✅ 提供默认值
   const VehicleCard: React.FC<VehicleCardProps> = ({ 
     vehicle, 
     onClick = () => {} 
   }) => {
     // 组件实现
   };
   ```

3. **事件处理**
   ```typescript
   // ✅ 明确的事件类型
   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault();
     // 处理逻辑
   };
   
   // ✅ 使用 useCallback 优化
   const handleClick = useCallback((e: React.MouseEvent) => {
     // 处理逻辑
   }, [dependency]);
   ```

### 性能优化

1. **组件记忆化**
   ```typescript
   // ✅ 使用 React.memo
   const VehicleCard = React.memo<VehicleCardProps>(({ vehicle, onClick }) => {
     // 组件实现
   });
   
   // ✅ 自定义比较函数
   const VehicleCard = React.memo(Component, (prevProps, nextProps) => {
     return prevProps.vehicle.id === nextProps.vehicle.id;
   });
   ```

2. **状态优化**
   ```typescript
   // ✅ 使用 useMemo 优化计算
   const filteredVehicles = useMemo(() => {
     return vehicles.filter(vehicle => 
       vehicle.brand === selectedBrand
     );
   }, [vehicles, selectedBrand]);
   
   // ✅ 使用 useCallback 优化函数
   const handleFilterChange = useCallback((filterType: string, value: string) => {
     setFilters(prev => ({ ...prev, [filterType]: value }));
   }, []);
   ```

### 错误处理

1. **错误边界**
   ```typescript
   // 错误边界组件（建议添加）
   class ErrorBoundary extends React.Component {
     constructor(props) {
       super(props);
       this.state = { hasError: false };
     }
   
     static getDerivedStateFromError(error) {
       return { hasError: true };
     }
   
     componentDidCatch(error, errorInfo) {
       console.error('Error caught by boundary:', error, errorInfo);
     }
   
     render() {
       if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
       }
       return this.props.children;
     }
   }
   ```

2. **条件渲染**
   ```typescript
   // ✅ 安全的条件渲染
   const VehicleDetails: React.FC = () => {
     const { id } = useParams<{ id: string }>();
     const vehicle = id ? vehicleData[id] : undefined;
   
     if (!vehicle) {
       return <NotFoundComponent />;
     }
   
     return <VehicleDetailsContent vehicle={vehicle} />;
   };
   ```

## 测试指南

### 组件测试

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import VehicleCard from '../VehicleCard';

describe('VehicleCard', () => {
  const mockVehicle: Vehicle = {
    id: 1,
    name: "Test Vehicle",
    brand: "Test Brand",
    price: "$10,000",
    image: "/test.jpg",
    available: true,
    energyType: "Electric",
    vehicleType: "Sedan"
  };

  it('renders vehicle information correctly', () => {
    render(<VehicleCard vehicle={mockVehicle} />);
    
    expect(screen.getByText('Test Vehicle')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = jest.fn();
    render(<VehicleCard vehicle={mockVehicle} onClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('vehicle-card'));
    expect(handleClick).toHaveBeenCalledWith(mockVehicle);
  });
});
```

## 未来改进

### 计划中的组件

1. **Loading 组件**
   - 统一的加载状态显示
   - 骨架屏支持
   - 不同类型的加载动画

2. **Modal 组件**
   - 通用对话框组件
   - 支持不同尺寸
   - 键盘导航支持

3. **Pagination 组件**
   - 分页导航
   - 页面大小选择
   - 跳转功能

4. **SearchBar 组件**
   - 全文搜索功能
   - 搜索建议
   - 历史搜索记录

### 架构改进

1. **组件库化**
   - 独立的组件库包
   - Storybook 文档
   - 组件测试覆盖

2. **主题系统**
   - 可定制的设计主题
   - 深色模式支持
   - 动态主题切换

3. **国际化支持**
   - 多语言组件
   - 文本提取工具
   - RTL 布局支持

通过遵循本文档的指导，您可以更好地理解和使用 CarGo 项目中的各个组件。
