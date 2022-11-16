// import './card.js';
import './form.js';
import './form-validate.js';
// import './map.js';
import './slider.js';
import { getData } from './api.js';
import { renderAds } from './card.js';
import {createMarkers} from './map.js';

const init = async () => {
  const similarAds = await getData();
  const shortSimilarAds = similarAds.slice(0, 10);
  renderAds(shortSimilarAds);
  createMarkers(shortSimilarAds);
};

init();
