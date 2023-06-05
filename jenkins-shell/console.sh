# 安装依赖
pnpm install
# 打包
pnpm build
# 进入打包产物目录
cd dist

APP=console                       # 应用名称
K8S_APP=$APP                      # K8S应用名称
K8S_NAMESPACE=test                # 命名空间(做资源隔离)- 可以用来划分测试/正式环境
K8S_YAML=$K8S_APP.yaml            # 生成yaml文件名称
K8S_DIR=/data/k8s                 # 远程服务器存放yaml文件位置
K8S_SERVICE=$K8S_APP-service      # k8s service名称

DOCKER_REGISTRY=registry.demo.com  # docker镜像源地址
DOCKER_TAG=${BUILD_VERSION}
DOCKER_NAME=$DOCKER_REGISTRY/$APP
DOCKER_IMAGE=$DOCKER_NAME:$DOCKER_TAG

# nginx配置文件
cat << EOF > nginx.conf
server {
    listen       80;
    
    location / {
    	add_header Cache-Control "no-cache, no-store";
    	root /usr/share/nginx/html;
      index  index.html;
      try_files \$uri \$uri/ /index.html;
    }
}

EOF

# Dockerfile
cat << EOF > Dockerfile

FROM nginx
WORKDIR /usr/share/nginx/html
COPY . .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

EOF

## 打包docker镜像并推送到远程
docker build -t ${DOCKER_IMAGE} .
docker push ${DOCKER_IMAGE}

# k8s构建文件
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
  ports:
  - port: 80
    targetPort: 80
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
