const storageKey = 'fsaved-movies';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};
const dataForm = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', _.throttle(onInput, 500));
refs.email.addEventListener('input', _.throttle(onInput, 500));

const dataJSON = localStorage.getItem(storageKey);
const savedData = JSON.parse(dataJSON);
populateTextarea();
if (savedData) {
  refs.form['email'].value = savedData.email;
  refs.form['message'].value = savedData.message;
}

refs.form.addEventListener('input', e => {
  dataForm[e.target.name] = e.target.value;
});

function onFormSubmit(e) {
  e.preventDefault();
  dataForm.email = refs.form.email.value;
  dataForm.message = refs.form.message.value;
  console.log(dataForm);
  e.currentTarget.reset();
  storageKey, JSON.parse(localStorage.getItem(storageKey));
  localStorage.removeItem(storageKey);
}

function onInput(e) {
  const formData = {
    email: `${refs.form['email'].value}`,
    message: `${refs.form['message'].value}`,
  };
  const formDataJSON = JSON.stringify(formData);

  localStorage.setItem(storageKey, formDataJSON);
}

function populateTextarea(e) {
  const savedMessage = JSON.parse(localStorage.getItem(storageKey));

  if (savedMessage && savedMessage.message) {
    refs.textarea.value = savedMessage.message;
  }
  if (savedMessage && savedMessage.email) {
    refs.email.value = savedMessage.email;
  }
}
