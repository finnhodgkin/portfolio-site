var boxes = [].slice.call(document.getElementsByClassName('box'));
//add image overwrites here: number of box as key, name of image as value
var overwrites = {
  
};

boxes.forEach(function(e, index) {
  var num = ('00' + index).slice(-3);
  num = overwrites[num] ? overwrites[num] : num + '.png';
  e.style.backgroundImage = 'url("images/' + num + '")';
});
