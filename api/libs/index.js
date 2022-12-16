const axios = require('axios');

const { addDecimals } = require('../../utils/index');
const getBalanceOfBTC = async( wallet ) => {
    const res = axios.get(`https://blockchain.info/q/addressbalance/${wallet}?confirmations=2`)
                     .then(function(res) {
                         const BTC = addDecimals(res.data, 8);
                         return { 'Balance of BTC' : BTC };
                     })
                     .catch(function(err) {
                         return { Error : err };
                     });
    return res;
}

module.exports = {
    getBalanceOfBTC,
}
