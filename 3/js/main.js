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

//Напишем функции

//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntInclusive = function (min, max) {
  if (min < 0 || max < 0 || max < min) {
    return NaN;
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomIntFloatingPoint = function (min, max, characterLimit) {
  if (min < 0 || max < 0 || max < min || characterLimit < 0) {
    return NaN;
  }

  const calculation = Math.random() * (max - min) + min;
  const result = calculation.toFixed(characterLimit);
  return result;
};

//Функция возвращает случайное значение из массива
const getRandomElement = function (element) {
  const randomElement = Math.floor(Math.random() * element.length);
  return element[randomElement];
};

//Функция для генерации адресов изображений(неповторяющихся)
const getUniqueImageAddress = function () {
  let number = 0;
  for (let i = 1; i <= COUNTER_ADS; i++) {
    number += 1;
    if (number < 10) {
      return `img/avatars/user0${number}.png`;
    }
    return `img/avatars/user${number}.png`;
  }
};

//Функция для вывода массива случайной длины из случайных неповторяющихся значений
const getRandomArray = function (features) {
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

//Функция создает одно объявление
const getCreatedAd = function () {
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

const getCreatedAds = Array.from({length: COUNTER_ADS}, getCreatedAd);
// eslint-disable-next-line no-unused-expressions
getCreatedAds;
