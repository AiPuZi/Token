const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function revokeDelegate(connection, payer, accountPublicKey, ownerPublicKey) {
  const transactionSignature = await splToken.revoke(
    connection,
    accountPublicKey, // The public key of the token account
    ownerPublicKey,   // The public key of the owner of the token account
    payer            // The signing information of the owner or delegate authority
  );

  console.log(`Revoke Delegate Transaction: ${transactionSignature}`);
}

// 示例使用
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
// 确保以下参数是正确的：payer, accountPublicKey, ownerPublicKey
// revokeDelegate(connection, payer, accountPublicKey, ownerPublicKey);
