import MoviesFetcher from './fetcher-class';
import template from '/templates/grid-items.hbs';
import markupClass from './markup-creator';
import { Notify } from 'notiflix';
import Paginator from './class-paginator';

//добавить конст кнопок
const galleryRef = document.querySelector('.film-gallery');
const container = document.getElementById('pagination');
const moviesFetcher = new MoviesFetcher();
const btnPopularByDay = document.querySelector('.js-by-day');
const btnPopularByWeek = document.querySelector('.js-by-week');

const markupMaker = new markupClass(galleryRef, template, moviesFetcher);

async function loadTrending(timeWindow) {
  markupMaker.clearMarkup();
  try {
    moviesFetcher.timeWindow = timeWindow;
    const movieArray = await moviesFetcher.getTrending();
    markupMaker.createMarkup('beforeend', movieArray.results);
    const pagination = new Paginator(container, markupMaker, moviesFetcher);
    pagination.paginateTrending(movieArray.total_results);
  } catch (e) {
    Notify.failure(`Something went wrong ${e}`);
  }
}

btnPopularByWeek.addEventListener('click', e => {
  loadTrending('week')
})

btnPopularByDay.addEventListener('click', e => {
  loadTrending('day')
})

loadTrending('day');
