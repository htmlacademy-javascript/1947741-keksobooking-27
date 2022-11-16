import { sendData } from './api.js';
import {adForm} from './form.js';
import { isEscapeKey } from './util.js';
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

//Сброс формы и показ сообщений

const successTemplate = document.querySelector('#success')
  .content.querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content.querySelector('.error');

const successMessage = successTemplate.cloneNode(true);
successMessage.classList.add('hidden');
document.body.append(successMessage);

const errorMessage = errorTemplate.cloneNode(true);
errorMessage.classList.add('hidden');
document.body.append(errorMessage);

const closeSuccessModal = () => {
  successMessage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const closeErrorModal = () => {
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeErrorModal();
    closeSuccessModal();
  }
}

const onErrorMessageOpen = (message) => {
  const errorButton = message.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorModal);
};

const showSuccessMessage = () => {
  errorMessage.classList.remove('hidden');
  onErrorMessageOpen(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  errorMessage.addEventListener('click', closeErrorModal);
};

const showErrorMessage = () => {
  successMessage.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  successMessage.addEventListener('click', closeSuccessModal);
};

const resetForm = () => {
  adForm.reset();

  //сбросить позицию балуна

  //сбросить слайдер
  // sliderElement.noUiSlider.set(price.value);
};

//Валидация формы при отправке
adForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData (evt.target);
    const result = await sendData(formData);
    if (result) {
      showSuccessMessage();
      resetForm();
    } else {
      showErrorMessage();
    }
  }
});
