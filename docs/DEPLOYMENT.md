# 部署指南

本文档详细说明了如何将 CarGo 项目部署到各种环境中。

## 部署准备

### 环境要求

- **Node.js**: >= 16.0.0
- **npm/yarn**: 推荐使用 yarn
- **Web服务器**: Nginx, Apache 或类似
- **域名**: 可选，用于生产环境

### 构建检查清单

在部署前，请确保：

- [ ] 所有TypeScript错误已修复
- [ ] 代码已通过ESLint检查
- [ ] 所有测试用例通过
- [ ] 生产环境配置已设置
- [ ] 敏感信息已移除或环境化
- [ ] 性能优化已实施

## 本地构建

### 开发环境构建

```bash
# 安装依赖
yarn install

# 启动开发服务器
yarn start

# 应用将在 http://localhost:3000 启动
```

### 生产环境构建

```bash
# 构建生产版本
yarn build

# 构建完成后，静态文件将生成在 build/ 目录
```

### 构建验证

```bash
# 本地预览生产构建
yarn global add serve
serve -s build

# 或使用npx
npx serve -s build
```

## 静态网站部署

### Netlify 部署

1. **通过 Git 集成**
   ```bash
   # 连接 GitHub/GitLab 仓库
   # 设置构建命令: yarn build
   # 设置发布目录: build
   ```

2. **手动部署**
   ```bash
   # 构建项目
   yarn build
   
   # 拖拽 build 文件夹到 Netlify
   ```

3. **Netlify 配置文件**
   创建 `netlify.toml`:
   ```toml
   [build]
     publish = "build"
     command = "yarn build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Vercel 部署

1. **通过 CLI**
   ```bash
   # 安装 Vercel CLI
   npm i -g vercel
   
   # 部署
   vercel
   
   # 生产部署
   vercel --prod
   ```

2. **vercel.json 配置**
   ```json
   {
     "buildCommand": "yarn build",
     "outputDirectory": "build",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

### GitHub Pages 部署

1. **安装 gh-pages**
   ```bash
   yarn add --dev gh-pages
   ```

2. **package.json 配置**
   ```json
   {
     "homepage": "https://username.github.io/repository-name",
     "scripts": {
       "predeploy": "yarn build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **部署命令**
   ```bash
   yarn deploy
   ```

## 服务器部署

### Apache 配置

1. **虚拟主机配置**
   ```apache
   <VirtualHost *:80>
       ServerName your-domain.com
       DocumentRoot /var/www/html/cargo
       
       <Directory "/var/www/html/cargo">
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       # React Router 支持
       FallbackResource /index.html
       
       ErrorLog ${APACHE_LOG_DIR}/cargo_error.log
       CustomLog ${APACHE_LOG_DIR}/cargo_access.log combined
   </VirtualHost>
   ```

2. **.htaccess 文件**
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QSA,L]
   ```

### Nginx 配置

1. **服务器配置**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html/cargo;
       index index.html;

       # Gzip 压缩
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

       # 静态资源缓存
       location /static/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # React Router 支持
       location / {
           try_files $uri $uri/ /index.html;
       }

       # API 代理（如果需要）
       location /api/ {
           proxy_pass http://backend:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

2. **HTTPS 配置（Let's Encrypt）**
   ```bash
   # 安装 Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # 获取SSL证书
   sudo certbot --nginx -d your-domain.com
   
   # 自动续期
   sudo crontab -e
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

## Docker 部署

### Dockerfile

```dockerfile
# 多阶段构建
FROM node:16-alpine as builder

WORKDIR /app

# 复制依赖文件
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile

# 复制源码
COPY . .

# 构建应用
RUN yarn build

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/build /usr/share/nginx/html

# 复制Nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  cargo-frontend:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    volumes:
      - ./logs:/var/log/nginx

  # 如果有后端服务
  cargo-backend:
    image: cargo-backend:latest
    ports:
      - "3001:3001"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/cargo
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=cargo
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 部署命令

```bash
# 构建镜像
docker build -t cargo-frontend .

# 运行容器
docker run -d -p 80:80 --name cargo-app cargo-frontend

# 使用 Docker Compose
docker-compose up -d
```

## 云平台部署

### AWS S3 + CloudFront

1. **S3 静态网站配置**
   ```bash
   # 创建 S3 存储桶
   aws s3 mb s3://cargo-frontend
   
   # 上传构建文件
   aws s3 sync build/ s3://cargo-frontend
   
   # 设置存储桶策略
   aws s3api put-bucket-policy --bucket cargo-frontend --policy file://bucket-policy.json
   ```

2. **存储桶策略**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::cargo-frontend/*"
       }
     ]
   }
   ```

3. **CloudFront 配置**
   - 原站：S3 存储桶
   - 默认根对象：index.html
   - 错误页面：404 -> /index.html (200)

### Google Cloud Platform

```bash
# 启用必要的API
gcloud services enable compute.googleapis.com

# 创建存储桶
gsutil mb gs://cargo-frontend

# 上传构建文件
gsutil -m rsync -r -d build/ gs://cargo-frontend

# 设置存储桶为静态网站
gsutil web set -m index.html -e index.html gs://cargo-frontend
```

### Azure Static Web Apps

```bash
# 安装 Azure CLI
npm install -g @azure/static-web-apps-cli

# 部署
swa deploy build/
```

## 环境变量配置

### 开发环境 (.env.development)

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

### 生产环境 (.env.production)

```env
REACT_APP_API_URL=https://api.cargo-platform.com
REACT_APP_ENV=production
REACT_APP_DEBUG=false
REACT_APP_ANALYTICS_ID=GA_TRACKING_ID
```

### 环境变量使用

```typescript
// 在代码中使用
const apiUrl = process.env.REACT_APP_API_URL;
const isProduction = process.env.REACT_APP_ENV === 'production';
```

## 性能优化

### 构建优化

1. **代码分割**
   ```typescript
   // 路由级代码分割
   const Home = lazy(() => import('./pages/Home'));
   const Mall = lazy(() => import('./pages/Mall'));
   
   // 使用 Suspense
   <Suspense fallback={<div>Loading...</div>}>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/mall" element={<Mall />} />
     </Routes>
   </Suspense>
   ```

2. **资源优化**
   ```json
   // package.json 构建优化
   {
     "scripts": {
       "build": "react-scripts build && yarn optimize",
       "optimize": "yarn analyze && yarn compress"
     }
   }
   ```

### 缓存策略

1. **HTTP 缓存**
   ```nginx
   # Nginx 缓存配置
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   
   location ~* \.(html)$ {
       expires -1;
       add_header Cache-Control "no-cache, no-store, must-revalidate";
   }
   ```

2. **Service Worker**
   ```typescript
   // 注册 Service Worker
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

## 监控和日志

### 错误监控

```typescript
// 集成 Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENV,
});
```

### 性能监控

```typescript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 访问分析

```typescript
// Google Analytics
import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.REACT_APP_GA_ID);
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
```

## 安全考虑

### 内容安全策略 (CSP)

```html
<!-- 在 index.html 中添加 -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:;">
```

### HTTPS 强制重定向

```javascript
// 在 index.html 中添加
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}
```

## 故障排除

### 常见问题

1. **路由404错误**
   - 检查服务器配置是否支持SPA路由
   - 确保 fallback 到 index.html

2. **环境变量未生效**
   - 确保变量名以 `REACT_APP_` 开头
   - 重启开发服务器

3. **构建失败**
   - 检查 TypeScript 错误
   - 确保所有依赖已安装

4. **样式问题**
   - 检查 Tailwind CSS 配置
   - 确保 CSS 文件正确导入

### 调试命令

```bash
# 检查构建输出
yarn build --verbose

# 分析包大小
yarn analyze

# 检查类型错误
yarn type-check

# 运行测试
yarn test
```

## 回滚策略

### 版本回滚

```bash
# Git 回滚
git revert <commit-hash>
git push origin main

# Docker 回滚
docker tag cargo-frontend:latest cargo-frontend:backup
docker tag cargo-frontend:previous cargo-frontend:latest
docker-compose up -d
```

### 蓝绿部署

```bash
# 准备新版本
docker-compose -f docker-compose.blue.yml up -d

# 测试新版本
curl -H "Host: cargo-platform.com" http://blue-environment

# 切换流量
# 更新负载均衡器配置

# 停止旧版本
docker-compose -f docker-compose.green.yml down
```

## 自动化部署

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'yarn'
    
    - name: Install dependencies
      run: yarn install --frozen-lockfile
    
    - name: Build
      run: yarn build
    
    - name: Deploy to S3
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      run: aws s3 sync build/ s3://cargo-frontend --delete
    
    - name: Invalidate CloudFront
      run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_ID }} --paths "/*"
```

## 维护建议

1. **定期更新依赖**
   ```bash
   yarn outdated
   yarn upgrade-interactive
   ```

2. **监控性能指标**
   - 页面加载时间
   - 资源大小
   - 错误率

3. **备份策略**
   - 定期备份数据库
   - 保存关键配置文件
   - 维护部署文档

4. **安全更新**
   - 及时更新依赖
   - 定期安全扫描
   - 监控漏洞报告

通过遵循本部署指南，您可以确保 CarGo 项目在各种环境中稳定运行。
