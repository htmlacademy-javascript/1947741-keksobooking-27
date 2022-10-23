const adForm = document.querySelector('.ad-form');
const elementsAdForm = adForm.querySelectorAll('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldsets = mapFilters.querySelector('fieldset');

const disabledPage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  elementsAdForm.forEach((element) => {
    element.disabled = true;
  });

  mapFiltersSelects.forEach((element) => {
    element.disabled = true;
  });

  mapFiltersFieldsets.disabled = true;
};

disabledPage();

const activePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  elementsAdForm.forEach((element) => {
    element.disabled = false;
  });

  mapFiltersSelects.forEach((element) => {
    element.disabled = false;
  });

  mapFiltersFieldsets.disabled = false;
};

activePage();

export {disabledPage, activePage};
