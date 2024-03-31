const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');
const { MintLayout, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint } = require('@solana/spl-token');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "web" directory
app.use(express.static('web'));

app.post('/api/create-token', async (req, res) => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const payer = Keypair.generate(); // Generate a new keypair for the payer

    try {
        // Determine the minimum balance needed to exempt the account from rent
        const minimumBalanceForRentExemptMint = await getMinimumBalanceForRentExemptMint(connection);

        // Create a new mint account
        const mintAccount = Keypair.generate();
        const mintPublicKey = mintAccount.publicKey;
        const tokenTransaction = new Transaction();

        // Add an instruction to create the new mint account
        tokenTransaction.add(
            SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: mintPublicKey,
                lamports: minimumBalanceForRentExemptMint,
                space: MintLayout.span,
                programId: TOKEN_PROGRAM_ID,
            })
        );

        // Add an instruction to initialize the mint
        tokenTransaction.add(
            createInitializeMintInstruction(
                mintPublicKey, // mint pubkey
                9, // decimals
                payer.publicKey, // mint authority
                null, // freeze authority (if not applicable)
                TOKEN_PROGRAM_ID // token program id
            )
        );

        // Sign and send the transaction
        const transactionId = await sendAndConfirmTransaction(
            connection,
            tokenTransaction,
            [payer, mintAccount], // Signers
            { commitment: 'confirmed' }
        );

        // Respond with the transaction ID
        res.status(200).json({ success: true, message: 'Token created successfully.', transactionId });
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).json({ success: false, message: 'Failed to create token.', error: error.message, stack: error.stack });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
