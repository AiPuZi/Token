document.addEventListener('DOMContentLoaded', function() {
    const tokenForm = document.getElementById('tokenForm');
    const connectWalletButton = document.getElementById('connectWallet'); // 连接钱包的按钮

    tokenForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // 从表单中获取值
        const tokenName = document.getElementById('tokenName').value;
        const tokenSymbol = document.getElementById('tokenSymbol').value;
        const totalSupply = document.getElementById('totalSupply').value;
        const decimals = document.getElementById('decimals').value;
        const metadataUri = document.getElementById('metadataUri').value;
        const disableMintAuthority = document.getElementById('disableMintAuthority').checked;

        // 构建请求体
        const requestBody = {
            tokenName,
            tokenSymbol,
            totalSupply,
            decimals,
            metadataUri,
            disableMintAuthority
        };

        // 发送请求到后端服务
        try {
            const response = await fetch('/api/create-token', {
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

    // 检测 Phantom 钱包是否已安装
    const isPhantomInstalled = () => {
        return window.solana && window.solana.isPhantom;
    };

    // 连接到 Phantom 钱包
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

    // 断开钱包连接
    const disconnectWallet = async () => {
        await window.solana.disconnect();
        updateConnectWalletButton('Connect Wallet');
        connectWalletButton.removeEventListener('click', disconnectWallet);
        connectWalletButton.addEventListener('click', connectWallet);
    };

    // 更新连接钱包按钮的文本为钱包地址或“Connect Wallet”
    const updateConnectWalletButton = (text) => {
        connectWalletButton.textContent = text;
    };

    connectWalletButton.addEventListener('click', connectWallet);
});
