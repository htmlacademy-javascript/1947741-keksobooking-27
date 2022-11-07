import { price } from './form-validate.js';
import { typeOfHousing, minPriceOfHousing } from './form-validate.js';

//global noUiSlider:readonly
const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: minPriceOfHousing[typeOfHousing.value],
  step: 10,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

price.addEventListener('change', () => sliderElement.noUiSlider.set(price.value));
