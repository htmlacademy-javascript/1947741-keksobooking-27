const DEFAULT_VALUE = 'any';
const ADS_COUNT = 10;
export const RENDER_DELAY = 500;

const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const featuresFilter = filters.querySelector('#housing-features');

const priceFork = {
  'low': [0, 10000],
  'middle': [10000, 50000],
  'high': [50000, 100000]
};

const filterType = (ad) => {
  if (typeFilter.value === DEFAULT_VALUE) {
    return true;
  }
  return ad.offer.type === typeFilter.value;
};

const filterPrice = (ad) => {
  const priceValue = priceFilter.value;

  if (priceValue === DEFAULT_VALUE) {
    return true;
  }

  const minFilteredPrice = priceFork[priceFilter.value][0];
  const maxFilteredPrice = priceFork[priceFilter.value][1];

  return ad.offer.price >= minFilteredPrice && ad.offer.price <= maxFilteredPrice;
};

const filterRooms = (ad) => {
  if (roomsFilter.value === DEFAULT_VALUE) {
    return true;
  }
  return ad.offer.rooms === Number(roomsFilter.value);

};

const filterGuests = (ad) => {
  if (guestsFilter.value === DEFAULT_VALUE) {
    return true;
  }
  return ad.offer.rooms === Number(guestsFilter.value);
};

const filterFeatures = (ad) => {
  const adFeaturesList = ad.offer.features;
  const checkedFields = featuresFilter.querySelectorAll('.map__checkbox:checked');
  const checkedValues = [];
  checkedFields.forEach((field) => {
    checkedValues.push(field.value);
  });

  if (checkedValues.length === 0) {
    return true;
  } else if (adFeaturesList) {
    return checkedValues.every((value) => adFeaturesList.includes(value));
  }
  return false;
};

export const filterAds = (ads) => {
  const filteredArray = [];

  for (const ad of ads) {
    if (filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad)) {
      filteredArray.push(ad);

      if (filteredArray.length === ADS_COUNT) {
        break;
      }
    }
  }

  return filteredArray;
};
