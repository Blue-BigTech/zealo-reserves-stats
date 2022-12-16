const { matchedData } = require('express-validator');

const { 
    getBalanceOfBTC,
    getBalanceOfETH
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

module.exports = {
    balanceOfBTC,
    balanceOfETH
}
