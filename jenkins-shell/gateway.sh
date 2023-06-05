# 网关 - 负责转发到子应用
# 每次新增插件，都要在这里注册代理地址，并启动一次构建

APP=gateway                 # 应用名称
K8S_APP=$APP                      # K8S应用名称
K8S_NAMESPACE=test                # 命名空间(做资源隔离)- 可以用来划分测试/正式环境
K8S_YAML=$APP.yaml                # 生成yaml文件名称
K8S_DIR=/data/k8s                 # 远程服务器存放yaml文件位置
K8S_SERVICE=$K8S_APP-service      # k8s service名称

DOCKER_REGISTRY=registry.demo.com  # docker镜像源地址
DOCKER_TAG=${BUILD_VERSION}
DOCKER_NAME=$DOCKER_REGISTRY/$APP
DOCKER_IMAGE=$DOCKER_NAME:$DOCKER_TAG

# nginx 配置
cat << EOF > default.conf

server {
	  listen 80;
    
    # 前端
    location =/ {
		  proxy_pass http://console-service:80/;
    }
    
    location /console {
		  proxy_pass http://console-service:80/;
	  }

	  location /app {
		  proxy_pass http://app-service:80/;
	  }
      
	  location /gunboss {
		  proxy_pass http://gunboss-service:80/;
	  }
      
	  # 后端
    location /home/api/ {
    	proxy_pass http://home-api-service:80/;
	  }
}
EOF

# Dockerfile
cat << EOF > Dockerfile
FROM nginx
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80
EOF

# 构建docker镜像并推送远程
docker build -t ${DOCKER_IMAGE} .
docker push ${DOCKER_IMAGE}

# k8s的构建文件
cat << EOF > $K8S_YAML

apiVersion: v1
kind: Namespace
metadata:
  name: $K8S_NAMESPACE
  labels:
    name: $K8S_NAMESPACE-v1
---
apiVersion: v1
kind: Service
metadata:
  name: $K8S_SERVICE
  namespace: $K8S_NAMESPACE
  labels:
    app: $K8S_SERVICE
spec:
  type: NodePort      # 类型: NodePort 暴露端口到集群外
  ports:
  - port: 80          # service 端口
    targetPort: 80    # pod 端口
    nodePort: 30001   # 对外暴露的端口
  selector:
    app: $K8S_APP
---
apiVersion: v1
kind: Pod
metadata:
  name: $K8S_APP
  namespace: $K8S_NAMESPACE
  labels:
    app: $K8S_APP
spec:
  containers:
  - name: $K8S_APP
    image: $DOCKER_IMAGE
    ports:
    - containerPort: 80
EOF


# 远程执行 k8s
ssh root@www.demo.com mkdir -p $K8S_DIR   # 远程创建存放yaml文件的目录
scp $K8S_YAML www.demo.com:$K8S_DIR       # 将当前目录的yaml文件复制到远程yaml文件目录
ssh root@www.demo.com kubectl apply -f $K8S_DIR/$K8S_YAML # 远程之星yaml文件

