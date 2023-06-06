# 企业级 QianKun 微前端架构实战（从开发到部署全流程）

## 项目简介
实现了从开发到部署的微前端项目。

（注：使用docker消除各个部署环境之间的差异，利用k8s内建的dns域名解析实现无限个数子应用访问，k8s可暴露端口只有几千个）
## 技术要求
- 前端：React18、Vue2/3、QianKun、TypeScript、webpack、React-router
- 后端：nestjs、mysql
- 运维：了解linux、k8s、docker容器化技术、jenkins自动化部署

## 流程
- 前端脚手架拉取项目模板
- 开发
- 提交代码
- 部署项目1 - gunboss注册子应用
- 部署项目2 - jenkins配置CI/CD
- 访问页面
- （前端埋点、错误监控、数据流量统计）
  
## 安装教程
- [环境配置](./%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/)
- [安装教程](./%E6%90%AD%E5%BB%BA%E6%95%99%E7%A8%8B/)