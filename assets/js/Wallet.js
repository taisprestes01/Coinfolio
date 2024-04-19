const fetch = require('node-fetch');

// Função para obter o saldo da conta
async function getBalance(apiKey, apiSecret, currency) { 
    const url = "https://tradeogre.com/api/v1/account/balance";
    const auth = `${apiKey}:${apiSecret}`; // Combinação de chave pública e privada para autenticação
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(auth).toString('base64') 
    };
    const data = JSON.stringify({ currency });

    try {
        const response = await fetch(url, { 
            method: 'POST', 
            headers, 
            body: data 
        });

        if (!response.ok) { // Verificação de resposta bem-sucedida
            throw new Error(`Falha ao obter saldo. Código de status: ${response.status}`); // Lança um erro em caso de falha
        }

        const balance = await response.json();
        return balance; // Retorna o saldo obtido
    } catch (error) { // Captura de erros
        return { error: error.message };
    }
}