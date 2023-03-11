import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const inputDatetime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const countdownTimer = document.querySelector('.timer');
const numberOfDays = document.querySelector('span[data-days]');
const numberOfHours = document.querySelector('span[data-hours]');
const numberOfMinutes = document.querySelector('span[data-minutes]');
const numberOfSeconds = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please select the reguired date and time!');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDatetime, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const numberOfDays = Math.floor(ms / day);
  const numberOfHours = Math.floor((ms % day) / hour);
  const numberOfMinutes = Math.floor(((ms % day) % hour) / minute);
  const numberOfSeconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { numberOfDays, numberOfHours, numberOfMinutes, numberOfSeconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(inputDatetime.value) - new Date();

    startBtn.disabled = true;

    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      countdownTimer.style.color = 'blue';

      numberOfDays.textContent = addLeadingZero(timeObject.numberOfDays);
      numberOfHours.textContent = addLeadingZero(timeObject.numberOfHours);
      numberOfMinutes.textContent = addLeadingZero(timeObject.numberOfMinutes);
      numberOfSeconds.textContent = addLeadingZero(timeObject.numberOfSeconds);

      if (countdown <= 10000) {
          countdownTimer.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
        countdownTimer.style.color = 'black';
      clearInterval(timer);
    }
  }, 1000);
});


