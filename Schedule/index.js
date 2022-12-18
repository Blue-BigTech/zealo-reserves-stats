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
    authorize,
    writeDataAPI,
    getETH_AddrFromSymbol,
    getTRON_AddrFromSymbol,
    addDecimals
} = require('../utils/index');

const Binance_Hotwallet = JSON.parse(fs.readFileSync('wallet/hotwallet.json','utf-8'));

var auth = null;
const sheetID = '1FpJprA9VDCniJiO3Z4Hlbqyh0Vp3GGU5P-ab95eHFUU';
var rowID = 2;
const sheetName = 'Binance';
// const binance_reserve_data = [];

async function main() {
    auth = await authorize();
    rowID = 2;

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
    // console.log(binance_reserve_data);
}

function addOneRecord(symbol, chain, wallet, balance, price) {
    let value = 0;
    if(balance.hasOwnProperty('Decimals')){
        value = parseFloat( addDecimals(balance['Balance'], parseInt(balance['Decimals'])) );
    }else{
        value = parseFloat(balance['Balance']);
    }
    let priceValue = value * price;
    // let record = {
    //     coin    : symbol,
    //     network : chain,
    //     address : wallet,
    //     balance : value,
    //     price   : priceValue
    // }
    // console.log(record);
    let values = [];
    values.push(symbol);
    values.push(chain);
    values.push(wallet);
    values.push(value);
    values.push(priceValue);
    let range = sheetName + '!A' + rowID + ':E';
    writeDataAPI(auth, sheetID, range, values);
    // binance_reserve_data.push(JSON.stringify(record));
    rowID++;
}

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
module.exports = {
    main,
}