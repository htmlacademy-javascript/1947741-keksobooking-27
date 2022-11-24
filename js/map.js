import { enableUserForm } from './form.js';
import { adForm } from './form.js';
import { address } from './form-validate.js';
import { createCardElement } from './create-card.js';
import { init } from './main.js';

export const centerCoordinates = {
  lat: 35.68950,
  lng: 139.69171,
};
const DIGITS_IN_COORDINATE = 5;

export const buttonSubmit = adForm.querySelector('.ad-form__submit');
export const buttonReset = adForm.querySelector('.ad-form__reset');

// export const createMap = () => {

const mapScale = 12;

//Создаем карту с координатами
const map = L.map('map-canvas')
  .on('load', () => {
    enableUserForm();
  })
  .setView(centerCoordinates, mapScale);

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
  centerCoordinates,
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const newCoordinates = evt.target.getLatLng();
  address.value = `${newCoordinates.lat.toFixed(DIGITS_IN_COORDINATE)} ${newCoordinates.lng.toFixed(DIGITS_IN_COORDINATE)}`;
});

//   // return {pinIcon, map};
// };
export const markerGroup = L.layerGroup().addTo(map);

export const createMarkers = (similarAds) => {

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
      .bindPopup(createCardElement(similarAd));
  };

  similarAds.forEach((similarAd) => {
    createMarker(similarAd);
  });

  // return markerGroup;
};

export const resetMarkersLayerGroup = () => markerGroup.clearLayers();

//Сброс маркеров, карты и поля адреса

export const resetCoordinates = () => {
  mainPinMarker.setLatLng(centerCoordinates);
  map.setView(centerCoordinates, mapScale);
  map.closePopup();
  address.value = `${centerCoordinates.lat} ${centerCoordinates.lng}`;
  resetMarkersLayerGroup();
  init();
};
