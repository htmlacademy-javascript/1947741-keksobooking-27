import { showAlert } from './alert-message.js';

// export const getData = (onSuccess) => {
//   fetch('https://27.javascript.pages.academy/keksobooking/data')
//     .then((response) => response.json())
//     .then((otherAds) => {
//       onSuccess(otherAds);
//     })
//     .catch(() => {
//       showAlert('Не получилось загрузить данные с сервера. Попробуйте перезагрузить страницу');
//     });
// };

// export const sendData = (onSuccess, onFail, body) => {
//   fetch(
//     'https://27.javascript.pages.academy/keksobooking',
//     {
//       method: 'POST',
//       body: body,
//     },
//   )
//     .then((response) => {
//       if(response.ok) {
//         onSuccess();
//       } else {
//         onFail();
//       }
//     })
//     .catch(() => {
//       onFail('Не удалось отправить форму. Попробуйте ещё раз');
//     });
// };

export const getData = async () => {
  try {
    const response = await fetch('https://27.javascript.pages.academy/keksobooking/data');
    const otherAds = await response.json();
    return otherAds;
  } catch(error) {
    showAlert('Не получилось загрузить данные с сервера. Попробуйте перезагрузить страницу');
    return [];
  }
};

export const sendData = async (body) => {
  try {
    const response = await fetch(
      'https://27.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: body,
      },
    );
    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result;
  } catch(error) {
    return false;
  }
};
