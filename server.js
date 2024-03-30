const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');
const { MintLayout, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint } = require('@solana/spl-token');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "web" directory
app.use(express.static(path.join(__dirname, 'web')));

app.post('/api/create-token', async (req, res) => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const payer = Keypair.generate(); // Generate a new keypair for the payer

    try {
        // ... omitted code for brevity ...

        // After the token is created successfully
        // Respond with the transaction ID
        const transactionId = 'simulated-transaction-id';
        res.status(200).json({ success: true, message: 'Token created successfully.', transactionId });
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).json({ success: false, message: 'Failed to create token.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});