var boxes = [].slice.call(document.getElementsByClassName('box'));
boxes.forEach(function(e, index) {
  let num = ('00' + index).slice(-3);
  e.style.backgroundImage = 'url("images/' + num + '.png")';
});
