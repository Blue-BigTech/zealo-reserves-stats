const {BN} = require('web3-utils');

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

module.exports = {
    setDecimals,
    addDecimals
}