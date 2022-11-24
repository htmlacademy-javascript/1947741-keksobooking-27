import './form.js';
import './form-validate.js';
import { getData } from './api.js';
import { createMarkers, resetMarkersLayerGroup } from './map.js';
import { debounce } from './util.js';
import { getActiveFilters, getFilteredOffers } from './filter.js';

const RENDER_DELAY = 500;

export const init = async () => {
  const filters = getActiveFilters();
  const filteredAds = getFilteredOffers(await getData(), filters);
  const filtersForm = document.querySelector('#filters-form');
  createMarkers(filteredAds);

  filtersForm.addEventListener('change', debounce(async() => {
    resetMarkersLayerGroup();
    const currentFilters = getActiveFilters();
    const currentFilteredAds = getFilteredOffers(await getData(), currentFilters);
    createMarkers(currentFilteredAds);
  }, RENDER_DELAY));
};

init();
