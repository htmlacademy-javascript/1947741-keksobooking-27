import {adForm} from './form.js';

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'ad-form__error' // Класс для элемента с текстом ошибки
});

//Валидация поля заголовка объявления
const title = adForm.querySelector('#title');
const minLengthTitle = 30;
const maxLengthTitle = 100;
const validateTitle = (value) => value.length >= minLengthTitle && value.length <= maxLengthTitle;

pristine.addValidator(title, validateTitle, `От ${minLengthTitle}  до ${maxLengthTitle} символов`);

//Валидация поля цены за ночь
const price = adForm.querySelector('#price');
const maxPrice = 100000;
const typeOfHousing = adForm.querySelector('#type');
const minPriceOfHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const validatePrice = () => price.value >= minPriceOfHousing[typeOfHousing.value];
const getPriceErrorMessage = () => {
  if (validatePrice){
    return `Скорректируйте цену. ${minPriceOfHousing[typeOfHousing.value]} рублей - минимальная цена за данный тип жилья`;
  } else if (price.value > maxPrice) {
    return `Укажите цену ниже максимально возможной цены - ${maxPrice} рублей`;
  }
};

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

typeOfHousing.addEventListener('change', () => {
  price.placeholder = minPriceOfHousing[typeOfHousing.value];
});

//Валидация полей количество комнат и количество мест
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const roomNumberMax = 3;
const capasityMin = 0;

const validateCapacity = () => (roomNumber.value >= capacity.value && roomNumber.value <= roomNumberMax && capacity.value > capasityMin) || (roomNumber.value === '100' && capacity.value === '0');

pristine.addValidator(capacity, validateCapacity, 'Количество комнат не соответсвует количеству гостей');

function onCapacityChange() {
  pristine.validate(capacity);
}

function onRoomNumberChange() {
  pristine.validate(roomNumber);
}

roomNumber.addEventListener('change', onCapacityChange);
capacity.addEventListener('change', onRoomNumberChange);
