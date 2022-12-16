const { validateResult } = require('../utils/validateResult')
const { check } = require('express-validator')

const validateBTC = [
  check('wallet')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
    // .isLength({
    //   length: 42
    // })
    // .withMessage('RECEIVER_ADDRESS_INVALID'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
]

module.exports = {validateBTC}