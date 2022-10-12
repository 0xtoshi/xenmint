/*
    * Address Utils
    * Copyright gilang.lens
*/

const { Wallet, utils } = require('ethers');

const GenerateMnemonic = async () => {

    const wallet = Wallet.fromMnemonic(
        utils.entropyToMnemonic(utils.randomBytes(16))
      )
      return wallet.mnemonic.phrase;
}
const MnemonicToAccount = async (mnemonic, count) => {
    let account = [];
    const HDWallet = utils.HDNode.fromMnemonic(mnemonic);
    for(let i=0; i<count; i++)
    {
       let wallet = HDWallet.derivePath(`m/44'/60'/0'/0/${i}`);
        account.push({
            address: wallet.address, 
            privateKey: wallet.privateKey
        });
    }
    return account;
}

module.exports = { GenerateMnemonic, MnemonicToAccount }