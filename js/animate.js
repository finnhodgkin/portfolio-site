/*global overwrites*/

(function () {
  var boxes = [].slice.call(document.getElementsByClassName('box'));
  var controls = [].slice.call(document.getElementsByClassName('piccontrol'));
  var gallery = document.getElementById('gallery');
  var pic = document.getElementById('pic');
  var current = '';

  function imageFormatter (num) {
    num = ('00' + (num)).slice(-3);
    return 'url("images/' + (overwrites[num] || num + '.png') + '")';
  }

  function nextImage (cur, dir) {
    cur += dir;
    // if last or first box, cancel image change
    if (dir === -1 && cur < 0) { cur = boxes.length - 1; }
    if (dir === 1 && cur > boxes.length - 1) { cur = 0; }
    return cur;
  }

  boxes.forEach(function (e) {
    e.addEventListener('click', function () {
      gallery.className += ' on';
      current = boxes.indexOf(e);
      pic.style.backgroundImage = imageFormatter(current);
    });
  });

  window.addEventListener('keyup', function (e) {
    if (e.keyCode === 37) { current = nextImage(current, -1); } // left
    if (e.keyCode === 39) { current = nextImage(current, 1); }  // right
    pic.style.backgroundImage = imageFormatter(current);
    if (e.keyCode === 27) {
      gallery.className = gallery.className.replace(' on', '');
    }
  });

  controls.forEach(function (e) {
    e.addEventListener('click', function () {
      var direction = this.id === 'rightarrow' ? 1 : -1;
      current = nextImage(current, direction);
      // change picture
      pic.style.backgroundImage = imageFormatter(current);
    });
  });

  gallery.addEventListener('click', function (e) {
    // if controls then don't close gallery
    if (e.target !== this && e.target !== pic) { return; }
    // close gallery
    gallery.className = gallery.className.replace(' on', '');
  });
})();
