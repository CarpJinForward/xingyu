module.exports = {
  apps: [{
    name: "xingyu",
    script: "server.js",
    env: {
      NODE_ENV: "production",
      PORT: 3001,
    },
    // 自动重启
    watch: false,
    max_memory_restart: "500M",
    // 日志
    error_file: "./logs/err.log",
    out_file: "./logs/out.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    // 宕机自动重启
    autorestart: true,
    max_restarts: 10,
    restart_delay: 3000,
  }]
};
