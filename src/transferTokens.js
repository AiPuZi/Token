const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function transferTokens(connection, sender, senderTokenAccount, recipientTokenAccount, amount, mint, senderAuthority) {
  const transaction = new web3.Transaction().add(
    splToken.createTransferInstruction(
      senderTokenAccount,
      recipientTokenAccount,
      senderAuthority.publicKey,
      amount,
      [],
      splToken.TOKEN_PROGRAM_ID
    )
  );
  await web3.sendAndConfirmTransaction(connection, transaction, [senderAuthority]);
  console.log(`Transferred ${amount} tokens from ${senderTokenAccount.toString()} to ${recipientTokenAccount.toString()}`);
}

module.exports = { transferTokens };
