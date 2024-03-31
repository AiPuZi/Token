// server.js
// 这是主服务器文件，用于处理HTTP请求。
const express = require('express');
const app = express();

// TODO: 引入和使用创建代币相关的脚本

app.listen(3000, () => {
  console.log('服务器运行在3000端口上。');
});