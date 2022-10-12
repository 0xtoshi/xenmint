const { config } = require('./Config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.RPC));
const ABI = require('./ABI/minter.abi.json');
const WalletList = require("./wallet.json");
const { sendTx } = require("./lib/SendTx");

(async() => {

    const Xen = new web3.eth.Contract(ABI, config.ContractAddress);
    let TxData = await Xen.methods.claimMintReward().encodeABI();
    console.log(TxData);
    let BroadcastTx = [];
    for(wallet of WalletList)
    {
        BroadcastTx.push(sendTx(wallet,
            config.Gwei,
            "104000",
            config.ContractAddress,
            TxData,
            "0" 
        ))
    }
    Promise.all( BroadcastTx )
})()
