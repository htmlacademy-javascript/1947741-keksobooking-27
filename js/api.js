import { showAlert } from './util.js';

export const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((otherAds) => {
      onSuccess(otherAds);
    })
    .catch(() => {
      showAlert('Не получилось загрузить данные с сервера. Попробуйте перезагрузить страницу');
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};
