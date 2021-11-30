import MoviesFetcher from './fetcher-class';
import template from '/templates/grid-items.hbs';
import markupClass from './markup-creator';
import { Notify } from 'notiflix';

const moviesFetcher = new MoviesFetcher();
const galleryRef = document.querySelector('.film-gallery');
const markupMaker = new markupClass(galleryRef, template, moviesFetcher);

async function loadTrending() {
  try {
    const movieArray = await moviesFetcher.getTrending();
    markupMaker.createMarkup('beforeend', movieArray);
  } catch (e) {
    Notify.failure(`Something went wrong ${e}`);
  }
}

loadTrending();
