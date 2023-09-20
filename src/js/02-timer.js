import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css";

let defaultDate = {};
let globalTime = 0;

const refs = {
  button: document.querySelector('button'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]')
}
refs.button.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    defaultDate = convertMs(selectedDates[0] - options.defaultDate)
    if (options.defaultDate < selectedDates[0]) {
      refs.button.removeAttribute('disabled');
      globalTime = selectedDates[0] - options.defaultDate;
    } else {
      refs.button.setAttribute('disabled', 'true');
    }
  }
};

flatpickr('#datetime-picker', options);

document.querySelector('button').addEventListener('click', function() {
  refs.days.textContent = defaultDate.days.toString().padStart(2, '0');
  refs.hours.textContent = defaultDate.hours.toString().padStart(2, '0');
  refs.minutes.textContent = defaultDate.minutes.toString().padStart(2, '0');
  refs.seconds.textContent = defaultDate.seconds.toString().padStart(2, '0');

  const interval = setInterval(function() {
    globalTime -= 1000;
    let newValue = convertMs(globalTime);
    refs.days.textContent = newValue.days.toString().padStart(2, '0');
    refs.hours.textContent = newValue.hours.toString().padStart(2, '0');
    refs.minutes.textContent = newValue.minutes.toString().padStart(2, '0');
    refs.seconds.textContent = newValue.seconds.toString().padStart(2, '0');
    if (globalTime <= 1000) {
      clearInterval(interval);
    }
  }, 1000);
})

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}