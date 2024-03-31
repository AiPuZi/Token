const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function burnTokens(connection, payer, account, mint, amount) {
  await mint.burn(
    account,
    payer,
    [],
    amount
  );
}

module.exports = { burnTokens };