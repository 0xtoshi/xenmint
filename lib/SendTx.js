const { config } = require('../Config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.RPC));
let sendTx = async (account, gasPrice, gasLimit, destinationContract, txData, value) => 
{
    const count = await web3.eth.getTransactionCount(account.address, "pending");
    const tx = {
        from        : account.address, 
        to          : destinationContract, 
        value       : value,
        gas         : web3.utils.numberToHex(gasLimit),
        gasPrice    : web3.utils.numberToHex(web3.utils.toWei(gasPrice, 'gwei')),
        data        : txData ,
        nonce       : count
      }; 
        let txs = await web3.eth.accounts.signTransaction(tx, account.privateKey)
        var rawTx = txs.rawTransaction;  
        try{
        let tx = await web3.eth.sendSignedTransaction(rawTx);
        console.log(tx);
        }catch(err){console.log(err)}


}

module.exports = { sendTx };