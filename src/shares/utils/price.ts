export const formatCurrency = (
  number: number,
  currencyCode = 'USD',
  decimalPlaces = 0,
) => {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
};
