import {activePage} from './form.js';

const CENTER_COORDINATES = {
  lat: 35.689,
  lng: 139.692,
};
const mapScale = 15;

//Создаем карту с координатами
const map = L.map('map-canvas')
  .on('load', () => {
    activePage(true);
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

const mainPinMarker = L.marker(
  CENTER_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// mainPinMarker.on('moveend', (evt) => {
//   console.log(evt.target.getLatLng());
// });
