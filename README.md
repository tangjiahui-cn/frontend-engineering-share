# 企业级 QianKun 微前端架构实战（从开发到部署全流程）

## 项目简介

实现了从开发到部署的微前端项目。

（注：使用 docker 消除各个部署环境之间的差异，利用 k8s 内建的 dns 域名解析实现无限个数子应用访问，k8s 可暴露端口只有几千个）

## 技术要求

- 前端：React18、Vue2/3、QianKun、TypeScript、webpack、React-router
- 后端：nestjs、mysql
- 运维：了解 linux、k8s、docker 容器化技术、jenkins 自动化部署

## 上线流程

新项目从拉取、开发、到上线的步骤。

- 前端脚手架拉取项目模板
- 开发
- 提交代码
- 部署项目 1 - gunboss 注册子应用
- 部署项目 2 - jenkins 配置 CI/CD
- 访问页面
- （前端埋点、错误监控、数据流量统计）

## 安装教程

### 环境配置

- [1. 简介](./环境配置/1.简介.md)
- [2. 修改 hosts](./环境配置/2.修改%20hosts.md)
- [3. 安装 docker](./环境配置/3.安装%20docker.md)
- [4. 安装 mysql（使用 docker）](./环境配置/4.安装%20mysql（使用%20docker）.md)
- [5. 安装 gitlab（使用 docker）](./环境配置/5.安装%20gitlab（使用%20docker）.md)
- [6. 安装 jenkins（使用 docker）](./环境配置/6.安装%20jenkins（使用docker）.md)
- [7. 搭建 docker 镜像源（http）](./环境配置/7.搭建%20docker镜像源（http）.md)
- [8. 安装 k8s 和 minikube](./环境配置/8.安装%20k8s%20和%20minikube.md)
- [9. 配置 nginx 转发](./环境配置/9.配置%20nginx转发.md)

### 搭建教程

- [1. 前言](./搭建教程/1.前言.md)
- [2. gitlab 代码](./搭建教程/2.gitlab代码.md)
- [3. jenkins 基础配置](./搭建教程/3.jenkins基础配置.md)
- [4. jenkins 流水线配置](./搭建教程/4.jenkins流水线配置.md)
- [5. gunboss 站点配置插件和菜单](./搭建教程/5.gunboss站点配置插件和菜单.md)
- [6. 完成](./搭建教程/6.完成.md)

## 技术分享

- [掘金：我把上市公司的微前端部署发布流程实现了？记一次组内技术分享 （附代码）](https://juejin.cn/post/7492371892386332726)
