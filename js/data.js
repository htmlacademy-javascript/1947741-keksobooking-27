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

export {COUNTER_ADS, LAT_MIN, LAT_MAX, LNG_MIN, LNG_MAX, TITLES, TYPES, CHECK_TIMES, FEATURES, DESCRIPTIONS, PHOTOS};
