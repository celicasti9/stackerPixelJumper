document.addEventListener('DOMContentLoaded', function() 
{
    
    const cryptoBtn = document.getElementById('cryptoBtn');
  
    /*
    cryptoBtn.addEventListener('click', function() {
      // Call your backend API endpoint for crypto donation
      // Replace `YOUR_BACKEND_API_URL` with the actual URL of your backend API endpoint
      fetch('YOUR_BACKEND_API_URL/crypto')
        .then(function(response) {
          // Handle the response from the backend API
          if (response.ok) {
            alert('Donation via Crypto successful!');
          } else {
            alert('Donation via Crypto failed. Please try again later.');
          }
        })
        .catch(function(error) {
          alert('An error occurred while processing the donation via Crypto.');
          console.error(error);
        });
    });
    */
   
    /*HERE?*/

    const connectWallet = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
        const accounts = await window.web3.eth.getAccounts();
        const walletAddress = accounts[0];
        console.log(`Wallet: ${walletAddress}`);
      } else {
        console.log('No wallet');
      }
    };
    
    connectWallet();
    

  });

  // Connect Wallet
document.getElementById("connect-button").addEventListener("click", async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    window.web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const walletAddress = accounts[0];
    console.log(`Wallet: ${walletAddress}`);
  } else {
    console.log("No wallet");
  }
});

// Other donation methods
// Add your code for Cash App and PayPal donation methods here

  




  