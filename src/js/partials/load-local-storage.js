import { save, load, remove } from './local-storage-functions';
import filmTemplate from '/templates/grid-items.hbs';
import MarkupCreator from './markup-creator';
import MoviesFetcher from './fetcher-class';

const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');
const galleryRef = document.querySelector('.film-gallery')
const moviesFetcher = new MoviesFetcher()

const markup = new MarkupCreator(galleryRef, filmTemplate, moviesFetcher)


    watchedBtn.addEventListener('click', (event) => {
        markup.clearMarkup()
        markup.createMarkup('beforeend', load('watched'))
    })
    queueBtn.addEventListener('click', (event) => {
        markup.clearMarkup()
        markup.createMarkup('beforeend', load('queue'))

    })



    markup.createMarkup('beforeend', load('watched'))
