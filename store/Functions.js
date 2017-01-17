let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var images = [
  '000.png', '001.png', '002.png',
  '003.png', '004.png', '005.png',
  '006.png', '007.png', '008.png',
  '009.png',
  'IMAG0022_L.jpg',
  'IMAG0139.jpg',
  'IMG_2073_B.JPG',
  'IMG_2219_B.JPG',
  'IMG_2475.JPG',
  'IMG_2521.JPG'
];

function buildMap(images) {
  return images.map((e) => {
    if (e.includes('_B.')) {
      return ['B', e];
    }
    if (e.includes('_L.')) {
      return ['L', e];
    }
    return ['1', e];
  });
}

let map = buildMap(images);
map.forEach((e, i) => {
    //REWRITE
});

function findVal(array, value, afterIndex) {
  if (!afterIndex) {
    afterIndex = 0;
  }
  return array.indexOf( array.find((e, i) => {
    return e.includes(value) && i > afterIndex;
  }) );
}
function moveInArray(array, index, size, direction) {
  size = size || 1;
  direction = direction || -1;
  index = index || 1;
  let arr = [].concat(array);
  let add = arr.splice(index, size);
  if (index < 0 || index > array.length - 1) {
    return arr;
  } else if (index + direction < 0) {
    return add.concat(arr);
  } else if (index + direction + (size - 1) > array.length - 1) {
    return arr.concat(add);
  }
  arr = arr.slice(0, index + direction)
        .concat(add)
        .concat(arr.slice(index + direction));
  return arr;
}
function addToArray(array, index, toAdd, times) {
  let arr = [].concat(array);
  times -= 1;
  arr.splice(index, 0, toAdd);
  if (times > 0) { return addToArray(arr, index, toAdd, times); }
  return arr;
}
