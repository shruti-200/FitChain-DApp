const contractAddress = "0xbDf1642aea19Aa48576Ffe0994cDADD88f8eD628"; // replace this

const contractABI = [
    {
      "inputs": [
        { "internalType": "uint8", "name": "_packageId", "type": "uint8" }
      ],
      "name": "getPackage",
      "outputs": [
        { "internalType": "string", "name": "name", "type": "string" },
        { "internalType": "uint256", "name": "fee", "type": "uint256" },
        { "internalType": "uint256", "name": "duration", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint8", "name": "_packageId", "type": "uint8" }
      ],
      "name": "buyMembership",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "packageId",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        }
      ],
      "name": "MembershipPurchased",
      "type": "event"
    }
  ];  

// Load packages manually (assume 3 for now)
async function loadPackages() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const packages = [];
  for (let i = 0; i < 3; i++) { // <-- adjust count if needed
    const pack = await contract.getPackage(i);
    packages.push({ ...pack, id: i });
  }
  return packages;
}

async function buyPackage(id, priceEth) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const tx = await contract.buyMembership(id, {
      value: ethers.utils.parseEther(priceEth.toString())
    });
    await tx.wait();
    alert("Membership purchased!");
  } catch (err) {
    console.error(err);
    alert("Transaction failed.");
  }
}

async function getMembershipTransactions() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
  
    const filter = contract.filters.MembershipPurchased(); // no filter args = all buyers
    const events = await contract.queryFilter(filter, 0, "latest");
  
    return events.map(e => ({
      buyer: e.args.buyer,
      packageId: e.args.packageId,
      expiry: new Date(e.args.expiry.toNumber() * 1000).toLocaleString(),
      txHash: e.transactionHash
    }));
  }
  