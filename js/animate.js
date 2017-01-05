(function () {
  var boxes = [].slice.call(document.getElementsByClassName('box'));
  var controls = [].slice.call(document.getElementsByClassName('piccontrol'));
  var gallery = document.getElementById('gallery');
  var pic = document.getElementById('pic');

  boxes.forEach(function (e) {
    e.addEventListener('click', function () {
      gallery.className += ' on';
      pic.style.backgroundImage = e.style.backgroundImage;
    });
  });

  controls.forEach(function (e) {
    e.addEventListener('click', function () {
      var curr = pic.style.backgroundImage;
      var direction = this.id === 'rightarrow' ? 1 : -1;
      if (direction === -1 && curr === 'url("images/000.png")') {
        return;
      }
      if (direction === 1 && curr === 'url("images/' + ('00' + (boxes.length - 1)).slice(-3) + '.png")') {
        return;
      }
      var num = ('00' + (+(curr.slice(12, -6)) + direction)).slice(-3);
      pic.style.backgroundImage = 'url("images/' + num + '.png")';
    });
  });

  gallery.addEventListener('click', function (e) {
    if (e.target !== this && e.target !== pic) {
      return;
    }
    gallery.className = gallery.className.replace(' on', '');
  });
})();
