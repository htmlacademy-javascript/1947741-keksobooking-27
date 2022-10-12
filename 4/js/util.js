//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0 || max < min) {
    return NaN;
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomIntFloatingPoint = (min, max, characterLimit) => {
  if (min < 0 || max < 0 || max < min || characterLimit < 0) {
    return NaN;
  }

  const result = (Math.random() * (max - min) + min).toFixed(characterLimit);
  return result;
};

//Функция возвращает случайное значение из массива
const getRandomElement = (element) => {
  const randomElement = Math.floor(Math.random() * element.length);
  return element[randomElement];
};

//Функция для вывода массива случайной длины из случайных неповторяющихся значений
const getRandomArray = (features) => {
  const maxLengthArray = features.length;
  const lengthOfArray = getRandomIntInclusive(1, maxLengthArray);
  const randomArray = [];

  while (randomArray.length < lengthOfArray) {
    const indexOfElement = getRandomIntInclusive(0, maxLengthArray - 1);
    const element = features[indexOfElement];

    if (!randomArray.includes(element)) {
      randomArray.push(element);
    }
  }
  return randomArray;
};

export {getRandomIntInclusive, getRandomIntFloatingPoint, getRandomElement, getRandomArray};
