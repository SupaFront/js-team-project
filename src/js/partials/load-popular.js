import MoviesFetcher from './fetcher-class';
import template from '/templates/grid-items.hbs';
import markupClass from './markup-creator';
import { Notify } from 'notiflix';
import Paginator from './class-paginator';

const moviesFetcher = new MoviesFetcher();
const galleryRef = document.querySelector('.film-gallery');
const container = document.getElementById('pagination');
    const loader = document.querySelector('#loader');

const markupMaker = new markupClass(galleryRef, template, moviesFetcher);

async function loadTrending() {

  try {

    const movieArray = await moviesFetcher.getTrending();
    markupMaker.createMarkup('beforeend', movieArray.results);
    const pagination = new Paginator(container, markupMaker, moviesFetcher);
    pagination.paginateTrending(movieArray.total_results);
  } catch (e) {
    Notify.failure(`Something went wrong ${e}`);

  } finally {
    loader.classList.add('disappear')

  }
}

loadTrending();
