const express = require('express');
const btoa = require('btoa');
const app = express();
const port = 3000;

const apiKeyPublic = '9300942edf59fa006a37c5fb31c657ba';
const apiKeyPrivate = '45b8134cdada0bf02aeb9bf0919417b7';
const currency = 'ZEPH'; 

app.get('/balance', async (req, res) => {
  const url = 'https://tradeogre.com/api/v1/account/balance';
  const data = { currency: currency };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(apiKeyPublic + ':' + apiKeyPrivate)}`
    },
    body:'currency=' + currency
  };

  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default(url, options);
    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
body:'currency=' + currency