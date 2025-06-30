export const maskCardNumber = (cardNumber) => {
  return cardNumber.slice(-4).padStart(cardNumber.length, '*');
};