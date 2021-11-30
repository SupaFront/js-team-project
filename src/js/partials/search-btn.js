import MoviesFetcher from './fetcher-class';
import template from '/templates/grid-items.hbs';
import markupClass from './markup-creator';

const userQueryInput = document.querySelector('input');
const formRef = document.querySelector('form');
const galleryRef = document.querySelector('.film-gallery');
const moviesFetcher = new MoviesFetcher();
const markupMaker = new markupClass(galleryRef, template, moviesFetcher);

formRef.addEventListener('submit', e => {
  e.preventDefault();
  moviesFetcher.queue = userQueryInput.value;
  userQueryInput.value = '';
  searchMovies();
});

async function searchMovies() {
  const moviesArray = await moviesFetcher.searchMovie();
  console.log(moviesArray);
  markupMaker.clearMarkup();
  markupMaker.createMarkup('beforeend', moviesArray);
  // дальше рисовать маркап по этому объекту
}
