const priceValues = {
  'low': [0, 10000],
  'middle': [10000, 50000],
  'high': [50000, 100000]
};

export const getActiveFilters = () => {
  const filtersForm = document.querySelector('#filters-form');
  const form = new FormData(filtersForm);
  const data = {};
  form.forEach((value, key) => {
    if (data[key]) {
      data[key] = typeof data[key] === 'string'
        ? [data[key], value]
        : [...data[key], value];
    } else {
      data[key] = value;
    }
  });
  return data;
};

const checkOnType = (type, filterType) => {
  if (filterType === 'any'){
    return true;
  }
  return filterType === type;
};

const checkOnPrice = (adPrice, filterPriceCategory) => {
  if (filterPriceCategory === 'any'){
    return true;
  }
  const filterPrice = priceValues[filterPriceCategory];
  const min = filterPrice[0];
  const max = filterPrice[1];
  return min <= adPrice && adPrice <= max;
};

const checkOnCountValue = (itemValue, filtersValue) => {
  if (filtersValue === 'any') {
    return true;
  }
  return itemValue === Number(filtersValue);
};

const checkOnFeatures = (adFeatures = [], filtersFeatures = []) =>{
  if(typeof filtersFeatures === 'string') {
    return adFeatures.includes(filtersFeatures);
  }
  return filtersFeatures.every((value) => adFeatures.includes(value));
};

//Функция, которая фильтрует объявления по всем фильтрам
export const checkAdOnFilters = (ad, filters) => {
  const typeCheck = checkOnType(ad.offer.type, filters.type);

  const priceCheck = checkOnPrice(ad.offer.price, filters.price);

  const roomsCheck = checkOnCountValue(ad.offer.rooms, filters.rooms);

  const guestsCheck = checkOnCountValue(ad.offer.guests, filters.guests);

  const featuresCheck = checkOnFeatures(ad.offer.features || [], filters.features);

  return typeCheck &&
    priceCheck &&
    roomsCheck &&
    guestsCheck &&
    featuresCheck;
};
