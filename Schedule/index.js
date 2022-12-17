const fs = require('fs');
const { 
    getAllPriceData,
    getBalanceOfBTC,
    getBalanceOfETH,
    getBalanceOfERC20,
    getBalanceOfBNB_BEP20,
    getBalanceOfBNB_BEP2,
    getBalanceOfTRC20,
} = require('../api/libs/index');
const { 
    getETH_AddrFromSymbol,
    getTRON_AddrFromSymbol,
} = require('../utils/index');

const Binance_Hotwallet = JSON.parse(fs.readFileSync('wallet/hotwallet.json','utf-8'));

let binance_reserve_data;
async function main() {
    const allPrices = await getAllPriceData();
    console.log(allPrices);

    const BTC_LIST = Binance_Hotwallet.BTC;
    const ETH_LIST = Binance_Hotwallet.ETH;
    const BNB_LIST = Binance_Hotwallet.BNB;
    const TRON_LIST = Binance_Hotwallet.TRON;

    for(let i in BTC_LIST){
        const BTC = BTC_LIST[i];
        const Address = BTC['ADDRESS'];
        await delay(2000);
        let balance = await getBalanceOfBTC(Address);
        addOneRecord('BTC', 'BTC', Address, balance, allPrices['BTC']);
    }
    
    for(let i in ETH_LIST){
        const ETH = ETH_LIST[i];
        const Symbol = ETH['TOKEN'];
        const Address = ETH['ADDRESS'];
        await delay(2000);
        let balance;
        if(Symbol == 'ETH'){
            balance = await getBalanceOfETH(Address);
        }else{
            const contractAddress = getETH_AddrFromSymbol(Symbol);
            balance = await getBalanceOfERC20( 'ETH', contractAddress, Address );
        }
        addOneRecord(Symbol, 'ETH', Address, balance, allPrices[Symbol]);
    }

    for(let i in BNB_LIST){
        const BNB = BNB_LIST[i];
        const Symbol = BNB['TOKEN'];
        const Address = BNB['ADDRESS'];
        await delay(2000);
        let balance;
        if(Symbol == 'BEP20'){
            balance = await getBalanceOfBNB_BEP20(Address);
        }else if(Symbol == 'BEP2'){
            balance = await getBalanceOfBNB_BEP2(Address);
        }
        addOneRecord('BNB', Symbol, Address, balance, allPrices[Symbol]);
    }
    
    for(let i in TRON_LIST){
        const TRON = TRON_LIST[i];
        const Symbol = TRON['TOKEN'];
        const Address = TRON['ADDRESS'];
        await delay(2000);
        const contractAddress = getTRON_AddrFromSymbol(Symbol);
        let balance = await getBalanceOfTRC20( contractAddress, Address );
        addOneRecord(Symbol, 'TRON', Address, balance, allPrices[Symbol]);
    }

}

function addOneRecord(symbol, chain, wallet, balance, price) {
    console.log(symbol, chain, wallet, balance['Balance'], price);
}

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
module.exports = {
    main,
}