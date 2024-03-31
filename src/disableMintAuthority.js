const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function disableMintAuthority(connection, payer, mint) {
  await mint.setAuthority(
    mint.publicKey,
    null,
    'MintTokens',
    payer,
    []
  );
}

module.exports = { disableMintAuthority };