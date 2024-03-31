const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function transferTokens(mint, source, destination, amount, owner, payer) {
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
  await splToken.Token.transfer(
    connection,
    payer,
    source,
    destination,
    owner,
    [],
    amount
  );
  console.log(`Transferred ${amount} tokens from ${source.toString()} to ${destination.toString()}`);
}

module.exports = { transferTokens };