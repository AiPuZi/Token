const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function createToken(connection, payer, mintAuthorityPubkey, freezeAuthorityPubkey, decimals) {
  // 创建Token Mint
  const mint = await splToken.createMint(
    connection,
    payer,
    mintAuthorityPubkey,
    freezeAuthorityPubkey,
    decimals
  );

  // 创建Token Account
  const tokenAccount = await splToken.createAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  // 返回创建的Token Mint和Token Account信息
  return {
    mint,
    tokenAccount
  };
}

module.exports = { createToken };