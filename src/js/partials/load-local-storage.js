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

watchedBtn.addEventListener('click', event => {
  markup.clearMarkup();
  container.innerText = '';
  if (load('watched') !== undefined) {
    markup.createMarkup('beforeend', load('watched'));
    const pagination = new Paginator(container, markup, moviesFetcher, 'watched');
    pagination.paginateLib(load('watched').length);
  }
});
queueBtn.addEventListener('click', event => {
  markup.clearMarkup();
  container.innerText = '';
  if (load('queue') !== undefined) {
    markup.createMarkup('beforeend', load('queue'));
    const pagination = new Paginator(container, markup, moviesFetcher, 'queue');
    pagination.paginateLib(load('queue').length);
  }
});

if (load('watched') !== undefined) {
  markup.createMarkup('beforeend', load('watched'));
  const pagination = new Paginator(container, markup, moviesFetcher, 'watched');
  pagination.paginateLib(load('watched').length);
}
