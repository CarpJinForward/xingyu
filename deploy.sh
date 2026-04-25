#!/bin/bash
# 星语 AstroWhisper 部署脚本
# 用法: bash deploy.sh

set -e

echo "=== 1. 安装依赖 ==="
npm install --production

echo "=== 2. 构建前端 ==="
npm run build

echo "=== 3. 创建日志目录 ==="
mkdir -p logs

echo "=== 4. 启动/重启服务 ==="
pm2 start ecosystem.config.js --update-env || pm2 restart ecosystem.config.js --update-env

echo "=== 5. 保存 PM2 进程列表（开机自启） ==="
pm2 save

echo "✅ 部署完成"
echo "   查看状态: pm2 status"
echo "   查看日志: pm2 logs xingyu"