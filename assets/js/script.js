'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    //elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeHeader);



/**
 * toggle active on add to fav
 */

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

addEventOnElem(addToFavBtns, "click", toggleActive);


/**
 * market
 */

document.addEventListener('DOMContentLoaded', function() {
  // Seletor do elemento de link
  const link = document.querySelector('[data-nav-link]');

  // Seletor da seção de destino
  const section = document.querySelector('.market');

  // Adicionando evento de clique ao link
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do link

    // Obtendo a posição vertical da seção
    const sectionPosition = section.offsetTop;

    // Rolando a página até a posição da seção
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth' // Rolagem suave
    });
  });
});

/**
 * scroll revreal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.5) {
      sections[i].classList.add("active");
    } else {
      sections[i].classList.remove("active");
    }
  }
}
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

  // Adiciona botão de favorito
  var favoriteCell = document.createElement("td");
  favoriteCell.classList.add("table-data");
  favoriteCell.innerHTML = `
    <button class="add-to-fav" aria-label="Add to favourite" data-add-to-fav>
      <ion-icon name="star-outline" aria-hidden="true" class="icon-outline"></ion-icon>
      <ion-icon name="star" aria-hidden="true" class="icon-fill"></ion-icon>
    </button>`;
  row?.appendChild(favoriteCell);

  // Adiciona número de classificação
  var rankCell = document.createElement("th");
  rankCell.classList.add("table-data", "rank");
  rankCell.setAttribute("scope", "row");
  rankCell.textContent = tbody?.childElementCount + 1; // Obtém o número de linhas atualmente na tabela e adiciona 1 para a classificação
  row?.appendChild(rankCell);

  // Adiciona nome da moeda e símbolo
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

  // Adiciona último preço
  var lastPriceCell = document.createElement("td");
  lastPriceCell.classList.add("table-data", "last-price");
  lastPriceCell.textContent = `$${crypto.current_price}`;
  row?.appendChild(lastPriceCell);

  // Adiciona variação de preço (24h)
  var priceChangeCell = document.createElement("td");
  priceChangeCell.classList.add("table-data", "last-update", crypto.price_change_24h >= 0 ? "green" : "red");
  priceChangeCell.textContent = `${crypto.price_change_percentage_24h}%`;
  row?.appendChild(priceChangeCell);

  // Adiciona capitalização de mercado
  var marketCapCell = document.createElement("td");
  marketCapCell.classList.add("table-data", "market-cap");
  marketCapCell.textContent = `$${crypto.market_cap}`;
  row?.appendChild(marketCapCell);  

  // Adiciona gráfico de desempenho
  var chartCell = document.createElement("td");
  var value = crypto.price_change_percentage_24h > 0 ? 1 : 2
  chartCell.classList.add("table-data");
  chartCell.innerHTML = `<img src="./assets/images/chart-${value}.svg" width="100" height="40" alt="chart" class="chart">`;
  row?.appendChild(chartCell);
  
  // Adiciona botão de negociação
  var tradeCell = document.createElement("td");
  tradeCell.classList.add("table-data");
  tradeCell.innerHTML = `<button class="btn btn-outline">Trade</button>`;
  row?.appendChild(tradeCell);
  
  // Adiciona a linha preenchida à tabela
  tbody.appendChild(row);
}


scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);