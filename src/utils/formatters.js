import * as abbreviate from "number-abbreviate";

export function formatPrice(price) {
  if (price < 0) {
    return `$${parseFloat(price).toFixed(8)}`;
  }

  return `$${parseFloat(price).toFixed(2)}`;
}

export function formatVolume(volume) {
  if (volume < 1000) return parseFloat(volume).toFixed(2);

  return abbreviate(volume, 2);
}

export function formatChangePercentage(oldPrice, newPrice) {
  const change = (newPrice - oldPrice) / oldPrice;
  if (change > 0) {
    return `+%${parseFloat(change * 100).toFixed(2)}`;
  } else if (change < 0) {
    return `-%${parseFloat(-change * 100).toFixed(2)}`;
  } else {
    return `%0.00`;
  }
}

export function formatAmount(amount) {
  if ((amount < 1 && amount > 0) || (amount > -1 && amount < 0))
    return parseFloat(amount).toFixed(8);

  return parseFloat(amount).toFixed(2);
}
