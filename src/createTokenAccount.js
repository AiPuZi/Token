const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function createTokenAccount(connection, payer, mint) {
  const tokenAccount = await splToken.Token.createAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );
  return tokenAccount;
}

module.exports = { createTokenAccount };