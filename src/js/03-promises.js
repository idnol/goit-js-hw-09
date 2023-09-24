document.querySelector('.form').addEventListener('submit', function(e) {
  e.preventDefault();
  const amount = +document.querySelector('input[name="amount"]').value;
  let delay = +document.querySelector('input[name="delay"]').value;
  const step = +document.querySelector('input[name="step"]').value;
  for (let i = 1; i < amount; i++) {
    if (i > 1) {
      delay += step;
    }
    createPromise(i, delay);
  }
})

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    setTimeout(function() {
      return Promise.resolve(`✅ Fulfilled promise ${position} in ${delay}ms`).then(value => console.log(value));
    }, delay);
  } else {
    setTimeout(function() {
      return Promise.reject(`❌ Rejected promise ${position} in ${delay}ms`).then(value => console.log(value));
    }, delay)
  }
}