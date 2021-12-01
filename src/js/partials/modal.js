import markupClass from './markup-creator';
import MoviesFetcher from './fetcher-class';
import filmTemplate from '../../templates/modal-item.hbs';
import { save, load } from './local-storage';

const galleryRef = document.querySelector('.film-gallery');
const modalBackdropEl = document.querySelector('.modal-backdrop');
const closeModalBtn = document.querySelector('.modal-cls-btn');
const cardContainerEl = document.querySelector('.card-container');

const fetchFilm = new MoviesFetcher();
const filmMarkup = new markupClass(cardContainerEl, filmTemplate, fetchFilm);

// Логика для модалки
galleryRef.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    const filmId = e.target.dataset.id;
    fetchFilmById(filmId);
  }
});

async function fetchFilmById(id) {
  const filmObj = await fetchFilm.openModal(id);
  filmMarkup.createMarkup('beforeend', filmObj);
  openModal(id);
}

function openModal(id) {
  modalBackdropEl.classList.remove('is-hidden');

  window.addEventListener('keydown', closeModalByEsc);
  closeModalBtn.addEventListener('click', closeModal);
  // modalBackdropEl.addEventListener('click', closeModal);

  // Для кнопок внутри модалки
  const watchedBtn = cardContainerEl.querySelector('.watched');
  watchedBtn.filmId = id;
  watchedBtn.localStorageKey = 'watched';
  watchedBtn.addEventListener('click', saveToLocalStorage);

  const queueBtn = cardContainerEl.querySelector('.queue');
  queueBtn.filmId = id;
  queueBtn.localStorageKey = 'queue';
  queueBtn.addEventListener('click', saveToLocalStorage);
  // Конец
}

function closeModal() {
  modalBackdropEl.classList.add('is-hidden');
  filmMarkup.clearMarkup();

  window.removeEventListener('keydown', closeModalByEsc);
  closeModalBtn.removeEventListener('click', closeModal);
}

function closeModalByEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}
// Конец

// Логика для кнопок внутри модалки
function saveToLocalStorage(evt) {
  const localStorageKey = evt.currentTarget.localStorageKey;
  let localStorageArray = [];
  const localStorageParsed = load(localStorageKey);
  const filmId = evt.currentTarget.filmId;

  if (!localStorageParsed) {
    localStorageArray.push(filmId);
    save(localStorageKey, localStorageArray);
    return;
  }

  if (localStorageParsed.includes(filmId)) {
    alert('Такой фильм уже добавлен!');
    return;
  }

  localStorageArray = localStorageParsed;
  localStorageArray.push(filmId);
  save(localStorageKey, localStorageArray);
}
// Конец
