const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function approveDelegate(connection, owner, account, delegate, amount) {
  await account.approve(
    delegate,
    owner,
    [],
    amount
  );
}

module.exports = { approveDelegate };