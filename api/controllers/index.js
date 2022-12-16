const { matchedData } = require('express-validator');
const { 
    ETH_USDC_ADDR,
    ETH_BUSD_ADDR,
    ETH_BNB_ADDR
} = require('../../utils/index');


const { 
    getBalanceOfBTC,
    getBalanceOfETH,
    getBalanceOfERC20
} = require('../libs/index');


const balanceOfBTC = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfBTC(wallet);
    res.status(200).json(result);
}

const balanceOfETH = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfETH(wallet);
    res.status(200).json(result);
}

const balanceOfETH_USDC = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfERC20('ETH', ETH_USDC_ADDR, wallet);
    res.status(200).json(result);
}

const balanceOfETH_BUSD = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfERC20('ETH', ETH_BUSD_ADDR, wallet);
    res.status(200).json(result);
}

const balanceOfETH_BNB = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfERC20('ETH', ETH_BNB_ADDR, wallet);
    res.status(200).json(result);
}

module.exports = {
    balanceOfBTC,
    balanceOfETH,
    balanceOfETH_USDC,
    balanceOfETH_BUSD,
    balanceOfETH_BNB
}
