import '~styles/global.scss';
import '~styles/global.css';

document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('#year');

  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }
});
