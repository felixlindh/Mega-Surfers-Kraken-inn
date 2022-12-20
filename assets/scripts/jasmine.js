function calculateTotalPrice(orderedItems) {
  let priceSum = 0;

  for (let i = 0; i < orderedItems.length; i++) {
    priceSum += orderedItems[i].price;
  }
  console.log(Number(priceSum.toFixed(2)));
  return Number(priceSum.toFixed(2));
}

function searchFoods(searchQuery, list) {
  let items = list,
    newSearchQuery = searchQuery.toLowerCase();
  if (searchQuery != "") {
    items = items.filter(
      (item) =>
        item.titel.toLowerCase().includes(newSearchQuery) ||
        item.info.toLowerCase().includes(newSearchQuery)
    );
  }
  return items;
}
