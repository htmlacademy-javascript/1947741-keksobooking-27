import {COUNTER_ADS, LAT_MIN, LAT_MAX, LNG_MIN, LNG_MAX, TITLES, TYPES, CHECK_TIMES, FEATURES, DESCRIPTIONS, PHOTOS} from './data.js';

//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0 || max < min) {
    return NaN;
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomIntFloatingPoint = (min, max, characterLimit) => {
  if (min < 0 || max < 0 || max < min || characterLimit < 0) {
    return NaN;
  }

  const result = (Math.random() * (max - min) + min).toFixed(characterLimit);
  return result;
};

//Функция возвращает случайное значение из массива
const getRandomElement = (element) => {
  const randomElement = Math.floor(Math.random() * element.length);
  return element[randomElement];
};

//Функция для вывода массива случайной длины из случайных неповторяющихся значений
const getRandomArray = (features) => {
  const maxLengthArray = features.length;
  const lengthOfArray = getRandomIntInclusive(1, maxLengthArray);
  const randomArray = [];

  while (randomArray.length < lengthOfArray) {
    const indexOfElement = getRandomIntInclusive(0, maxLengthArray - 1);
    const element = features[indexOfElement];

    if (!randomArray.includes(element)) {
      randomArray.push(element);
    }
  }
  return randomArray;
};

//Функция для генерации адресов изображений(неповторяющихся)
let number = 0;
const getUniqueImageAddress = () => {
  for (let i = 1; i <= COUNTER_ADS; i++) {
    number += 1;
    if (number < 10) {
      return `img/avatars/user0${number}.png`;
    }
    return `img/avatars/user${number}.png`;
  }
};

//Функция создает одно объявление
const getCreatedAd = () => {
  const xCoordinate = getRandomIntFloatingPoint (LAT_MIN, LAT_MAX, 5);
  const yCoordinate = getRandomIntFloatingPoint(LNG_MIN, LNG_MAX, 5);
  return {
    author: {
      avatar: getUniqueImageAddress(),
    },
    offer: {
      title: getRandomElement(TITLES),
      address: `${xCoordinate}, ${yCoordinate}`,
      price: getRandomIntInclusive(0, 100000),
      type: getRandomElement(TYPES),
      rooms: getRandomIntInclusive(1, 10),
      guests: getRandomIntInclusive(1, 10),
      checkin: getRandomElement(CHECK_TIMES),
      checkout: getRandomElement(CHECK_TIMES),
      features: getRandomArray(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS)
    },
    location: {
      lat: xCoordinate,
      lng: yCoordinate
    }
  };
};

//Функция создает 10 случайных объявлений
export const getCreatedAds = () => Array.from({length: COUNTER_ADS}, getCreatedAd);

//Функция создает сообщение об ошибке
const ALERT_SHOW_TIME = 5000;
export const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};
