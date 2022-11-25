import './form.js';
import './form-validate.js';
import { getData } from './api.js';
import { createMarkers, resetMarkersLayerGroup } from './map.js';
import { debounce } from './util.js';
import { getActiveFilters, getFilteredOffers } from './filter.js';

const RENDER_DELAY = 500;

export const init = async () => {
  const filtersForm = document.querySelector('#filters-form');
  const similarAds = await getData();

  filtersForm.addEventListener('change', debounce(async() => {
    resetMarkersLayerGroup();

    const currentFilters = getActiveFilters();
    const currentFilteredAds = getFilteredOffers(similarAds, currentFilters);

    createMarkers(currentFilteredAds);
  }, RENDER_DELAY));

  filtersForm.dispatchEvent(new Event('change'));
};

init();
