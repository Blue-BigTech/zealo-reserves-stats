const fs = require('fs');
const {BN} = require('web3-utils');
const Web3 = require('web3');

const ETH_USDC_ADDR = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const ETH_RPC_URL = 'https://rpc.ankr.com/eth';
const BSC_RPC_URL = 'https://bsc-dataseed1.binance.org';

let ERC20ABI = JSON.parse(fs.readFileSync('abi/erc20.json','utf-8'));

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

module.exports = {
    ETH_USDC_ADDR,
    ETH_RPC_URL,
    BSC_RPC_URL,
    addDecimals,
    setDecimals,
    getDecimals
}