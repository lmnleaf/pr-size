const size = require("../src/size.js");

describe("Size", function() {
  it('sets the size correctly', function() {
    let lineTotals = [0, 5, 9, 10, 25, 29, 30, 45, 99, 100, 350, 499, 500, 1000];
    let sizes = ['XS', 'XS', 'XS', 'S', 'S', 'S', 'M', 'M', 'M', 'L', 'L', 'L', 'XL', 'XL'];
    let index = 0;

    lineTotals.forEach((total) => {
      let { label, description } = size(total);
      expect(label).toEqual('PR Size: ' + sizes.at(index));
      if (index >= 0 && index <= 2) {
        expect(description).toEqual('PR is fewer than 10 lines');
      } else if (index >= 3 && index <= 5) {
        expect(description).toEqual('PR is 10 - 29 lines');
      } else if (index >= 6 && index <= 8) {
        expect(description).toEqual('PR is 30 - 99 lines');
      } else if (index >= 9 && index <= 11) {
        expect(description).toEqual('PR is 100 - 499 lines');
      } else {
        expect(description).toEqual('PR is 500+ lines');
      }

      index += 1
    });
  });
});
