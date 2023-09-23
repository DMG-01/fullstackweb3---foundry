import {ethers} from "./ethers-5.6.esm.min.js"
import {abi,contractAddress} from "./constants.js"

const connectButton = document.getElementById("connect-button");
const fundButton = document.getElementById("fund-button");
connectButton.onclick = connect;
fundButton.onclick = fund;

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
  const ethAmount = "0.01"
  if(typeof window.ethereum !== "undefined") {
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress,abi,signer)
//try{
const transactionResponse = await contract.fund({value: ethers.utils.parseEther(ethAmount)})
 // } catch(error) {
   // console.log(error)
  }
}
//}
/*
function listenForTransactionMine(transactionResponse,provider) {
  console.log(`Mining ${transactionResponse.hash}`)
  function listener() {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log( `COMPLETED WITH ${transactionReceipt.confirmation} confirmation`)
    })
  }
}
*/