// Importa a biblioteca
const axios = require('axios');

// Chaves de autenticação fornecidas pela TradeOgre
const publicKey = '9300942edf59fa006a37c5fb31c657ba'; 
const privateKey = '45b8134cdada0bf02aeb9bf0919417b7'; 

// Função para obter o saldo da conta para uma determinada moeda
async function getBalance(currency) {
    const url = 'https://tradeogre.com/api/v1/account/balance'; // URL do endpoint da API

    try {
        // Faz uma solicitação POST para o endpoint da API TradeOgre
        const response = await axios.post(url, {
            currency: currency 
        }, {
            headers: {
                
                'Authorization': 'Basic ' + Buffer.from(publicKey + ':' + privateKey).toString('base64')
            }
        });

        // Verifica se a solicitação foi bem-sucedida
        if (!response.data.success) {
            // Se a solicitação não foi bem-sucedida, lança um erro com a mensagem de erro da API
            throw new Error('Erro ao obter saldo da conta: ' + response.data.error);
        }

        // Retorna os dados de saldo da conta obtidos da resposta da API
        return response.data;
    } catch (error) {
        // Captura e trata qualquer erro que ocorra durante a solicitação
        console.error('Erro ao chamar o endpoint de saldo:', error);
        throw error; // Lança o erro novamente para que seja tratado externamente
    }
}

// Exemplo de uso da função getBalance
const currency = 'BTC'; // Define a moeda desejada (substitua 'BTC' pela moeda desejada)
getBalance(currency)
    .then(balance => {
        // Se a solicitação for bem-sucedida, imprime o saldo da conta no console
        console.log('Saldo:', balance);
    })
    .catch(error => {
        // Se ocorrer algum erro durante a solicitação, imprime o erro no console
        console.error('Erro ao obter saldo:', error);
    });