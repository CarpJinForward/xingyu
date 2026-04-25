# 星语 AstroWhisper · 部署指南

## 环境要求

- Node.js >= 18
- npm
- PM2（全局安装：`npm install -g pm2`）
- Nginx（可选，用于域名和 SSL）

---

## 部署步骤

### 1. 上传代码到服务器

```bash
# 方式一：git clone
git clone 你的仓库地址
cd my-app

# 方式二：scp 直接上传
scp -r my-app root@你的服务器IP:/opt/
```

### 2. 配置环境变量

```bash
cp .env.example .env    # 如果还没有 .env
# 编辑 .env，填入你的 DeepSeek API Key
vim .env
```

`.env` 文件内容：
```
DEEPSEEK_API_KEY=sk-xxxxx
DEEPSEEK_MODEL=deepseek-chat
```

### 3. 一键部署

```bash
bash deploy.sh
```

### 4. 配置 Nginx（可选，但有域名推荐做）

```bash
cp nginx.conf /etc/nginx/conf.d/xingyu.conf
# 编辑配置文件，把 server_name 改成你的域名
vim /etc/nginx/conf.d/xingyu.conf
nginx -t && systemctl reload nginx
```

### 5. 申请 SSL（如果有域名）

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d 你的域名.com
```

---

## 访问

- 有域名 + Nginx：`https://你的域名.com`
- 无域名直接 IP：`http://你的服务器IP:3001`

---

## 维护命令

```bash
pm2 status                 # 查看进程状态
pm2 logs xingyu            # 查看实时日志
pm2 restart xingyu         # 重启服务
pm2 stop xingyu            # 停止服务
pm2 startup                # 设置开机自启（首次需要执行）
```

## 更新代码

```bash
git pull                    # 拉取最新代码
bash deploy.sh              # 重新构建 + 重启
```
