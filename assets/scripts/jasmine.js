function calculateTotalPrice(orderedItems) {
  let priceSum = 0;

  for (let i = 0; i < orderedItems.length; i++) {
    priceSum += orderedItems[i].price;
  }
  console.log(Number(priceSum.toFixed(2)));
  return Number(priceSum.toFixed(2));
}
