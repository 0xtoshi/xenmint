const { config } = require('./Config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.RPC));
const ABI = require('./ABI/minter.abi.json');
const WalletList = require("./wallet.json");
const { sendTx } = require("./lib/SendTx");

(async() => {

    const Xen = new web3.eth.Contract(ABI, config.ContractAddress);
    let TxData = await Xen.methods.claimRank(config.Term).encodeABI();
    console.log(TxData);
    for(wallet of WalletList)
    {
        
        let balance = await getXenBalance(wallet.address);
        if(balance > 0)
        {
            let txData = await Xen.methods.transfer(config.mainWallet, balance).encodeABI();
            await sendTx(wallet,
                config.Gwei,
                "23000",
                config.ContractAddress,
                txData,
                "0" 
            )
        }else{
            console.log(wallet.address +" Balance Is Empty")
        }
    }
    async function getXenBalance(address){

        let BalanceABI = [
            {
              "constant":true,
              "inputs":[{"name":"_owner","type":"address"}],
              "name":"balanceOf",
              "outputs":[{"name":"balance","type":"uint256"}],
              "type":"function"
            },
            {
              "constant":true,
              "inputs":[],
              "name":"decimals",
              "outputs":[{"name":"","type":"uint8"}],
              "type":"function"
            }
          ];
        
          let BalanceContract = new web3.eth.Contract(BalanceABI, config.ContractAddress);
          var TokenBalance = await BalanceContract.methods.balanceOf(address).call();

          return  await web3.utils.fromWei(TokenBalance, 'ether');

    }

})()
