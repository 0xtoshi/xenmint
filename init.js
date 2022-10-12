const { GenerateMnemonic , MnemonicToAccount } = require('./lib/adressUtils');
const { objectToCsv } = require('./lib/csvUtils');
const clc = require("cli-color");
const fs = require("fs");
const { config } = require('./Config');


let amount = "0.004";


(async() => {

    console.log(clc.red(`XEN MINTER BSC`));
    let mnemonic = await GenerateMnemonic();
    console.log(`\nYour Mnemonic is : \n`);
    console.log(clc.green(mnemonic))
    console.log(clc.redBright("\nPlease Save Carefuly your mnemonic!\n"))

    
    const wallet = await MnemonicToAccount(mnemonic, config.WalletCount);
    fs.writeFileSync("./wallet.json", JSON.stringify(wallet, null, 4));
    console.log(clc.blue("Wallet list created in file wallet.json please backup to withdraw "));
    for(account of wallet)
    {
        fs.appendFileSync('./multisender.csv', `${account.address},${config.AmountMultiSend}\n`);
    }
    let fixcsv = fs.readFileSync('./multisender.csv', 'utf-8');
    fixcsv = fixcsv.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "");
    fs.writeFileSync("./multisender.csv", fixcsv);

    console.log(clc.blue("multisender csv created at multisender.csv \n"))



})();