// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  // Selecciona el carrusel
  var carousel = document.querySelector('#carouselExampleControls');

  // Inicia el carrusel utilizando Bootstrap
  var carouselInstance = new bootstrap.Carousel(carousel, {
      interval: 4000, // Establece el intervalo de cambio a 4 segundos (4000 ms)
      pause: 'hover', // Pausa el carrusel cuando el cursor está sobre él
  });
});
