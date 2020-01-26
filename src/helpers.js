export const randomNumber = (max, min=0) => Math.floor((Math.random() * (max - min) + min));

export const aDiffRandom = (length, index) => {
  let ran = randomNumber(length);
  if (ran === index) {
    index === length
      ? ran = index - 1
      : ran = index + 1;
    }
  return ran;
}
