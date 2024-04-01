const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function approveDelegate(connection, payer, account, delegate, owner, amount) {
  const transactionSignature = await splToken.approve(
    connection,
    payer,
    account,
    delegate,
    owner,
    amount
  );

  console.log(`Approve Delegate Transaction: ${transactionSignature}`);
}

// 示例使用
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
// 确保以下参数是正确的：payer, account, delegate, owner, amount
// approveDelegate(connection, payer, account, delegate, owner, amount);
