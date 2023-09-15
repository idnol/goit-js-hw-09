const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]')
};

refs.start.addEventListener('click', onChange);

function onChange() {
  this.setAttribute('disabled', true);
  document.querySelector('body').style.background = getRandomHexColor();
  const timerId = setInterval(function() {
    document.querySelector('body').style.background = getRandomHexColor();
  }, 1000);
  refs.stop.addEventListener('click', function() {
    refs.start.removeAttribute('disabled');
    clearInterval(timerId);
  });
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
