# xenmint
Xen Minter

HOW TO USE

```
git clone https://github.com/0xtoshi/xenmint/
yarn install
or 
npm install
```

1. Set Config.js 

```JS

const config = {
   RPC : "https://bsc-dataseed4.ninicoin.io	",
    WalletCount : 100, // Total Wallet
    Term : 1, // 1 days // Terms
    ContractAddress : "0x2AB0e9e4eE70FFf1fB9D67031E44F6410170d00e", //Xen BSC Contract Address
    AmountMultiSend : "0.004", // Disperse send
    Gwei : "5",
    mainWallet : "0x00000", // change to ur main wallet 
    
}

module.exports = { config };

```


Init Create wallet.json and multisender.csv

command
```
node init.js
```
recomendly backup your mnemonic or wallet.json before use again or clone into another folder if u wanna use


import multisender.csv to disperse
hhttps://disperse.app/

if arrive then claimRank

```
node ClaimRank.js
```
tx will minted so wait until ur token unlock
if was unlock then

```
node ClaimToken.js
```

then transfer all of your token in wallet list to ur main wallet

```
node SendXen.js
```
all xen will send to your config.MainWallet

then sendback ur bnb to your main wallet

```
node SendBackBNB.js
```

this is experimental script, use at ur own risk!


#NEW UPDATE

add claimMintRewardAndShare(add, percent)

u can call
```
node ClaimAndShare.js 
```
to withdraw there will be save gas :)

#Add Reward Calc for all address
```
node RewardCalc.js
```
will show all sum reward address
