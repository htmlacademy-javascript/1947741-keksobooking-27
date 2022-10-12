import {getRandomIntInclusive, getRandomIntFloatingPoint, getRandomElement, getRandomArray} from './util.js';

//Записываем в константу число, равное количеству сгенерированных объектов
const COUNTER_ADS = 10;

//Записываем в константы минимальные и максимальные значения для широты и долготы
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

//Запишем в константы имеющиеся массивы

const TITLES = [
  'Прекрасная квартирка',
  'Не такая прекрасная квартирка',
  'Странный дом',
  'Квартира вашей мечты',
  'Маленькое уютное гнездышко',
  'Квартира для большой семьи'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'В квартире имеется вся необходимая для жизни техника',
  'Полностью мебелерованная квартира',
  'Прекрасный вид на город',
  'Рядом есть много магазинов',
  'Вы влюбитесь в эту квартиру с первого взгляда',
  'У квартиры есть свои недостатки, но они незначительные'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

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
const getCreatedAds = () => Array.from({length: COUNTER_ADS}, getCreatedAd);

export {getCreatedAds};
