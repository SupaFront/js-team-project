import { save, load, remove } from './local-storage-functions';
import filmTemplate from '/templates/grid-items.hbs';
import MarkupCreator from './markup-creator';
import MoviesFetcher from './fetcher-class';
import Paginator from './class-paginator';

const container = document.getElementById('pagination');
const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');
const galleryRef = document.querySelector('.film-gallery');
const moviesFetcher = new MoviesFetcher();

const markup = new MarkupCreator(galleryRef, filmTemplate, moviesFetcher);

watchedBtn.addEventListener('click', () => {
  loadLibrary('watched');
});
queueBtn.addEventListener('click', () => {
  loadLibrary('queue');
});

function loadLibrary(q) {
  markup.clearMarkup();
  container.innerHTML = '';
  if (load(q) !== undefined) {
    markup.createMarkup('beforeend', load(q));
    const pagination = new Paginator(container, markup, moviesFetcher, q);
    pagination.paginateLib(load(q).length);
  }
}

loadLibrary('watched');
