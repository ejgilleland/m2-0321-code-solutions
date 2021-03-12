function timedMessage () {
  var $header = document.querySelector('h1');
  $header.textContent = 'Hello There'
}

setTimeout(timedMessage, 2000);
