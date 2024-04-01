const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function disableMintAuthority(connection, payer, mint) {
  const transactionSignature = await splToken.disableMintAuthority(
    connection,
    payer,
    mint,
    payer.publicKey // Mint authority, typically the payer
  );

  console.log(`Disable Mint Authority Transaction: ${transactionSignature}`);
}

// 示例使用
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
// 确保以下参数是正确的：payer, mint
// disableMintAuthority(connection, payer, mint);
