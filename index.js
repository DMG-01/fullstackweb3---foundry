import {ethers} from "./ethers-5.6.esm.min.js"
import {abi,contractAddress} from "./constants.js"

const connectButton = document.getElementById("connect-button");
const fundButton = document.getElementById("fund-button");
const getBalanceButton = document.getElementById("balance-button");
const withdrawButton = document.getElementById("withdraw-button")

getBalanceButton.onclick = getBalance;
connectButton.onclick = connect;
fundButton.onclick = fund;
withdrawButton.onclick = withdraw;


console.log(ethers)

async function connect() {
  if (window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }

    connectButton.innerHTML = "CONNECTED";
  } else {
    connectButton.innerHTML = "PLEASE INSTALL METAMASK!";
  }
}

 async function fund() {
  //console.log(`funding with ${ethAmount}...`)
  const ethAmount = document.getElementById("eth-amount").value
  if(typeof window.ethereum !== "undefined") {
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress,abi,signer)
try{
const transactionResponse = await contract.fund({value: ethers.utils.parseEther(ethAmount)})
  } catch(error) {
    console.log(error)
  }
}
else {
  connectButton.innerHTML = "PLEASE INSTALL METAMASK!";   
}
}

async function getBalance() {
if(typeof window.ethereum !== "undefined") {
const provider = new ethers.providers.Web3Provider(window.ethereum)
const balance = await provider.getBalance("0x64C7258F1F7Fa28c436AfCA61A1259930402db0F")
console.log(ethers.utils.formatEther(balance))
}

}

async function withdraw() {
  if(typeof window.ethereum !== "undefined"){
    console.log("withdrawing...")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress,abi,signer)
    try{
    const transactionResponse = contract.withdraw()
    await listenForTransactionMine(transactionResponse, provider)

    }catch(error){
    console.log(error)
    }
  }

}
function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations. `
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}
