document.addEventListener('DOMContentLoaded', function() {
    const tokenForm = document.getElementById('tokenForm'); // 确保这是您表单的ID

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

        // 发送请求到您的后端服务
        try {
            const response = await fetch('/api/create-token', { // 确保这是您后端创建代币的正确URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Token created successfully. Transaction ID: ' + result.transactionId);
                // 处理成功响应
            } else {
                throw new Error('Failed to create token.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
            // 处理错误
        }
    });

    // 新增的连接钱包功能
    const isPhantomInstalled = () => {
        return window.solana && window.solana.isPhantom;
    };

    const connectWallet = async () => {
        if (isPhantomInstalled()) {
            try {
                const response = await window.solana.connect();
                console.log('Connected with Public Key:', response.publicKey.toString());
            } catch (error) {
                console.error('Wallet connection denied:', error.message);
            }
        } else {
            alert('Phantom Wallet not found! Please install it and try again.');
        }
    };

    const connectWalletButton = document.getElementById('connectWallet');
    connectWalletButton.addEventListener('click', connectWallet);
});
