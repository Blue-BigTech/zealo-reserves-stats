const express = require('express');
const router = express.Router();
const trimRequest = require('trim-request');

const { 
    validateBTC,
    validateETH
 } = require('../validators/validator');

 const { 
    balanceOfBTC,
    balanceOfETH
 } = require('../controllers/index');

router.post('/test', (req, res) => {
    res.send({message : 'API'})
})
router.get('/balance-btc', trimRequest.all, validateBTC, balanceOfBTC);
router.get('/balance-eth', trimRequest.all, validateETH, balanceOfETH);

module.exports = router;