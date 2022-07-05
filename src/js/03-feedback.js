import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const FEEDBACK_FORM_STATE_KEY = 'feedback-form-state';

let dataForm = {};

const fillContactForm = () => {
  const serializedState = localStorage.getItem(FEEDBACK_FORM_STATE_KEY);

  dataForm = JSON.parse(serializedState) ?? {};

  const dataFormKeys = Object.keys(dataForm);

  if (serializedState) {
    dataFormKeys.map(key => {
      form.elements[key].value = dataForm[key];
    });
  }
};

const handleFormInput = e => {
  dataForm[e.target.name] = e.target.value;
  localStorage.setItem(FEEDBACK_FORM_STATE_KEY, JSON.stringify(dataForm));
};

const handleContactFormSybmit = e => {
  e.preventDefault();

  localStorage.removeItem(FEEDBACK_FORM_STATE_KEY);

  console.log(dataForm);
  e.currentTarget.reset();
};

fillContactForm();

form.addEventListener('input', throttle(handleFormInput, 500));
form.addEventListener('submit', handleContactFormSybmit);
