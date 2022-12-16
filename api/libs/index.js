const axios = require('axios');

const { 
    addDecimals,
    getDecimals
} = require('../../utils/index');
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

const getBalanceOfETH = async( wallet ) => {
    const res = axios.get(`https://api.tatum.io/v3/ethereum/account/balance/${wallet}`, {
                        headers : {
                            'x-api-key' : 'ffb508aa-3bd0-424f-8816-050d1b82ac70'
                        }
                    })
                    .then(function(res) {
                        return { 'Balance of ETH' : res.data };
                    })
                    .catch(function(err) {
                        return { Error : err };
                    });
    return res;
}

//Chain - CELO, ALGO, MATIC, ETH, BSC, XDC, KLAY, ONE, EGLD, KCS, SOL
const getBalanceOfERC20 = async( chain, contractAddress, wallet ) => {
    let dec = await getDecimals(chain, contractAddress);
    const res = axios.get(`https://api.tatum.io/v3/blockchain/token/balance/${chain}/${contractAddress}/${wallet}`, {
                        headers : { 'x-api-key' : 'ffb508aa-3bd0-424f-8816-050d1b82ac70' }
                    })
                    .then(function(res) {
                        return { 
                            'Balance'   : res.data.balance,
                            'Decimals'  : dec
                        };
                    })
                    .catch(function(err) {
                        return { Error : err };
                    });
    return res;
}

module.exports = {
    getBalanceOfBTC,
    getBalanceOfETH,
    getBalanceOfERC20
}
