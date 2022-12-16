const axios = require('axios');

const { 
    addDecimals,
    getDecimals,
    getDecimalsTRC20
} = require('../../utils/index');

const getBalanceOfBTC = async( wallet ) => {
    const res = axios.get(`https://blockchain.info/q/addressbalance/${wallet}?confirmations=2`)
                    .then(function(res) {
                        const BTC = addDecimals(res.data, 8);
                        return { 'Balance' : BTC };
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
                        return { 'Balance' : res.data };
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

const getBalanceOfBNB_BEP20 = async( wallet ) => {
    const res = axios.get(`https://api.tatum.io/v3/bsc/account/balance/${ wallet }`, {
                        headers : { 'x-api-key' : 'ffb508aa-3bd0-424f-8816-050d1b82ac70' }
                    })
                    .then(function(res) {
                        return { 'Balance' : res.data };
                    })
                    .catch(function(err) {
                        return { Error : err };
                    });
    return res;
}

const getBalanceOfBNB_BEP2 = async( wallet ) => {
    const res = axios.get(`https://api.tatum.io/v3/bnb/account/${ wallet }`, {
                        headers : { 'x-api-key' : 'ffb508aa-3bd0-424f-8816-050d1b82ac70' }
                    })
                    .then(function(res) {
                        const balances = res.data.balances;
                        let token;
                        for(let i in balances){
                            token = balances[i];
                            if(token.hasOwnProperty('BNB')){
                                break;
                            }
                        }
                        return { 'Balance' :  token['free'] };
                    })
                    .catch(function(err) {
                        return { Error : err };
                    });
    return res;
}

const getBalanceOfTRC20 = async( contractAddress, wallet ) => {
    const dec = await getDecimalsTRC20(contractAddress);
    const res = axios.get(`https://api.tatum.io/v3/tron/account/${ wallet }`, {
                        headers : { 'x-api-key' : 'ffb508aa-3bd0-424f-8816-050d1b82ac70' }
                    })
                    .then(function(res) {
                        const trc20 = res.data.trc20;
                        let token;
                        for(let i in trc20){
                            token = trc20[i];
                            if(token.hasOwnProperty(contractAddress)){
                                break;
                            }
                        }
                        return {
                            "Balance" : token[contractAddress],
                            "Decimals" : dec
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
    getBalanceOfERC20,
    getBalanceOfBNB_BEP20,
    getBalanceOfBNB_BEP2,
    getBalanceOfTRC20
}
