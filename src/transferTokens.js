const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function transferTokens(connection, owner, source, destination, amount) {
  await splToken.Token.transfer(
    connection,
    owner,
    source,
    destination,
    owner,
    [],
    amount
  );
}

module.exports = { transferTokens };