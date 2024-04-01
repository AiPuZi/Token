const web3 = require('@solana/web3.js');
const express = require('express');
const bodyParser = require('body-parser');
const { createToken } = require('./createToken');

// 创建连接到Solana主网的连接对象
const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed');

const app = express();
app.use(bodyParser.json());

// 设置一个路由来处理创建代币的请求
app.post('/api/create-token', async (req, res) => {
  try {
    // 从请求体中提取代币信息
    const { tokenName, tokenSymbol, totalSupply, decimals, metadataUri, disableMintAuthority, userPublicKey } = req.body;

    // 根据用户提供的公钥创建 payer 钱包对象
    const payerPublicKey = new web3.PublicKey(userPublicKey);
    // TODO: 需要从前端安全地获取用户的私钥或使用签名交易的方式
    const payer = new web3.Account(); // 此处需要实际的 payer Account 信息

    // 根据 disableMintAuthority 决定 mintAuthorityPublicKey 的值
    const mintAuthorityPublicKey = disableMintAuthority ? null : payerPublicKey;

    // 使用用户公钥作为冻结权限公钥（或根据实际情况选择其他逻辑）
    const freezeAuthorityPublicKey = payerPublicKey;

    // 调用 createToken 函数来创建代币
    const tokenInfo = await createToken(
      connection,
      payer,
      mintAuthorityPublicKey,
      freezeAuthorityPublicKey,
      tokenName,
      tokenSymbol,
      totalSupply,
      decimals,
      metadataUri
    );

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
