const modalBackdropEl = document.querySelector('.modal-backdrop');
const modalEl = document.querySelector('.modal-container');
const closeModalBtn = document.querySelector('.modal-cls-btn');
const cardContainerEl = document.querySelector('.card-container');

async function onCardClick(evt) {}

function backdropOpenFn() {
  modalBackdropEl.classList.remove('is-hidden');
}

function backdropCloseFn() {
  modalBackdropEl.classList.add('is-hidden');
}

function renderFilmCardFn(object) {
  cardContainerEl.innerHTML = filmTemplate(object);
}
