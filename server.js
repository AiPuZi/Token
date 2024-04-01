const web3 = require('@solana/web3.js');
const express = require('express');
const bodyParser = require('body-parser');
const { createToken } = require('./createToken');

// 创建连接到Solana主网的连接对象
const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

const app = express();
app.use(bodyParser.json());

app.post('/api/create-token', async (req, res) => {
  try {
    // 从请求体中提取代币信息和用户钱包公钥
    const { tokenName, tokenSymbol, totalSupply, decimals, metadataUri, disableMintAuthority, userPublicKey } = req.body;

    // 根据用户提供的公钥创建 payer 钱包对象
    const payerPublicKey = new web3.PublicKey(userPublicKey);
    const payer = new web3.Account(); // 这里需要用户的私钥来创建 Account 对象

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

app.listen(3000, () => {
  console.log('服务器运行在3000端口上。');
});
