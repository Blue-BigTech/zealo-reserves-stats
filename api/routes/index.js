const express = require('express');
const router = express.Router();
const trimRequest = require('trim-request');

const { 
    validateBTC,
    validateETH
 } = require('../validators/validator');

 const { 
    balanceOfBTC,
    balanceOfETH,
    balanceOfETH_USDC,
    balanceOfETH_BUSD,
    balanceOfETH_BNB,
 } = require('../controllers/index');

router.post('/test', (req, res) => {
    res.send({message : 'API'})
})
router.get('/balance-btc', trimRequest.all, validateBTC, balanceOfBTC);
router.get('/balance-eth', trimRequest.all, validateETH, balanceOfETH);
router.get('/balance-eth-usdc', trimRequest.all, validateETH, balanceOfETH_USDC);
router.get('/balance-eth-busd', trimRequest.all, validateETH, balanceOfETH_BUSD);
router.get('/balance-eth-bnb', trimRequest.all, validateETH, balanceOfETH_BNB);

module.exports = router;