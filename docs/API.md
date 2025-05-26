# API 接口文档

## 概述

本文档描述了 CarGo 平台的前端数据结构和接口规范。当前版本使用模拟数据，未来将连接真实的后端API。

## 数据模型

### Vehicle (车辆)

```typescript
interface Vehicle {
  id: number;                // 车辆唯一标识符
  name: string;             // 车辆名称
  brand: string;            // 品牌
  price: string;            // 价格
  image: string;            // 图片URL
  available: boolean;       // 是否可用
  energyType: string;       // 能源类型 (Electric/Gasoline/Hybrid)
  vehicleType: string;      // 车辆类型 (Sedan/SUV/Truck)
  mileage?: string;         // 里程数
  location?: string;        // 所在地
  description?: string;     // 描述
}
```

### VehicleSpecs (车辆规格)

```typescript
interface VehicleSpecs {
  year: string;             // 年份
  mileage: string;          // 里程数
  energyType: string;       // 能源类型
  transmission: string;     // 变速箱类型
  location: string;         // 所在地
}
```

### VehicleData (详细车辆数据)

```typescript
interface VehicleData {
  name: string;             // 车辆名称
  price: string;            // 价格
  image: string;            // 主图片URL
  description: string;      // 详细描述
  specs: VehicleSpecs;      // 规格参数
  features: string[];       // 特色功能列表
}
```

## 筛选参数

### Filters (筛选条件)

```typescript
interface Filters {
  energyType: string;       // 能源类型筛选
  vehicleType: string;      // 车辆类型筛选
  brand: string;            // 品牌筛选
}
```

## 表单数据

### FormData (管理后台表单)

```typescript
interface FormData {
  name: string;             // 车辆名称
  brand: string;            // 品牌
  type: string;             // 类型
  energyType: string;       // 能源类型
  mileage: string;          // 里程数
  price: string;            // 价格
  location: string;         // 所在地
  description: string;      // 描述
  imageUrl: string;         // 图片URL
}
```

## 模拟数据源

### 车辆列表数据
位置：`src/pages/Mall.tsx`

```typescript
const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "BYD Han EV",
    brand: "BYD",
    price: "$19,500",
    image: "...",
    available: true,
    energyType: "Electric",
    vehicleType: "Sedan"
  },
  // ... 更多车辆数据
];
```

### 详细车辆数据
位置：`src/pages/VehicleDetails.tsx`

```typescript
const vehicleData: VehicleDatabase = {
  "1": {
    name: "BYD Han EV 2022",
    price: "$19,500",
    image: "...",
    description: "...",
    specs: {
      year: "2022",
      mileage: "45,000 km",
      energyType: "Electric",
      transmission: "Automatic",
      location: "Shanghai"
    },
    features: [
      "Advanced safety features",
      "Export documentation ready"
    ]
  }
};
```

## 筛选选项

### 能源类型选项
- `Electric` - 纯电动
- `Gasoline` - 汽油
- `Hybrid` - 混合动力

### 车辆类型选项
- `Sedan` - 轿车
- `SUV` - 运动型多用途车
- `Truck` - 货车
- `Hatchback` - 掀背车

### 品牌选项
- `BYD` - 比亚迪
- `Great Wall` - 长城汽车
- `Geely` - 吉利汽车
- `NIO` - 蔚来
- `Li Auto` - 理想汽车

## 状态管理

### 车辆状态
- `Available` - 可售
- `Sold` - 已售出
- `Pending` - 待审核

## 事件处理

### 筛选事件
```typescript
const handleFilterChange = (filterType: keyof Filters, value: string) => {
  setFilters(prev => ({
    ...prev,
    [filterType]: value
  }));
};
```

### 表单提交事件
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const newVehicle: Vehicle = {
    id: Date.now(),
    ...formData,
    status: "Available"
  };
  setVehicles(prev => [...prev, newVehicle]);
};
```

## 路由参数

### 车辆详情路由
- 路径：`/vehicle/:id`
- 参数：`id` (string) - 车辆ID

```typescript
const { id } = useParams<{ id: string }>();
const vehicle = id ? vehicleData[id] : undefined;
```

## 未来API规划

### RESTful API 端点

```
GET    /api/vehicles           # 获取车辆列表
GET    /api/vehicles/:id       # 获取车辆详情
POST   /api/vehicles           # 创建新车辆
PUT    /api/vehicles/:id       # 更新车辆信息
DELETE /api/vehicles/:id       # 删除车辆

GET    /api/vehicles/search    # 搜索车辆
GET    /api/brands             # 获取品牌列表
GET    /api/categories         # 获取车辆类型
```

### 请求/响应格式

#### 获取车辆列表
```typescript
// 请求
GET /api/vehicles?energyType=Electric&brand=BYD&page=1&limit=10

// 响应
{
  "success": true,
  "data": {
    "vehicles": Vehicle[],
    "total": number,
    "page": number,
    "limit": number
  }
}
```

#### 错误响应
```typescript
{
  "success": false,
  "error": {
    "code": "VEHICLE_NOT_FOUND",
    "message": "Vehicle not found"
  }
}
```

## 开发注意事项

1. **类型安全**：所有API调用都应该有完整的TypeScript类型定义
2. **错误处理**：实现统一的错误处理机制
3. **加载状态**：为异步操作添加loading状态
4. **缓存策略**：考虑实现适当的数据缓存
5. **分页处理**：大数据量时实现分页加载

## 测试数据

项目中包含的测试数据涵盖了各种场景：
- 不同品牌的车辆
- 不同能源类型的车辆
- 可售和已售车辆
- 完整的车辆规格信息
- 多样化的价格范围

这些数据为前端开发和测试提供了充分的支持。
