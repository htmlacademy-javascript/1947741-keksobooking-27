export const adForm = document.querySelector('.ad-form');
export const elementsAdForm = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldsets = mapFilters.querySelector('fieldset');

export const disableFilterForm = () => {
  mapFilters.classList.add('map__filters--disabled');

  mapFiltersSelects.forEach((select) => {
    select.setAttribute('disabled', 'disabled');
  });

  mapFiltersFieldsets.setAttribute('disabled', 'disabled');
};

export const disableUserForm = () => {
  adForm.classList.add('ad-form--disabled');

  elementsAdForm.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};

export const enableFilterForm = () => {
  mapFilters.classList.remove('map__filters--disabled');

  mapFiltersSelects.forEach((select) => {
    select.removeAttribute('disabled');
  });

  mapFiltersFieldsets.removeAttribute('disabled');
};

export const enableUserForm = () => {
  adForm.classList.remove('ad-form--disabled');

  elementsAdForm.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};
