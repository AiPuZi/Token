const web3 = require('@solana/web3.js');

// 创建连接到Solana主网的连接对象
const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

// server.js
// 这是主服务器文件，用于处理HTTP请求。
const express = require('express');
const bodyParser = require('body-parser');
const { createToken } = require('./createToken'); // 假设您有一个名为 createToken.js 的脚本

const app = express();

// 使用 body-parser 中间件来解析 JSON 格式的请求体
app.use(bodyParser.json());

// 设置一个路由来处理创建代币的请求
app.post('/api/create-token', async (req, res) => {
  try {
    // 从请求体中提取代币信息
    const { tokenName, tokenSymbol, totalSupply, decimals, metadataUri, disableMintAuthority } = req.body;

    // 调用 createToken 函数来创建代币
    // 注意：您需要传递正确的参数，这里只是一个示例
    const tokenInfo = await createToken(/* 此处传入必要的参数 */);

    // 发送成功响应，包含代币信息
    res.status(200).json({
      message: 'Token created successfully',
      tokenInfo
    });
  } catch (error) {
    // 发送错误响应
    res.status(500).json({ message: 'Error creating token', error: error.message });
  }
});

// 服务器开始监听3000端口
app.listen(3000, () => {
  console.log('服务器运行在3000端口上。');
});
