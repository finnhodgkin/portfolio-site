//OVERWRITES
var overwrites = {
  '010': 'IMAG0022_L.jpg',
  '011': 'IMG_2073_B.JPG',
  '012': 'IMAG0139.jpg',
  '013': 'IMG_2219.JPG',
  '014': 'IMG_2475.JPG',
  '015': 'IMG_2521.JPG'
};
//ENDOVERWRITES

var boxes = [].slice.call(document.getElementsByClassName('box'));
// add image overwrites here: number of box as key, name of image as value
//

boxes.forEach(function(e, index) {
  var num = ('00' + index).slice(-3);
  // add overwrites and thumbs if overwrite is an array
  num = overwrites[num] ? typeof overwrites[num] === 'object' ? overwrites[num][1] : overwrites[num] : num + '.png';
  e.style.backgroundImage = 'url("images/' + num + '")';
});
