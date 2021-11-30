'use strict';

const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');

watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);

function onWatchedClick(e) {
  e.target.setAttribute('disabled', '');
  watchedBtn.style.backgroundColor = '#ff6b01';
  watchedBtn.removeAttribute('disabled');
}
console.log(watchedBtn);

function onQueueClick(e) {
  e.target.setAttribute('disabled', '');
  queueBtn.style.backgroundColor = '#ff6b01';
  queueBtn.removeAttribute('disabled');
}
console.log(queueBtn);
// refs.start.addEventListener('click', disableStart);
// refs.stop.addEventListener('click', disableStop);

// function disableStart(e) {
//   e.target.setAttribute('disabled', '');
//   refs.stop.removeAttribute('disabled');

//   refs.timer = refs.body.style.backgroundColor = getRandomHexColor();
//   //color changes every second
//   refs.timer = setInterval(() => {
//     refs.body.style.backgroundColor = getRandomHexColor();
//   }, 1000);
//   //console.log('start');
// }

// function disableStop(e) {
//   e.target.setAttribute('disabled', '');
//   refs.start.removeAttribute('disabled');
//   clearInterval(refs.timer);
//   //console.log('stop');
// }
