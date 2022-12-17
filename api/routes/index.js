const express = require('express');
const router = express.Router();
const trimRequest = require('trim-request');

const { 
    validateBTC,
    validateETH
 } = require('../validators/validator');

 const { 
    getAllPrice,
    balanceOfBTC,
    balanceOfETH,
    balanceOfETH_USDC,
    balanceOfETH_BUSD,
    balanceOfETH_BNB,
    balanceOfBNB_BEP20,
    balanceOfBNB_BEP2,
    balanceOfTRON_USDC,
    balanceOfTRON_USDT
 } = require('../controllers/index');

router.post('/test', (req, res) => {
    res.send({message : 'API'})
});

router.get('/balance-btc', trimRequest.all, validateBTC, balanceOfBTC);
router.get('/balance-eth', trimRequest.all, validateETH, balanceOfETH);
router.get('/balance-eth-usdc', trimRequest.all, validateETH, balanceOfETH_USDC);
router.get('/balance-eth-busd', trimRequest.all, validateETH, balanceOfETH_BUSD);
router.get('/balance-eth-bnb', trimRequest.all, validateETH, balanceOfETH_BNB);
router.get('/balance-bnb-bep20', trimRequest.all, validateETH, balanceOfBNB_BEP20);
router.get('/balance-bnb-bep2', trimRequest.all, validateETH, balanceOfBNB_BEP2);//TODO
router.get('/balance-tron-usdc', trimRequest.all, validateETH, balanceOfTRON_USDC);//TODO validator
router.get('/balance-tron-usdt', trimRequest.all, validateETH, balanceOfTRON_USDT);//TODO validator
router.get('/all-price', trimRequest.all, getAllPrice);

module.exports = router;