const fs = require('fs');
const {BN} = require('web3-utils');
const Web3 = require('web3');
const TronWeb = require('tronweb');
const { authorize } = require('./google-auth');
const { writeDataAPI } = require('./sheetWriter');

const ETH_USDC_ADDR = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const ETH_BUSD_ADDR = '0x4Fabb145d64652a948d72533023f6E7A623C7C53';
const ETH_BNB_ADDR = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52';
const TRON_USDC_ADDR = 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8';
const TRON_USDT_ADDR = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const ETH_RPC_URL = 'https://rpc.ankr.com/eth';
const BSC_RPC_URL = 'https://bsc-dataseed1.binance.org';

let ERC20ABI = JSON.parse(fs.readFileSync('abi/erc20.json','utf-8'));

const TokenSymbols = [
    'BTC',
    'ETH',
    'BNB',
    'BNB2',
    'USDC',
    'USDT',
    'BUSD'
];

function getETH_AddrFromSymbol(symbol){
    let address;
    switch(symbol){
        case 'USDC':
            address = ETH_USDC_ADDR;
            break;
        case 'BNB':
            address = ETH_BNB_ADDR;
            break;
        case 'BUSD':
            address = ETH_BUSD_ADDR;
            break;
    }
    return address;
}

function getTRON_AddrFromSymbol(symbol){
    let address;
    switch(symbol){
        case 'USDC':
            address = TRON_USDC_ADDR;
            break;
        case 'USDT':
            address = TRON_USDT_ADDR;
            break;
    }
    return address;
}

//multiply
function setDecimals( number, decimals ){
    number = number.toString();
    let numberAbs = number.split('.')[0]
    let numberDecimals = number.split('.')[1] ? number.split('.')[1] : '';
    while( numberDecimals.length < decimals ){
        numberDecimals += "0";
    }
    return numberAbs + numberDecimals;
}

//divide
function addDecimals(x, n) { 
    base = new BN(10).pow(new BN(n));
    dm = new BN(x).divmod(base);
    return dm.div + "." + dm.mod.toString(10, n)
}

async function getDecimals( chain, tokenAddress ){
    let RPC_URL = '';
    switch(chain){
        case 'ETH':
            RPC_URL = ETH_RPC_URL;
            break;
        case 'BSC':
            RPC_URL = BSC_RPC_URL;
            break;
    }
    const web3 = new Web3(RPC_URL);
    let tokenRouter = await new web3.eth.Contract( ERC20ABI, tokenAddress );
    return await tokenRouter.methods.decimals().call();
}

//for tronchain
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "739b75ea67435ee9afbaddd7495b633b77bc90841ea35c9e4b837d42c0bfe0d8";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

async function getDecimalsTRC20(tokenAddress){
    let tokenRouter = await tronWeb.contract().at(tokenAddress);
    const dec = await tokenRouter.decimals().call();
    return dec;
}

module.exports = {
    authorize,
    writeDataAPI,
    ETH_USDC_ADDR,
    ETH_BUSD_ADDR,
    ETH_BNB_ADDR,
    TRON_USDC_ADDR,
    TRON_USDT_ADDR,
    ETH_RPC_URL,
    BSC_RPC_URL,
    TokenSymbols,
    addDecimals,
    setDecimals,
    getDecimals,
    getDecimalsTRC20,
    getETH_AddrFromSymbol,
    getTRON_AddrFromSymbol
}
