'use strict';

const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');

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
console.log(watchedBtn);

function onQueueClick(e) {
  e.target.setAttribute('disabled', '');
  if (e.target.classList.contains('active')) {
    return;
  }

  e.target.classList.add('active');
  queueBtn.removeAttribute('disabled');
  watchedBtn.classList.remove('active');
}
console.log(queueBtn);
