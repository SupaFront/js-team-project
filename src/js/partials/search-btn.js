import MoviesFetcher from './fetcher-class';
import template from '/templates/grid-items.hbs';
import markupClass from './markup-creator';
import Notiflix from 'notiflix';
import Paginator from './class-paginator';

const userQueryInput = document.querySelector('input');
const formRef = document.querySelector('form');
const galleryRef = document.querySelector('.film-gallery');
const container = document.getElementById('pagination');
const loader = document.querySelector('#loader');

const moviesFetcher = new MoviesFetcher();
const markupMaker = new markupClass(galleryRef, template, moviesFetcher);
const popularBtnsEl = document.querySelector('.btns-wrapper');

formRef.addEventListener('submit', e => {
  e.preventDefault();
  moviesFetcher.queue = userQueryInput.value;
  userQueryInput.value = '';
  searchMovies();
});

async function searchMovies() {
  markupMaker.clearMarkup();
  popularBtnsEl.remove();
  loader.classList.remove('disappear');
  try {
    const moviesArray = await moviesFetcher.searchMovie();
    markupMaker.createMarkup('beforeend', moviesArray.results);
    const pagination = new Paginator(container, markupMaker, moviesFetcher);
    pagination.paginateSearch(moviesArray.total_results);
    container.classList.remove('hidden')
    container.classList.add('tui-pagination')

  } catch {
    Notiflix.Notify.failure('Nothing is found, please try again');
    container.classList.add('hidden')
    container.classList.remove('tui-pagination')
  } finally {
    loader.classList.add('disappear');

  }
}
