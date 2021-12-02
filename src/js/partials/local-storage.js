import modal from './modal.js';

const STORAGE_KEY = 'saved-movies';
const refs = {
  watchedBtn: document.querySelector('.watchedBtn'),
  queueBtn: document.querySelector('.queueBtn'),
};
const data = {};

refs.watchedBtn.addEventListener('click');
