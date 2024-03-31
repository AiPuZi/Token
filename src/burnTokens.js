const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function burnTokens(mint, source, amount, authority) {
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
  await mint.burn(
    source,
    authority,
    [],
    amount
  );
  console.log(`Burned ${amount} tokens from ${source.toString()}`);
}

module.exports = { burnTokens };
