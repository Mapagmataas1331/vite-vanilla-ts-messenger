import '@/styles/global.scss';
import '@/styles/global.css';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const year = document.querySelector('#year');

  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }
});
