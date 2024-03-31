const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function mintTokens(mint, destination, amount, authority) {
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
  await mint.mintTo(
    destination,
    authority,
    [],
    amount
  );
  console.log(`Minted ${amount} tokens to ${destination.toString()}`);
}

module.exports = { mintTokens };