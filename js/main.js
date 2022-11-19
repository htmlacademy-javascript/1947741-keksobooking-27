import './form.js';
import './form-validate.js';
import { getData } from './api.js';
import {createMap, createMarkers} from './map.js';
import { debounce } from './util.js';
import { checkAdOnFilters, getActiveFilters } from './filter.js';

const ADS_COUNT = 10;
const RENDER_DELAY = 500;

const init = async () => {
  const similarAds = await getData();
  const filters = getActiveFilters();
  const filteredAds = similarAds.filter((ad) => checkAdOnFilters(ad, filters));
  const shortAds = filteredAds.slice(0, ADS_COUNT);
  const filtersForm = document.querySelector('#filters-form');
  const {pinIcon, map} = createMap();
  let markerGroup = createMarkers(shortAds, pinIcon, map);


  filtersForm.addEventListener('change', debounce(() => {
    markerGroup.clearLayers();
    const currentFilters = getActiveFilters();
    const currentFilteredAds = similarAds.filter((ad) => checkAdOnFilters(ad, currentFilters));
    const currentShortAds = currentFilteredAds.slice(0, ADS_COUNT);

    markerGroup = createMarkers(currentShortAds, pinIcon, map);
  }, RENDER_DELAY));
};

init();
