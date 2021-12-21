const getRandomNum = (max = 0, min = 0) => {
  let random = Math.random();

  if (max) random = random * max;
  if (min) random = random + min;

  return random;
};

export default getRandomNum;