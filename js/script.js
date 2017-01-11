var boxes = [].slice.call(document.getElementsByClassName('box'));
// add image overwrites here: number of box as key, name of image as value
//
var overwrites = {
  '004': ['IMAG0022.jpg', 'thumbs/IMAG0022-thumb.jpg'],
  '010': 'IMAG0139.jpg',
  '000': 'IMG_2073.jpg',
  '001': 'IMG_2219.jpg',
  '002': 'IMG_2475.jpg',
  '003': 'IMG_2521.jpg'
};

boxes.forEach(function(e, index) {
  var num = ('00' + index).slice(-3);
  // add overwrites and thumbs if overwrite is an array
  num = overwrites[num] ? typeof overwrites[num] === 'object' ? overwrites[num][1] : overwrites[num] : num + '.png';
  e.style.backgroundImage = 'url("images/' + num + '")';
});
