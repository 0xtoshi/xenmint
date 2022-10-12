const { config } = require('./Config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.RPC));
const WalletList = require("./wallet.json");
const { sendTx } = require("./lib/SendTx");

(async() => {

    for(wallet of WalletList)
    {
        var txFee = await web3.eth.getGasPrice() * 21000;
        var balance = await web3.eth.getBalance(wallet.address);
        var valueToBeSent = balance - txFee;
        if(balance > 0){
        await sendTx(wallet,
            config.Gwei,
            "21000",
            config.mainWallet,
            "0x",
            valueToBeSent 
        )
        }
    }

})()
