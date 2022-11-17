import { showAlert } from './alert-message.js';

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

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return false;
    }

  } catch(error) {
    return false;
  }
};
