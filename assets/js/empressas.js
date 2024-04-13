async function fetchData() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      return null;
    }
  }
  
  async function processData() {
    const data = await fetchData();
    if (data) {
      // Aqui pode manipular os dados conforme necessário
      console.log(data);
    } else {
      console.error('Nenhum dado retornado da API.');
    }
  }
  
  processData();
  