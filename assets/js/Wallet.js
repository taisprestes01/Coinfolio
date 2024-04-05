const axios = require('axios');

async function getBalance(currency) {
    try {
        const endpoint = 'https://tradeogre.com/api/v1/account/balance';

        const requestBody = {
            currency: currency
        };

        const response = await axios.post(endpoint, requestBody);

        if (response.data.success) {
            return {
                success: true,
                balance: response.data.balance,
                available: response.data.available
            };
        } else {
            return {
                success: false,
                error: 'Erro ao obter saldo da moeda ' + currency
            };
        }
    } catch (error) {
        return {
            success: false,
            error: 'Erro de requisição: ' + error.message
        };
    }
}

// Chame a função getBalance com a moeda desejada
getBalance('BTC').then(result => {
    if (result.success) {
        console.log('Saldo:', result.balance);
        console.log('Saldo disponível:', result.available);
    } else {
        console.error('Erro:', result.error);
    }
}).catch(error => {
    console.error('Erro:', error);
});
