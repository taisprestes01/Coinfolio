fetch("https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin")
.then(resposta => resposta.json())
.then(respota => console.log(respota))
.catch(err => console.log(err)); aaaaaa