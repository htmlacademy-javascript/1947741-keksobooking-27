/*Функция, возвращающая случайное целое число из переданного диапазона включительно*/
/*Задание выполнено с помощью следующих источников:
- https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE
- https://www.freecodecamp.org/news/javascript-random-number-how-to-generate-a-random-number-in-js/
- https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
*/

function getRandomIntInclusive (min, max) {
  if (min < 0 || max < 0 || max < min) {
    return NaN;
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

getRandomIntInclusive(7, 15);

/*Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.*/
/*Задание выполнено с помощью следующих источников:
- https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE
- https://www.freecodecamp.org/news/javascript-random-number-how-to-generate-a-random-number-in-js/
- https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
- https://learn.javascript.ru/number
*/

function getRandomIntFloatingPoint (min, max, characterLimit) {
  if (min < 0 || max < 0 || max < min || characterLimit < 0) {
    return NaN;
  }

  const calculation = Math.random() * (max - min + 1) + min;
  const result = calculation.toFixed(characterLimit);
  return result;
}

getRandomIntFloatingPoint(1, 5, 4);
