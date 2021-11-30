import MoviesFetcher from './fetcher-class';
import template from '/templates/grid-items.hbs';

const searchBtnRef = document.querySelector('.btn');
const userQuery = document.querySelector('input');
const formRef = document.querySelector('form');
const galleryRef = document.querySelector('.film-gallery');

const fetcherInstance = new MoviesFetcher();

formRef.addEventListener('submit', e => {
  e.preventDefault();
  fetcherInstance.queue = userQuery.value;
  userQuery.value = '';
  searchMovies();
});

fetcherInstance.openModal(312132);

async function searchMovies() {
  const arr = await fetcherInstance.searchMovie();

  galleryRef.insertAdjacentHTML('beforeend', template(arr)); // дальше рисовать маркап по этому объекту
}
