import MoviesFetcher from './fetcher-class';
import template from '/templates/grid-items.hbs';

const moviesFetcher = new MoviesFetcher();
const galleryRef = document.querySelector('.film-gallery');

async function loadTrending() {
  const arr = await moviesFetcher.getTrending();
  galleryRef.insertAdjacentHTML('beforeend', template(arr));
}

loadTrending();
