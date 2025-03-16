module.exports = function sortStrings(arr) {
    return arr.map(str => str.replace(/\s/g, '')).sort();
  };
  