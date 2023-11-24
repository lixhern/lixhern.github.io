var myButton = document.getElementById('btn');
var navBar = document.getElementById('nav');
  myButton.addEventListener('click', function() {

    if (navBar.classList.contains('clicked')) {

      navBar.classList.remove('clicked');
    } else {

      navBar.classList.add('clicked');
    }
  });