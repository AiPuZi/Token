const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

async function transferTokens(connection, sender, senderTokenAccount, recipientTokenAccount, amount, mint, senderAuthority) {
  const transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      senderTokenAccount,
      recipientTokenAccount,
      senderAuthority,
      [],
      amount
    )
  );
  await web3.sendAndConfirmTransaction(connection, transaction, [sender]);
  console.log(`Transferred ${amount} tokens from ${senderTokenAccount.toString()} to ${recipientTokenAccount.toString()}`);
}

module.exports = { transferTokens };