import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const inputDateTime = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
const dataDaysRef = document.querySelector('[data-days]');
const dataHoursRef = document.querySelector('[data-hours]');
const dataMinutesRef = document.querySelector('[data-minutes]');
const dataSecondsRef = document.querySelector('[data-seconds]');

let timer = null;
let timeMS = null;
let currentDateMS = null;
let selectDatesMS = null;

btnStartRef.setAttribute('disabled', '');

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const verificationTimer = () => {
  if (timeMS < 0) {
    Report.failure('Please choose a date in the future');
    clearInterval(timer);
    return;
  }
  btnStartRef.removeAttribute('disabled');
};

const updateTimerMarkup = ({ days, hours, minutes, seconds }) => {
  dataDaysRef.textContent = days;
  dataHoursRef.textContent = hours;
  dataMinutesRef.textContent = minutes;
  dataSecondsRef.textContent = seconds;
};

const startTimer = () => {
  timer = setInterval(() => {
    if (timeMS <= 2000) {
      clearInterval(timer);
    }
    btnStartRef.setAttribute('disabled', '');
    inputDateTime.setAttribute('disabled', '');
    currentDateMS = Date.now();
    timeMS = selectDatesMS - currentDateMS;
    const dataTimer = convertMs(timeMS);
    updateTimerMarkup(dataTimer);
  }, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDateMS = Date.now();
    selectDatesMS = selectedDates[0].getTime();
    timeMS = selectDatesMS - currentDateMS;
    verificationTimer();
  },
};

flatpickr('#datetime-picker', options);

btnStartRef.addEventListener('click', startTimer);
