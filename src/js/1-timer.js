import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
import 'izitoast/dist/css/iziToast.min.css';

const btnTimerStart = document.querySelector('[data-start]');
const timerFieldDays = document.querySelector('[data-days]');
const timerFielHours = document.querySelector('[data-hours]');
const timerFieldMinutes = document.querySelector('[data-minutes]');
const timerFieldSeconds = document.querySelector('[data-seconds]');
const timerInput = document.querySelector('#datetime-picker');

btnTimerStart.disabled = true;
let timerId = null;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      btnTimerStart.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      btnTimerStart.disabled = true;
      iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    }
  },
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function onTimerStart() {
  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = userSelectedDate - startTime;
    btnTimerStart.disabled = true;
    timerInput.disabled = true;
    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimerFace(convertMs(countdown));
  }, 1000);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  timerFieldDays.textContent = addLeadingZero(days);
  timerFielHours.textContent = addLeadingZero(hours);
  timerFieldMinutes.textContent = addLeadingZero(minutes);
  timerFieldSeconds.textContent = addLeadingZero(seconds);
}

btnTimerStart.addEventListener('click', onTimerStart);

const flt = flatpickr('#datetime-picker', options);
