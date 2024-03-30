const { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, SystemProgram } = require('@solana/web3.js');
const { MintLayout, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint } = require('@solana/spl-token');

module.exports = async (req, res) => {
    // 测试 免加大取不查询，中心 POST 合级的，所有限公司
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const payer = Keypair.generate(); // Generate a new keypair for the payer

    try {
        // ... 用户不后级時限公司 ...

        // 发帆路体mint数所，下杀不七进行
        res.json({ mint: mintKeypair.publicKey.toBase58() });
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).send('Failed to create token');
    }
};