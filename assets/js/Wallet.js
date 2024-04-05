const axios = require('axios');
const readline = require('readline');

// Função para obter entrada do usuário
async function getUserInput(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function getBalance() {
    try {
        // Obter a moeda desejada do usuário
        const currency = await getUserInput('Digite o código da moeda (ex: BTC): ');

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

// Chame a função getBalance e imprima o resultado
getBalance().then(result => {
    if (result.success) {
        console.log('Saldo:', result.balance);
        console.log('Saldo disponível:', result.available);
    } else {
        console.error('Erro:', result.error);
    }
}).catch(error => {
    console.error('Erro:', error);
});
