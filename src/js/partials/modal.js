import markupClass from './markup-creator';
import MoviesFetcher from './fetcher-class';
import filmTemplate from '../../templates/modal-item.hbs';

const galleryRef = document.querySelector('.film-gallery');
const modalBackdropEl = document.querySelector('.modal-backdrop');
const closeModalBtn = document.querySelector('.modal-cls-btn');
const cardContainerEl = document.querySelector('.card-container');
const fetchFilm = new MoviesFetcher();
const filmMarkup = new markupClass(cardContainerEl, filmTemplate, fetchFilm);

galleryRef.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    const filmId = e.target.dataset.id;
    fetchFilmById(filmId);
  }
});

async function fetchFilmById(id) {
  const filmObj = await fetchFilm.openModal(id);
  filmMarkup.createMarkup('beforeend', filmObj);
  console.log(filmObj);
  openModal();
}

function openModal() {
  modalBackdropEl.classList.remove('is-hidden');
  window.addEventListener('keydown', closeModalByEsc);
}

function closeModal() {
  modalBackdropEl.classList.add('is-hidden');
  window.removeEventListener('keydown', closeModalByEsc);
  filmMarkup.clearMarkup();
}

function closeModalByEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

closeModalBtn.addEventListener('click', closeModal);
