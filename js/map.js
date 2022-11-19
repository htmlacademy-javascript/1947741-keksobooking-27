import {enableUserForm} from './form.js';
import { adForm } from './form.js';
import {address} from './form-validate.js';
import { createCardTemplate } from './create-card.js';

const CENTER_COORDINATES = {
  lat: 35.68950,
  lng: 139.69171,
};

const buttonSubmit = adForm.querySelector('.ad-form__submit');
export const buttonReset = adForm.querySelector('.ad-form__reset');

export const createMap = () => {

  const mapScale = 12;

  //Создаем карту с координатами
  const map = L.map('map-canvas')
    .on('load', () => {
      enableUserForm();
    })
    .setView(CENTER_COORDINATES, mapScale);

  //Добавляем слой с картой
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  //Добавляем на карту метки
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainPinMarker = L.marker(
    CENTER_COORDINATES,
    {
      draggable: true,
      icon: mainPinIcon,
    },
    address.value = `${CENTER_COORDINATES.lat} ${CENTER_COORDINATES.lng}`
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const newCoordinates = evt.target.getLatLng();
    address.value = `${newCoordinates.lat.toFixed(5)} ${newCoordinates.lng.toFixed(5)}`;
  });

  //Возвращает начальные координаты маркера при сбросе введенных данных и отправке формы

  const getInitialCoordinates = () => {
    mainPinMarker.setLatLng(CENTER_COORDINATES);
    map.setView(CENTER_COORDINATES, mapScale);
    address.value = `${CENTER_COORDINATES.lat} ${CENTER_COORDINATES.lng}`;
  };

  buttonSubmit.addEventListener('click', getInitialCoordinates);

  buttonReset.addEventListener('click', getInitialCoordinates);

  return {pinIcon, map};
};

export const createMarkers = (similarAds, pinIcon, map) => {
  const markerGroup = L.layerGroup().addTo(map);

  //Добавление меток объявлений на карту
  const createMarker = (similarAd) => {
    const marker = L.marker(
      {
        lat: similarAd.location.lat,
        lng: similarAd.location.lng,
      },
      {
        pinIcon,
      }
    );

    marker
      .addTo(markerGroup)
      .bindPopup(createCardTemplate(similarAd));
  };

  similarAds.forEach((similarAd) => {
    createMarker(similarAd);
  });


  return markerGroup;
};
