'use strict';

const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');
const emptyPage = document.querySelector('.empty-page');
const filledPage = document.querySelector('.filled');
const hidden = document.querySelector('.hide-content');

watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);

function onWatchedClick(e) {
  e.target.setAttribute('disabled', '');
  if (e.target.classList.contains('active')) {
    return;
  }

  e.target.classList.add('active');

  watchedBtn.removeAttribute('disabled');
  queueBtn.classList.remove('active');
}

function onQueueClick(e) {
  e.target.setAttribute('disabled', '');
  if (e.target.classList.contains('active')) {
    return;
  }
  e.target.classList.add('active');
  queueBtn.removeAttribute('disabled');
  watchedBtn.classList.remove('active');
}

function hideText(e) {}
console.log(filledPage);
console.log(hidden);
hideText();
