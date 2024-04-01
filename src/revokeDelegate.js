const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function revokeDelegate(connection, payer, account, owner) {
  const transactionSignature = await splToken.revoke(
    connection,
    payer,
    account,
    owner
  );

  console.log(`Revoke Delegate Transaction: ${transactionSignature}`);
}

// 示例使用
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
// 确保以下参数是正确的：payer, account, owner
// revokeDelegate(connection, payer, account, owner);
