var imgData = [
  {
    src: 'images/001.png',
    alt: 'Bulbasaur'
  },
  {
    src: 'images/004.png',
    alt: 'Charmander'
  },
  {
    src: 'images/007.png',
    alt: 'Squirtle'
  },
  {
    src: 'images/025.png',
    alt: 'Pikachu'
  },
  {
    src: 'images/039.png',
    alt: 'Jigglypuff'
  }
];

var $carouselContainer = document.querySelector('.carousel-container');
$carouselContainer.addEventListener('click', imgSwapper);
var $carouselImage = document.querySelector('.image');
var timedStep;

function timerStart() {
  timedStep = setInterval(autoSwap, 3000);
}

function timerStop() {
  clearInterval(timedStep);
}

function imgSwapper(event) {
  if (event.target.className === 'fas fa-angle-left') {
    timerStop();
    var newIndex = (parseInt($carouselImage.dataset.index, 10) + 4) % 5;
    document.querySelector('.fas.fa-circle').className = "far fa-circle";
    document.querySelector(`i[data-index='${newIndex}']`).className = 'fas fa-circle';
    $carouselImage.dataset.index = newIndex;
    $carouselImage.setAttribute('src', imgData[newIndex].src);
    $carouselImage.setAttribute('alt', imgData[newIndex].alt);
    timerStart()
  } else if (event.target.className === 'fas fa-angle-right') {
    timerStop();
    var newIndex = (parseInt($carouselImage.dataset.index, 10) + 1) % 5;
    document.querySelector('.fas.fa-circle').className = "far fa-circle";
    document.querySelector(`i[data-index='${newIndex}']`).className = 'fas fa-circle';
    $carouselImage.dataset.index = newIndex;
    $carouselImage.setAttribute('src', imgData[newIndex].src);
    $carouselImage.setAttribute('alt', imgData[newIndex].alt);
    timerStart()
  } else if ((event.target.className === 'fas fa-circle') ||
    (event.target.className === 'far fa-circle')) {
    timerStop();
    var newIndex = parseInt(event.target.dataset.index, 10);
    document.querySelector('.fas.fa-circle').className = "far fa-circle";
    event.target.className = "fas fa-circle";
    $carouselImage.dataset.index = newIndex;
    $carouselImage.setAttribute('src', imgData[newIndex].src);
    $carouselImage.setAttribute('alt', imgData[newIndex].alt);
    timerStart()
  }
};

function autoSwap() {
  var newIndex = (parseInt($carouselImage.dataset.index, 10) + 1) % 5;
  document.querySelector('.fas.fa-circle').className = "far fa-circle";
  document.querySelector(`i[data-index='${newIndex}']`).className = 'fas fa-circle';
  $carouselImage.dataset.index = newIndex;
  $carouselImage.setAttribute('src', imgData[newIndex].src);
  $carouselImage.setAttribute('alt', imgData[newIndex].alt);
}

timerStart();
