const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function mintTokens(connection, payer, mint, destination, amount) {
  await mint.mintTo(
    destination,
    payer,
    [],
    amount
  );
}

module.exports = { mintTokens };