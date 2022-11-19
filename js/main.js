import './form.js';
import './form-validate.js';
import { getData } from './api.js';
import { renderAds } from './card.js';
import {createMarkers} from './map.js';
// import { filterAds } from './filter.js';

export const ADS_COUNT = 10;

const init = async () => {
  const similarAds = await getData();
  const shortSimilarAds = similarAds
    // .slice()
    // .sort(filterAds())
    .slice(0, ADS_COUNT);
  renderAds(shortSimilarAds);
  createMarkers(shortSimilarAds);
};

init();
