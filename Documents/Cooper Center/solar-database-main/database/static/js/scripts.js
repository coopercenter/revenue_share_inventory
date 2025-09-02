const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu-items');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active'); // animate hamburger
});