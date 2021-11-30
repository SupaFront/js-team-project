import markupClass from './markup-creator';
import MoviesFetcher from './fetcher-class';
import filmTemplate from '../../templates/modal-item.hbs';

const galleryRef = document.querySelector('.film-gallery');
const modalBackdropEl = document.querySelector('.modal-backdrop');
const modalEl = document.querySelector('.modal-container');
const closeModalBtn = document.querySelector('.modal-cls-btn');
const cardContainerEl = document.querySelector('.card-container');
const fetchFilm = new MoviesFetcher();
const filmMarkup = new markupClass(cardContainerEl, filmTemplate, fetchFilm);

// async function onCardClick() {}

// function backdropOpenFn() {
//   modalBackdropEl.classList.remove('is-hidden');
// }

// function backdropCloseFn() {
//   modalBackdropEl.classList.add('is-hidden');
// }

// function renderFilmCardFn(object) {
//   cardContainerEl.innerHTML = filmTemplate(object);
// }

galleryRef.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    const filmId = e.target.dataset.id;
    fetchFilmById(filmId);
  }
});

async function fetchFilmById(id) {
  const filmObj = await fetchFilm.openModal(id);
  filmMarkup.createMarkup('beforeend', filmObj);
  openModal();
}

function openModal() {
  modalBackdropEl.classList.remove('is-hidden');
}

function closeModal() {
  modalBackdropEl.classList.add('is-hidden');
}
