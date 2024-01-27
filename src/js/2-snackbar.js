import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(e) {
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });
  return promise;
}

function submitHandler(e) {
  e.preventDefault();
  const promise = createPromise();
  promise.then(
    value => {
      iziToast.success({
        icon: '',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    },
    reason => {
      iziToast.error({
        icon: '',
        position: 'topRight',
        message: `❌ Rejected promise in ${reason}ms`,
      });
    }
  );
}

form.addEventListener('submit', submitHandler);
