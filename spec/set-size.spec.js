const setSize = require("../src/set-size.js");

describe("Set Size", function() {
  it('sets the size correctly', function() {
    let lineTotals = [0, 5, 9, 10, 25, 29, 30, 45, 99, 100, 350, 499, 500, 1000];
    let sizes = ['XS', 'XS', 'XS', 'S', 'S', 'S', 'M', 'M', 'M', 'L', 'L', 'L', 'XL', 'XL'];
    let index = 0;

    lineTotals.forEach((total) => {
      expect(setSize(total)).toEqual(sizes.at(index));
      index += 1
    });
  });
});
