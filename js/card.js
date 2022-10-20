import {getCreatedAds} from './util.js';

//Добавляем словарь с типами жилья
const TYPES_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

//Разметка объявлений будет пока отображаться в блоке, который предназначен для интерактивной карты
const map = document.querySelector('.map__canvas');
const mapFragment = document.createDocumentFragment();

//Находим содержимое шаблона #card
const cardTemplate = document.querySelector('#card').content;
//В шаблоне находим разметку
const card = cardTemplate.querySelector('.popup');

//

//в переменную записывем вывод функции getCreateAds
const similarAds = getCreatedAds();

similarAds.forEach((author, offer) => {
  const cardElement = card.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPES_HOUSING[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = cardElement.querySelector('.popup__features');
  const featuresItems = featuresList.querySelector('.popup__feature');
  if (offer.features) {
    featuresItems.forEach((featuresItem) => {
      const isNecessary = offer.features.some((feature) => featuresItem.classList.contains(`popup__feature--${feature}`));

      if (!isNecessary) {
        featuresItem.remove();
      }
    });
  } else {
    featuresList.remove();
  }

  if (offer.description) {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    cardElement.querySelector('.popup__description').remove();
  }

  const photosList = cardElement.querySelector('.popup__photos');
  const photosItems = photosList.querySelector('.popup__photo');
  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const photoElement = photosItems.cloneNode(true);
      photoElement.src = photo;
      photosList.appendChild(photoElement);
    });
  } else {
    photosList.remove();
  }

  mapFragment.appendChild(cardElement);
});

//Добавляем фрагмент в блок с картой
map.appendChild(mapFragment);
