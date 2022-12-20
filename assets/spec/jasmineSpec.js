describe("Total amount cost calculation", function () {
  it("should be able to calculate total price", function () {
    let orderedItems = [
      { price: 50.994564 },
      { price: 100.93543543 },
      { price: 200.993453 },
      { price: 200.993453 },
    ];
    expect(calculateTotalPrice(orderedItems)).toEqual(553.92);
  });
});

describe("Find an item based on a query", function () {
  it("should be able to find items based on search", function () {
    let items = [
      { titel: "Banana split", info: "Glass med banan" },
      { titel: "Köttfärssås", info: "Nötkött med tomatsås" },
      { titel: "Rom", info: "En pirats dryck" },
      { titel: "BFS", info: "Big fucking steak" },
      { titel: "No tomorrow", info: "1 litre vodka" },
      { titel: "cola-zero", info: "No sugar" },
    ];
    let searchQuery = "vodka";
    expect(searchFoods(searchQuery, items)[0]).toEqual(items[4]);
  });
});
