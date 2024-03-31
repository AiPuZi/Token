const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function createToken(connection, payer, mintAuthorityPublicKey, freezeAuthorityPublicKey, tokenName, tokenSymbol, totalSupply, decimals, metadataUri) {
  // Create a new mint
  const mint = await splToken.Token.createMint(
    connection,
    payer,
    mintAuthorityPublicKey,
    freezeAuthorityPublicKey,
    decimals,
    splToken.TOKEN_PROGRAM_ID
  );

  // Create the associated token account for the payer
  const tokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    payer.publicKey
  );

  // Minting the initial supply to the payer's token account
  await mint.mintTo(
    tokenAccount.address,
    payer,
    [],
    totalSupply
  );

  // Set the token account's metadata using the Metadata program (if required)
  // TODO: Add logic to set metadata using the Metaplex token metadata standard

  // Disable further minting if the mint authority is null
  if (mintAuthorityPublicKey === null) {
    await mint.setAuthority(
      mint.publicKey,
      null,
      'MintTokens',
      payer,
      []
    );
  }

  return {
    tokenName,
    tokenSymbol,
    mint: mint.publicKey.toString(),
    tokenAccount: tokenAccount.address.toString(),
    metadataUri
  };
}

module.exports = { createToken };