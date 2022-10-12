const { config } = require('./Config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.RPC));
const ABI = require('./ABI/minter.abi.json');
const WalletList = require("./wallet.json");
const { sendTx } = require("./lib/SendTx");

(async() => {

    const Xen = new web3.eth.Contract(ABI, config.ContractAddress);
    let globalRank = await Xen.methods.globalRank().call();

    let sum = 0;
    for( let wallet of WalletList)
    {
        let data = await Xen.methods.userMints(wallet.address).call();  
        sum += await CalculateReward(globalRank, data); 
    }
    console.log(sum);
  

    async function CalculateReward(globalRank,data)
    {
        const EAA = 0.1 - 0.001 * (data.rank / 1e5);
        const XEN =
        Math.log2(globalRank - data.rank) *
        data.term *
        data.amplifier *
        (1 + EAA);
        return XEN;
    }

})()
