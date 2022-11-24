import './form.js';
import './form-validate.js';
import { getData } from './api.js';
import { createMarkers, resetMarkersLayerGroup } from './map.js';
import { debounce } from './util.js';
import { getActiveFilters, getFilteredOffers } from './filter.js';

// const ADS_COUNT = 10;
const RENDER_DELAY = 500;

export const init = async () => {
  // const similarAds = await getData();
  const filters = getActiveFilters();
  const filteredAds = getFilteredOffers(await getData(), filters);
  // const filteredAds = similarAds.filter((ad) => checkAdOnFilters(ad, filters));
  // const shortAds = filteredAds.slice(0, ADS_COUNT);
  const filtersForm = document.querySelector('#filters-form');
  createMarkers(filteredAds);

  // console.log(filteredAds);

  filtersForm.addEventListener('change', debounce(async() => {
    resetMarkersLayerGroup();
    const currentFilters = getActiveFilters();
    const currentFilteredAds = getFilteredOffers(await getData(), currentFilters);
    // const currentFilteredAds = similarAds.filter((ad) => checkAdOnFilters(ad, currentFilters));
    // const filteredOffers = [];

    // for (let i = 0; i < currentFilteredAds.length; i++) {
    //   const offer = currentFilteredAds[i];
    //   if (currentFilteredAds) {
    //     filteredOffers.push(offer);
    //   }
    //   if (filteredOffers.length >= ADS_COUNT) {
    //     break;
    //   }
    // }

    // console.log(currentFilteredAds);
    createMarkers(currentFilteredAds);
  }, RENDER_DELAY));
};

init();
