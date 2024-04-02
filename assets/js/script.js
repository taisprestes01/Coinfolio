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

async function populateTable() {
  const cryptoData = await fetchData();
  if (cryptoData) {
      const tableBody = document.getElementById('crypto-table-body');
      cryptoData.forEach(crypto => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${crypto.market_cap_rank}</td>
              <td>${crypto.name}</td>
              <td>$${crypto.current_price}</td>
              <td>${crypto.price_change_percentage_24h}%</td>
              <td>$${crypto.market_cap}</td>
          `;
          tableBody.appendChild(row);
      });
  }
}

populateTable();
scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);