import MoviesFetcher from './fetcher-class';
import template from '/templates/grid-items.hbs';
import markupClass from './markup-creator';
import Notiflix from 'notiflix';

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
  markupMaker.clearMarkup();
  try {
    const moviesArray = await moviesFetcher.searchMovie();
    markupMaker.createMarkup('beforeend', moviesArray);
  } catch {
    Notiflix.Notify.failure('Nothing is found, please try again');
  }
}
