(() => {
  const refs = {
    openModalBtn: document.querySelector('.students-link'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);


  const bodyEl = document.querySelector('body');
  bodyEl.style.overflow = 'hidden';

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

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
