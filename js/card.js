import { createCardTemplate } from './create-card.js';

export const renderAds = async (similarAds) => {
  const map = document.querySelector('.map__canvas');
  const mapFragment = document.createDocumentFragment();

  map.innerHTML = '';

  similarAds.forEach((ad) => {
    const cardElement = createCardTemplate(ad);
    mapFragment.appendChild(cardElement);
  });
};
