const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function createTokenAccount(connection, payer, mintPublicKey, ownerPublicKey) {
  // Create a new token account for the owner
  const tokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintPublicKey,
    ownerPublicKey
  );

  console.log(`Token account created: ${tokenAccount.address.toBase58()}`);
  return tokenAccount;
}

module.exports = { createTokenAccount };
