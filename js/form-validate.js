import { sendData } from './api.js';
import { adForm, mapFilters } from './form.js';
import { isEscapeKey } from './util.js';
import { buttonReset, buttonSubmit, centerCoordinates, resetCoordinates } from './map.js';
import { resetImages } from './images.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 100000;
const minPricesOfHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const title = adForm.querySelector('#title');
export const price = adForm.querySelector('#price');
export const typeOfHousing = adForm.querySelector('#type');
const sliderElement = document.querySelector('.ad-form__slider');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
export const address = adForm.querySelector('#address');
const successTemlate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemlate.cloneNode(true);
const body = document.querySelector('body');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);


const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'ad-form__error' // Класс для элемента с текстом ошибки
});

//Валидация поля заголовка объявления
const validateTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;

pristine.addValidator(title, validateTitle, `От ${MIN_LENGTH_TITLE}  до ${MAX_LENGTH_TITLE} символов`);

//Валидация поля цены за ночь
const validatePrice = () => price.value >= minPricesOfHousing[typeOfHousing.value];
const getPriceErrorMessage = () => {
  if (validatePrice){
    return `Скорректируйте цену. ${minPricesOfHousing[typeOfHousing.value]} рублей - минимальная цена за данный тип жилья`;
  } else if (price.value > MAX_PRICE) {
    return `Укажите цену ниже максимально возможной цены - ${MAX_PRICE} рублей`;
  }
};
price.placeholder = minPricesOfHousing[typeOfHousing.value];

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

typeOfHousing.addEventListener('change', () => {
  price.placeholder = minPricesOfHousing[typeOfHousing.value];
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
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
const roomNumberMax = 3;
const capasityMin = 0;

const validateCapacity = () => (roomNumber.value >= capacity.value && roomNumber.value <= roomNumberMax && capacity.value > capasityMin) || (roomNumber.value === '100' && capacity.value === '0');

pristine.addValidator(capacity, validateCapacity, 'Количество комнат не соответсвует количеству гостей');

function onRoomNumberChange() {
  pristine.validate(capacity);
}

function onCapacityChange() {
  pristine.validate(roomNumber);
}

roomNumber.addEventListener('change', onRoomNumberChange);
capacity.addEventListener('change', onCapacityChange);

//Валидация полей времени заезда и времени выезда
const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);

timeOut.addEventListener('change', onTimeOutChange);

address.value = `${centerCoordinates.lat} ${centerCoordinates.lng}`;

//
const resetPage = () => {
  adForm.reset();
  mapFilters.reset();
  resetSlider();
  resetImages();
  resetCoordinates();
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

const onDocumentClick = () => {
  successMessage.remove();
  errorMessage.remove();
  document.removeEventListener('click', onDocumentClick);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    successMessage.remove();
    errorMessage.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  body.appendChild(successMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showErrorMessage = () => {
  body.appendChild(errorMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const blockButtonSubmit = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Публикуется...';
};

const unblockButtonSubmit = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};

adForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockButtonSubmit();
    const formData = new FormData (evt.target);
    const result = await sendData(formData);
    if (result) {
      showSuccessMessage();
      resetPage();
    } else {
      showErrorMessage();
    }
    unblockButtonSubmit();
  }
});
