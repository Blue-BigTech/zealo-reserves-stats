const { matchedData } = require('express-validator');

const { 
    getBalanceOfBTC,
} = require('../libs/index');

const balanceOfBTC = async (req, res) => {
    const data = matchedData(req);
    const wallet = data.wallet;
    const result = await getBalanceOfBTC(wallet);
    res.status(200).json(result);
}

module.exports = {
    balanceOfBTC,
}
