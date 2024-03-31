document.addEventListener('DOMContentLoaded', function() {
    const tokenForm = document.getElementById('tokenForm');
    const connectWalletButton = document.getElementById('connectWallet'); // 

    tokenForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // 
        const tokenName = document.getElementById('tokenName').value;
        const tokenSymbol = document.getElementById('tokenSymbol').value;
        const totalSupply = document.getElementById('totalSupply').value;
        const decimals = document.getElementById('decimals').value;
        const metadataUri = document.getElementById('metadataUri').value;
        const disableMintAuthority = document.getElementById('disableMintAuthority').checked;

        // 
        const requestBody = {
            tokenName,
            tokenSymbol,
            totalSupply,
            decimals,
            metadataUri,
            disableMintAuthority
        };

        // 
        try {
            const response = await fetch('https://token-snowy.vercel.app/api/create-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Token created successfully. Transaction ID: ' + result.transactionId);
            } else {
                throw new Error('Failed to create token.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // 
    const isPhantomInstalled = () => {
        return window.solana && window.solana.isPhantom;
    };

    // 
    const connectWallet = async () => {
        if (isPhantomInstalled()) {
            try {
                const response = await window.solana.connect();
                updateConnectWalletButton(response.publicKey.toString());
                connectWalletButton.removeEventListener('click', connectWallet);
                connectWalletButton.addEventListener('click', disconnectWallet);
            } catch (error) {
                console.error('Wallet connection denied:', error.message);
            }
        } else {
            alert('Phantom Wallet not found! Please install it and try again.');
        }
    };

    // 
    const disconnectWallet = async () => {
        await window.solana.disconnect();
        updateConnectWalletButton('Connect Wallet');
        connectWalletButton.removeEventListener('click', disconnectWallet);
        connectWalletButton.addEventListener('click', connectWallet);
    };

    // 
    const updateConnectWalletButton = (text) => {
        connectWalletButton.textContent = text;
    };

    connectWalletButton.addEventListener('click', connectWallet);
});
