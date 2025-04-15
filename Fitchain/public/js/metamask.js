document.addEventListener("DOMContentLoaded", async () => {
    const connectBtn = document.getElementById("connectButton");
    const walletDisplay = document.getElementById("walletDisplay");
  
    // Auto-load connected account
    if (window.ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        walletDisplay.textContent = accounts[0];
      }
    }
  
    connectBtn.addEventListener("click", async () => {
      if (window.ethereum) {
        try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          walletDisplay.textContent = accounts[0];
        } catch (err) {
          console.error("Connection rejected");
        }
      } else {
        alert("MetaMask is not installed");
      }
    });
  });  