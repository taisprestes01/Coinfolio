'use strict';

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

navbarLinks.forEach(link => {
  link.addEventListener("click", closeNavbar);
});

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", activeHeader);

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

addToFavBtns.forEach(btn => {
  btn.addEventListener("click", toggleActive);
});

document.addEventListener('DOMContentLoaded', function() {
  const link = document.querySelector('[data-nav-link]');

  const section = document.querySelector('.market');

  link.addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do link

    const sectionPosition = section.offsetTop;

    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth' // Rolagem suave
    });
  });
});

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

scrollReveal();

window.addEventListener("scroll", scrollReveal);
