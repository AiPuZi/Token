const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function revokeDelegate(connection, owner, account) {
  await account.revoke(
    owner,
    [],
  );
}

module.exports = { revokeDelegate };