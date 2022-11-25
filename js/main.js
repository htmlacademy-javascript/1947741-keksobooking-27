import './form.js';
import './form-validate.js';
import { getData } from './api.js';
import { createMarkers, resetMarkersLayerGroup } from './map.js';
import { debounce } from './util.js';
import { getActiveFilters, getFilteredOffers } from './filter.js';

const RENDER_DELAY = 500;

// export const init = async () => {
//   const filtersForm = document.querySelector('#filters-form');
//   const similarAds = (await getData()).slice(0, ADS_COUNT);

//   console.log('similarAds', similarAds);

//   createMarkers(similarAds);

//   filtersForm.addEventListener('change', debounce(async() => {
//     resetMarkersLayerGroup();

//     const currentFilters = getActiveFilters();
//     const currentFilteredAds = getFilteredOffers(await getData(), currentFilters);

//     console.log('currentFilteredAds', currentFilteredAds);
//     createMarkers(currentFilteredAds);
//   }, RENDER_DELAY));
// };

export const init = async () => {
  const filtersForm = document.querySelector('#filters-form');
  const similarAds = await getData();
  console.log('similarAds', similarAds);

  filtersForm.addEventListener('change', debounce(async() => {
    resetMarkersLayerGroup();

    const currentFilters = getActiveFilters();
    const currentFilteredAds = getFilteredOffers(similarAds, currentFilters);

    console.log('currentFilteredAds', currentFilteredAds);
    createMarkers(currentFilteredAds);
  }, RENDER_DELAY));

  filtersForm.dispatchEvent(new Event('change'));
};

init();
