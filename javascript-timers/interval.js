var $header = document.querySelector('h1');
var counter = 3;
var startCountdown = setInterval(countDown, 1000);

function countDown() {
  if (counter > 0) {
    $header.textContent = counter;
    counter--;
  } else if (counter === 0) {
    $header.textContent = '~Earth Beeeelooowww Us~';
    clearInterval(startCountdown);
  }
}
