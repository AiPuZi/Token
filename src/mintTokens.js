const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function mintTokens(connection, payer, mintPublicKey, destinationPublicKey, amount) {
  await splToken.mintTo(
    connection,
    payer, // The payer who pays for the transaction fee and is the minting authority
    mintPublicKey, // The public key of the mint
    destinationPublicKey, // The public key of the destination account
    [], // Multisignature signers if required
    amount // The amount to mint
  );
  console.log(`Minted ${amount} tokens to ${destinationPublicKey.toString()}`);
}

module.exports = { mintTokens };
