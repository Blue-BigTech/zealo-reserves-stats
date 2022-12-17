const { matchedData } = require('express-validator');
const { 
    ETH_USDC_ADDR,
    ETH_BUSD_ADDR,
    ETH_BNB_ADDR,
    TRON_USDC_ADDR,
    TRON_USDT_ADDR
} = require('../../utils/index');


const { 
    getAllPriceData,
    getBalanceOfBTC,
    getBalanceOfETH,
    getBalanceOfERC20,
    getBalanceOfBNB_BEP20,
    getBalanceOfBNB_BEP2,
    getBalanceOfTRC20,
} = require('../libs/index');

const getAllPrice = async (req, res) => {
    const result = await getAllPriceData();
    res.status(200).json(result);
}

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

const balanceOfBNB_BEP20 = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfBNB_BEP20(wallet);
    res.status(200).json(result);
}

const balanceOfBNB_BEP2 = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfBNB_BEP2(wallet);
    console.log(result);
    res.status(200).json(result);
}

const balanceOfTRON_USDC = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfTRC20(TRON_USDC_ADDR, wallet);
    res.status(200).json(result);
}

const balanceOfTRON_USDT = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfTRC20(TRON_USDT_ADDR, wallet);
    res.status(200).json(result);
}

module.exports = {
    getAllPrice,
    balanceOfBTC,
    balanceOfETH,
    balanceOfETH_USDC,
    balanceOfETH_BUSD,
    balanceOfETH_BNB,
    balanceOfBNB_BEP20,
    balanceOfBNB_BEP2,
    balanceOfTRON_USDC,
    balanceOfTRON_USDT,
}
