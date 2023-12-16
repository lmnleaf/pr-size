function setSize(totalLines) {

  let size;

  if (totalLines < 10) {
    size = 'XS'; 
  } else if (totalLines < 30) {
    size = 'S';
  } else if (totalLines < 100) {
    size = 'M';
  } else if (totalLines < 500) {
    size = 'L';
  } else if (totalLines >= 500) {
    size = 'XL';
  };

  return size;

  // set size
  // add PR label


}

// Logic
// XS 0-9 lines
// S 10-29 lines
// M 30-99
// L 100-499
// XL 500+

// add a label for PR Size
// add a label for Complexity

module.exports = setSize
