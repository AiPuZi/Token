const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, SystemProgram } = require('@solana/web3.js');
const { MintLayout, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint } = require('@solana/spl-token');

// 读取配置文件
const config = require('./config.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 从 "web" 目录提供静态文件
app.use(express.static(path.join(__dirname, 'web')));

app.post('/api/create-token', async (req, res) => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const payer = Keypair.generate(); // 这里应该是一个安全存储的密钥对

    try {
        // 获取创建代币铸币厂所需的最小余额
        const rentExemptBalance = await getMinimumBalanceForRentExemptMint(connection);

        // 创建新的代币铸币厂账户的密钥对
        const mintKeypair = Keypair.generate();

        // 创建并发送创建代币铸币厂的交易
        const createMintAccountTransaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MintLayout.span,
                lamports: rentExemptBalance,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMintInstruction(
                mintKeypair.publicKey, // mint public key
                req.body.decimals, // decimals
                payer.publicKey, // mint authority
                null, // freeze authority (optional)
                TOKEN_PROGRAM_ID // token program id
            )
        );

        // 签名并发送交易
        const signature = await connection.sendTransaction(createMintAccountTransaction, [payer, mintKeypair]);

        // 确认交易
        await connection.confirmTransaction(signature, 'confirmed');

        // 返回新创建的代币铸币厂的公钥
        res.json({ mint: mintKeypair.publicKey.toBase58() });
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).send('Failed to create token');
    }
});

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
