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
