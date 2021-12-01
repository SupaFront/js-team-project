import markupClass from './markup-creator';
import MoviesFetcher from './fetcher-class';
import filmTemplate from '../../templates/modal-item.hbs';
import { save, load, remove } from './local-storage-functions';

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
  openModal(filmObj);
}

function openModal(obj) {
  modalBackdropEl.classList.remove('is-hidden');

  // Бэкдроп не скролится
  const bodyEl = document.querySelector('body');
  bodyEl.style.overflow = 'hidden';
  // Конец

  window.addEventListener('keydown', closeModalByEsc);
  closeModalBtn.addEventListener('click', closeModal);
  modalBackdropEl.addEventListener('click', closeModalByBackdrop);

  // Для кнопок внутри модалки
  const watchedBtn = cardContainerEl.querySelector('.watched');
  watchedBtn.filmObj = obj;
  watchedBtn.addEventListener('click', saveToWatched);
  watchedCheckFn(obj, watchedBtn);

  const queueBtn = cardContainerEl.querySelector('.queue');
  queueBtn.filmObj = obj;
  queueBtn.addEventListener('click', saveToQueue);
  queueCheckFn(obj, queueBtn);

  // Конец
}

// Закрытие модалки
function closeModal() {
  modalBackdropEl.classList.add('is-hidden');
  filmMarkup.clearMarkup();

  window.removeEventListener('keydown', closeModalByEsc);
  closeModalBtn.removeEventListener('click', closeModal);
  modalBackdropEl.removeEventListener('click', closeModalByBackdrop);

  const bodyEl = document.querySelector('body');
  bodyEl.style.overflow = 'auto';
}

function closeModalByEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function closeModalByBackdrop(evt) {
  if (!evt.target.classList.contains('modal-backdrop')) {
    return;
  }
  closeModal();
}
// Конец

// Логика для кнопки watched
function saveToWatched(evt) {
  let localStorageArray = [];
  const localStorageParsed = load('watched');
  const filmObj = evt.currentTarget.filmObj;
  const button = evt.currentTarget;
  button.addEventListener('click', removeFromWatched);
  button.removeEventListener('click', saveToWatched);

  if (!localStorageParsed) {
    localStorageArray.push(filmObj);
    save('watched', localStorageArray);
    button.textContent = `Remove from watched`;
    return;
  }

  if (localStorageParsed.find(elem => elem.id === filmObj.id)) {
    return;
  }

  localStorageArray = localStorageParsed;
  localStorageArray.push(filmObj);
  save('watched', localStorageArray);
  button.textContent = `Remove from watched`;
}

function watchedCheckFn(filmObj, button) {
  const watchedArrayParsed = load('watched');

  if (!watchedArrayParsed) {
    return;
  }

  if (watchedArrayParsed.find(elem => elem.id === filmObj.id)) {
    button.textContent = 'Remove from watched';
    button.addEventListener('click', removeFromWatched);
    button.removeEventListener('click', saveToWatched);

    return;
  }
}

function removeFromWatched(evt) {
  const localStorageParsed = load('watched');
  const filmObj = evt.currentTarget.filmObj;
  const button = evt.currentTarget;
  button.addEventListener('click', saveToWatched);
  button.removeEventListener('click', removeFromWatched);

  if (localStorageParsed.length === 1) {
    remove('watched');
  }

  if (localStorageParsed.find(elem => elem.id === filmObj.id)) {
    button.textContent = 'Remove from watched';
    const index = localStorageParsed.findIndex(item => item.id === filmObj.id);
    localStorageParsed.splice(index, 1);
    save('watched', localStorageParsed);
    button.textContent = 'Add to watched';
  }
}
// Конец

// Логика для кнопки queue
function saveToQueue(evt) {
  let localStorageArray = [];
  const localStorageParsed = load('queue');
  const filmObj = evt.currentTarget.filmObj;
  const button = evt.currentTarget;
  button.addEventListener('click', removeFromQueue);
  button.removeEventListener('click', saveToQueue);

  if (!localStorageParsed) {
    localStorageArray.push(filmObj);
    save('queue', localStorageArray);
    button.textContent = `Remove from queue`;
    return;
  }

  if (localStorageParsed.find(elem => elem.id === filmObj.id)) {
    return;
  }

  localStorageArray = localStorageParsed;
  localStorageArray.push(filmObj);
  save('queue', localStorageArray);
  button.textContent = `Remove from queue`;
}

// Логика для проверки локального хранилища
function watchedCheckFn(filmObj, button) {
  const watchedArrayParsed = load('watched');

  if (!watchedArrayParsed) {
    return;
  }

  if (watchedArrayParsed.find(elem => elem.id === filmObj.id)) {
    button.textContent = 'Already added to watched';
    button.addEventListener('click', removeFromWatched);

    return;
  }
}

function queueCheckFn(filmObj, button) {
  const queueArrayParsed = load('queue');

  if (!queueArrayParsed) {
    return;
  }

  if (queueArrayParsed.find(elem => elem.id === filmObj.id)) {
    button.textContent = 'Remove from queue';
    button.addEventListener('click', removeFromQueue);
    button.removeEventListener('click', saveToQueue);
    return;
  }
}
function removeFromWatched(evt) {
  const localStorageParsed = load('watched');
  const filmObj = evt.currentTarget.filmObj;
  const button = evt.currentTarget;

  if (localStorageParsed.length === 1) {
    remove('watched');
  }

  if (localStorageParsed.find(elem => elem.id === filmObj.id)) {
    button.textContent = 'Already added to watched';
    const index = localStorageParsed.findIndex(item => item.id === filmObj.id);
    localStorageParsed.splice(index, 1);
    save('watched', localStorageParsed);
    button.textContent = 'Add to watched';
  }
}

function removeFromQueue(evt) {
  const localStorageParsed = load('queue');
  const filmObj = evt.currentTarget.filmObj;
  const button = evt.currentTarget;
  button.addEventListener('click', saveToQueue);
  button.removeEventListener('click', removeFromQueue);

  if (localStorageParsed.length === 1) {
    remove('queue');
  }

  if (localStorageParsed.find(elem => elem.id === filmObj.id)) {
    button.textContent = 'Remove from queue';
    const index = localStorageParsed.findIndex(item => item.id === filmObj.id);
    localStorageParsed.splice(index, 1);
    save('queue', localStorageParsed);
    button.textContent = 'Add to queue';
  }
}
// Конец
