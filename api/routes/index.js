const express = require('express');
const router = express.Router();
const trimRequest = require('trim-request');

const { validateBTC } = require('../validators/validator');
const { balanceOfBTC } = require('../controllers/index');

router.post('/test', (req, res) => {
    res.send({message : 'API'})
})
router.get('/balance-btc', trimRequest.all, validateBTC, balanceOfBTC)

module.exports = router;