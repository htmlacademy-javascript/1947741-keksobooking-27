import { createCardTemplate } from './create-card.js';

export const renderAds = (similarAds) => {
  const map = document.querySelector('.map__canvas');
  const mapFragment = document.createDocumentFragment();

  map.innerHTML = '';

  similarAds.forEach((ad) => {
    const cardElement = createCardTemplate(ad);
    mapFragment.appendChild(cardElement);
  });
};
