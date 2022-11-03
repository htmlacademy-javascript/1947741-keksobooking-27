import { createCardTemplate } from './create-card.js';
import {getCreatedAds} from './util.js';

export const renderAds = (list) => {
  //Разметка объявлений будет пока отображаться в блоке, который предназначен для интерактивной карты
  const map = document.querySelector('.map__canvas');
  const mapFragment = document.createDocumentFragment();

  map.innerHTML = '';

  list.forEach((ad) => {
    const cardElement = createCardTemplate(ad);
    mapFragment.appendChild(cardElement);
  });

  //Добавляем фрагмент в блок с картой
  // map.appendChild(mapFragment);
};

//в переменную записывем вывод функции getCreateAds
const similarAds = getCreatedAds();

renderAds(similarAds);
