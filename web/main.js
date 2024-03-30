// 
// 
const isPhantomInstalled = () => {
  return window.solana && window.solana.isPhantom;
};

// 
const connectWallet = async () => {
  if (isPhantomInstalled()) {
    try {
      // 
      const response = await window.solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      // 
    } catch (error) {
      // 
      console.error('Wallet connection denied:', error.message);
    }
  } else {
    alert('Phantom Wallet not found! Please install it and try again.');
  }
};

// 
document.getElementById('connectWallet').addEventListener('click', connectWallet);
