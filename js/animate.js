/*global overwrites*/

(function () {
  var boxes = [].slice.call(document.getElementsByClassName('box'));
  var controls = [].slice.call(document.getElementsByClassName('piccontrol'));
  var gallery = document.getElementById('gallery');
  var pic = document.getElementById('pic');
  var current = '';

  boxes.forEach(function (e) {
    e.addEventListener('click', function () {
      gallery.className += ' on';
      current = boxes.indexOf(e);
      pic.style.backgroundImage = e.style.backgroundImage;
    });
  });

  controls.forEach(function (e) {
    e.addEventListener('click', function () {
      var direction = this.id === 'rightarrow' ? 1 : -1;
      var picture = '';
      current = current + direction;
      // if last or first box, cancel image change
      if (direction === -1 && current < 0) {
        current = boxes.length - 1;
      }
      if (direction === 1 && current > boxes.length - 1) {
        current = 0;
      }
      // change picture
      picture = ('00' + current).slice(-3);
      console.log(current);
      pic.style.backgroundImage = 'url("images/' + (overwrites[picture] || picture + '.png') + '")';
    });
  });

  gallery.addEventListener('click', function (e) {
    // if controls then don't close gallery
    if (e.target !== this && e.target !== pic) { return; }
    gallery.className = gallery.className.replace(' on', '');
  });
})();
