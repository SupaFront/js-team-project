import { save, load, remove } from './local-storage-functions';
import filmTemplate from '/templates/grid-items.hbs';
import MarkupCreator from './markup-creator';
import MoviesFetcher from './fetcher-class';
import Paginator from './class-paginator';

const container = document.getElementById('pagination');
const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');
const galleryRef = document.querySelector('.film-gallery');
const text = document.querySelector('.empty-page');

const moviesFetcher = new MoviesFetcher();
const markup = new MarkupCreator(galleryRef, filmTemplate, moviesFetcher);

let currentQ = 'watched';

watchedBtn?.addEventListener('click', () => {
  currentQ = 'watched';
  loadFromStorage();
});

queueBtn?.addEventListener('click', () => {
  currentQ = 'queue';
  loadFromStorage();
});

function loadFromStorage() {
  markup.clearMarkup();
  container.innerHTML = '';
  if (load(currentQ) !== undefined) {
    markup.createMarkup('beforeend', load(currentQ));
    const pagination = new Paginator(container, markup, moviesFetcher, currentQ);
    pagination.paginateLib(load(currentQ).length);
    text?.classList.add('hide-content');
  } else {
    text?.classList.remove('hide-content');
  }
}

loadFromStorage();
export default loadFromStorage;
