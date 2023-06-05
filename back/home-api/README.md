# 插件服务 
## 简介：
基于 `@nestjs` 框架开发，使用`typeorm`来连接mysql数据库。（用来提供菜单和子应用的CRUD）

## 运行
安装
```shell
pnpm install
```
运行
```shell
pnpm start:dev
```
打包
```shell
pnpm build
```

## 测试
测试地址：
- http://localhost:3000/apps （查询插件列表）
- http://localhost:3000/menuItem/get （查询菜单列表）