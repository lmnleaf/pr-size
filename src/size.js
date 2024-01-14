function size(totalLines) {
  let label;
  let description;

  if (totalLines < 10) {
    label = 'PR Size: XS';
    description = 'PR is fewer than 10 lines'
  } else if (totalLines < 30) {
    label = 'PR Size: S';
    description = 'PR is 10 - 29 lines'
  } else if (totalLines < 100) {
    label = 'PR Size: M';
    description = 'PR is 30 - 99 lines'
  } else if (totalLines < 500) {
    label = 'PR Size: L';
    description = 'PR is 100 - 499 lines'
  } else if (totalLines >= 500) {
    label = 'PR Size: XL';
    description = 'PR is 500+ lines'
  };

  return { label, description };
}

module.exports = size
