(() => {
  const refs = {
    openModalBtn: document.querySelector('.students-link'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    bodyEl: document.querySelector('body')
  };


  function openModal() {
    refs.modal.classList.remove('is-hidden');
    refs.modal.classList.add('show');
    const bodyEl = document.querySelector('body');
    bodyEl.style.overflow = 'hidden';
  }

function closeModal() {
  refs.modal.classList.add('is-hidden');
    refs.modal.classList.remove('show');
  const bodyEl = document.querySelector('body');
  bodyEl.style.overflow = '';
}

refs.modal.addEventListener('click', (e) => {
  if (e.target === refs.modal) {
      closeModal();
  }
});


document.addEventListener('keydown', (e) => {
  if (e.code === "Escape") { 
      closeModal();
  }
});

  refs.openModalBtn.addEventListener('click', openModal);
  refs.closeModalBtn.addEventListener('click', closeModal);


  // function closeModalByEsc(evt) {
  //   if (evt.code === 'Escape') {
  //     closeModal();
  //   }
  // }


  // function closeModalByBackdrop(evt) {
  //   if (!evt.target.classList.contains('modal-backdrop')) {
  //     return;
  //   }
  //   closeModal();
  // }
})();


// const showDialog = () => {
//   document.getElementById('dialog').classList.add('show');
//   const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
//   const body = document.body;
// };
// const closeDialog = () => {
//   const body = document.body;
//   const scrollY = body.style.top;
//   body.style.position = '';
//   body.style.top = '';
//   window.scrollTo(0, parseInt(scrollY || '0') * -1);
//   document.getElementById('dialog').classList.remove('show');
// };
// window.addEventListener('scroll', () => {
//   document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
// });

// //hok
