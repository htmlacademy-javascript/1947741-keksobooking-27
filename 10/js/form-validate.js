import { sendData } from './api.js';
import {adForm} from './form.js';
import { isEscapeKey } from './util.js';
import { buttonReset } from './map.js';
// import { sliderElement } from './slider.js';

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
export const price = adForm.querySelector('#price');
const maxPrice = 100000;
export const typeOfHousing = adForm.querySelector('#type');
export const minPriceOfHousing = {
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
price.placeholder = minPriceOfHousing[typeOfHousing.value];

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

typeOfHousing.addEventListener('change', () => {
  price.placeholder = minPriceOfHousing[typeOfHousing.value];
});

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: price.placeholder,
  step: 10,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

price.addEventListener('change', () => sliderElement.noUiSlider.set(price.value));

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

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

//Валидация полей времени заезда и времени выезда
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);

timeOut.addEventListener('change', onTimeOutChange);

//Поле адреса
export const address = adForm.querySelector('#address');

const successTemlate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemlate.cloneNode(true);
const body = document.querySelector('body');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);


buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetSlider();
});

const onSuccessMessageClick = () => {
  successMessage.remove();

  document.removeEventListener('click', onSuccessMessageClick);
};

const onSuccessMessageKeydown = () => {
  if (isEscapeKey) {successMessage.remove();}

  document.removeEventListener('keydown', onSuccessMessageKeydown);
};

const sendFormSuccess = () => {
  body.appendChild(successMessage);
  document.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageKeydown);
  adForm.reset();
  resetSlider();
};

const onErrorMessageClick = () => {
  errorMessage.remove();

  document.removeEventListener('click', onErrorMessageClick);
};

const onErrorMessageKeydown = () => {
  if (isEscapeKey) {errorMessage.remove();}

  document.removeEventListener('keydown', onErrorMessageKeydown);
};

const sendFormError = () => {
  body.appendChild(errorMessage);
  document.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageKeydown);
};


adForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData (evt.target);
    const result = await sendData(formData);
    if (result) {
      sendFormSuccess();
    } else {
      sendFormError();
    }
  }
});
