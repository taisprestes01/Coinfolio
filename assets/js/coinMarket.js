
const data = fetchData();
async function fetchData() {
  try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      return null;
  }
}

data.then(data => data.forEach(data => addCryptoToList(data)))

function addCryptoToList(crypto) {
  var tbody = document.getElementById("crypto-table-body");
  var row = document.createElement("tr");
  row?.classList.add("table-row");

  var favoriteCell = document.createElement("td");
  favoriteCell.classList.add("table-data");
  favoriteCell.innerHTML = `
    <button class="add-to-fav" aria-label="Add to favourite" data-add-to-fav>
      <ion-icon name="star-outline" aria-hidden="true" class="icon-outline"></ion-icon>
      <ion-icon name="star" aria-hidden="true" class="icon-fill"></ion-icon>
    </button>`;
  row?.appendChild(favoriteCell);

  var rankCell = document.createElement("th");
  rankCell.classList.add("table-data", "rank");
  rankCell.setAttribute("scope", "row");
  rankCell.textContent = tbody?.childElementCount + 1;  
  row?.appendChild(rankCell);

  var nameCell = document.createElement("td");
  nameCell.classList.add("table-data");
  nameCell.innerHTML = `
    <div class="wrapper">
      <img src="${crypto.image}" width="20" height="20" alt="${crypto.name} logo" class="img">
      <h3>
        <a href="#" class="coin-name">${crypto.name} <span class="span">${crypto.symbol.toUpperCase()}</span></a>
      </h3>
    </div>`;
  row?.appendChild(nameCell);

  var lastPriceCell = document.createElement("td");
  lastPriceCell.classList.add("table-data", "last-price");
  lastPriceCell.textContent = `$${crypto.current_price}`;
  row?.appendChild(lastPriceCell);

  var priceChangeCell = document.createElement("td");
  priceChangeCell.classList.add("table-data", "last-update", crypto.price_change_24h >= 0 ? "green" : "red");
  priceChangeCell.textContent = `${crypto.price_change_percentage_24h}%`;
  row?.appendChild(priceChangeCell);

  var marketCapCell = document.createElement("td");
  marketCapCell.classList.add("table-data", "market-cap");
  marketCapCell.textContent = `$${crypto.market_cap}`;
  row?.appendChild(marketCapCell);  

  var chartCell = document.createElement("td");
  var value = crypto.price_change_percentage_24h > 0 ? 1 : 2
  chartCell.classList.add("table-data");
  chartCell.innerHTML = `<img src="./assets/images/chart-${value}.svg" width="100" height="40" alt="chart" class="chart">`;
  row?.appendChild(chartCell);
  
  var tradeCell = document.createElement("td");
  tradeCell.classList.add("table-data");
  tradeCell.innerHTML = `<button class="btn btn-outline">Trade</button>`;
  row?.appendChild(tradeCell);
  
  tbody.appendChild(row);
}