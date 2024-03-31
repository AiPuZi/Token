const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function createTokenAccount(mint, owner) {
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
  const tokenAccount = await mint.createAccount(owner);
  console.log(`Token account created: ${tokenAccount.toBase58()}`);
  return tokenAccount;
}

module.exports = { createTokenAccount };
