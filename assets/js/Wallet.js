import fetch from 'node-fetch';


async function authenticatedRequest(url, apiKey, apiSecret, requestData) {
    const auth = `${apiKey}:${apiSecret}`; 
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(auth).toString('base64') 
    };

    try {
        const response = await fetch(url, { 
            method: 'POST', 
            headers, 
            body: JSON.stringify(requestData) 
        });

        if (!response.ok) { 
            throw new Error(`Falha na solicitação. Código de status: ${response.status}`);
        }

        return await response.json(); 
    } catch (error) { 
        throw new Error(`Erro na solicitação: ${error.message}`);
    }
}


async function getBalance(apiKey, apiSecret, currency) { 
    const url = "https://tradeogre.com/api/v1/account/balance";
    const requestData = { currency }; 

    try {
        
        const balance = await authenticatedRequest(url, apiKey, apiSecret, requestData);
        return balance; 
    } catch (error) { 
        return { error: error.message };
    }
}


const apiKey = 'sua-chave-publica'; 
const apiSecret = 'sua-chave-privada'; 
const currency = 'BTC'; 

getBalance(apiKey, apiSecret, currency)
  .then(balance => {
    console.log('Saldo:', balance);
  })
  .catch(error => {
    console.error('Erro:', error);
  });