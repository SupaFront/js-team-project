import MoviesFetcher from './fetcher-class';
import template from '/templates/grid-items.hbs';
import markupClass from './markup-creator';

const moviesFetcher = new MoviesFetcher();
const galleryRef = document.querySelector('.film-gallery');
const markupMaker = new markupClass(galleryRef, template, moviesFetcher);

async function loadTrending() {
  const movieArray = await moviesFetcher.getTrending();
  markupMaker.createMarkup('beforeend', movieArray);
}

loadTrending();
