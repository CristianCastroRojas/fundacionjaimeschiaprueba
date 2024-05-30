document.addEventListener('DOMContentLoaded', function () {
    // Cargar y agregar el contenido del complemento barra de navegación
    fetch('./components/navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            const fragment = document.createRange().createContextualFragment(data);
            document.getElementById('navbar-componente').appendChild(fragment);
        })
        .catch(error => console.error('Error al cargar el componente navbar:', error));

    // Cargar y agregar el contenido del complemento banner/slider
    fetch('./components/swiper/banner.html')
        .then(response => response.text())
        .then(data => {
            const fragment = document.createRange().createContextualFragment(data);
            document.getElementById('banner-componente').appendChild(fragment);
            // Inicializa el Swiper después de cargar el contenido del banner
            const swiper = new Swiper(".swiper", {
                direction: "horizontal",
                loop: true,
                allowTouchMove: true,
                effect: "fade",
                autoplay: {
                    delay: 6000,
                },
                keyboard: {
                    enabled: true,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        })
        .catch(error => console.error('Error al cargar el componente banner:', error));

    // Cargar y agregar el contenido del complemento footer
    fetch('./components/footer/footer.html')
        .then(response => response.text())
        .then(data => {
            const fragment = document.createRange().createContextualFragment(data);
            document.getElementById('footer-componente').appendChild(fragment);
        })
        .catch(error => console.error('Error al cargar el componente footer:', error));

    // Cargar y agregar el contenido del complemento scroll-arrow
    fetch('./components/scroll-arrow/scroll-arrow.html')
        .then(response => response.text())
        .then(data => {
            const fragment = document.createRange().createContextualFragment(data);
            document.getElementById('scroll-arrow-componente').appendChild(fragment);
            // Detectar el desplazamiento de la página para mostrar/ocultar la flecha de desplazamiento
            window.addEventListener("scroll", function () {
                var scrollArrow = document.querySelector('.scroll-arrow');
                // Calcula la posición del 85% del final de la página
                var scrollPosition = window.scrollY;
                var windowHeight = window.innerHeight;
                var documentHeight = document.body.offsetHeight;
                var scrollPercent = (scrollPosition / (documentHeight - windowHeight)) * 100;

                // Si el usuario ha llegado al 85% del final de la página, muestra la flecha
                if (scrollPercent > 85) {
                    scrollArrow.style.opacity = 1;
                } else {
                    scrollArrow.style.opacity = 0;
                }
            });

            // Desplazar suavemente hacia arriba al hacer clic en la flecha
            document.addEventListener("click", function (e) {
                if (e.target.classList.contains('arrow')) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            });
        })
        .catch(error => console.error('Error al cargar el componente de flecha de desplazamiento:', error));

    // Cargar y agregar el contenido del complemento social
    fetch('./components/social/social.html')
        .then(response => response.text())
        .then(data => {
            const fragment = document.createRange().createContextualFragment(data);
            document.getElementById('social-componente').appendChild(fragment);
        })
        .catch(error => console.error('Error al cargar el componente social:', error));

    // Cargar y agregar el contenido del complemento donacion flotante
    fetch('./components/donacion/donacion.html')
        .then(response => response.text())
        .then(data => {
            const fragment = document.createRange().createContextualFragment(data);
            document.getElementById('donacion-componente').appendChild(fragment);
        })
        .catch(error => console.error('Error al cargar el componente donacion:', error));

    // Cargar y agregar el contenido del complemento accesibilidad
    fetch('./components/discapacidad/discapacidad.html')
        .then(response => response.text())
        .then(data => {
            const fragment = document.createRange().createContextualFragment(data);
            document.getElementById('discapacidad-componente').appendChild(fragment);
            // Script para controlar la visibilidad del panel de accesibilidad
            document.getElementById('accessibility-button').addEventListener('click', function () {
                var panel = document.getElementById('accessibility-panel');
                var button = document.getElementById('accessibility-button');
                // Alternar la clase 'active' en el panel y el botón para controlar la visibilidad
                panel.classList.toggle('active');
                button.classList.toggle('active');
            });

            // Funcionalidad general para activar el aumento de letra
            document.getElementById('increase-font').addEventListener('click', function () {
                var body = document.querySelector('body');
                var currentFontSize = parseFloat(window.getComputedStyle(body, null).getPropertyValue('font-size'));
                var increment = 2; // Definir el incremento en píxeles

                // Calcular el nuevo tamaño de fuente
                var newFontSize = currentFontSize + increment;

                // Aplicar el nuevo tamaño de fuente al cuerpo
                body.style.fontSize = newFontSize + 'px';

                // Aplicar el nuevo tamaño de fuente a todos los elementos secundarios, excluyendo el botón y el panel de accesibilidad
                var elements = document.querySelectorAll('body *:not(#accessibility-button):not(#accessibility-button *):not(#accessibility-panel):not(#accessibility-panel *)');
                for (var i = 0; i < elements.length; i++) {
                    var currentElementFontSize = parseFloat(window.getComputedStyle(elements[i], null).getPropertyValue('font-size'));
                    elements[i].style.fontSize = (currentElementFontSize + increment) + 'px';
                }
            });



            // Funcionalidad general para activar la disminución de letra
            document.getElementById('decrease-font').addEventListener('click', function () {
                var body = document.querySelector('body');
                var currentFontSize = parseFloat(window.getComputedStyle(body, null).getPropertyValue('font-size'));
                var decrement = 2; // Definir el decremento en píxeles

                // Calcular el nuevo tamaño de fuente
                var newFontSize = currentFontSize - decrement;

                // Aplicar el nuevo tamaño de fuente al cuerpo
                body.style.fontSize = newFontSize + 'px';

                // Aplicar el nuevo tamaño de fuente a todos los elementos secundarios, excluyendo el botón y el panel de accesibilidad
                var elements = document.querySelectorAll('body *:not(#accessibility-button):not(#accessibility-button *):not(#accessibility-panel):not(#accessibility-panel *)');
                for (var i = 0; i < elements.length; i++) {
                    var currentElementFontSize = parseFloat(window.getComputedStyle(elements[i], null).getPropertyValue('font-size'));
                    elements[i].style.fontSize = (currentElementFontSize - decrement) + 'px';
                }
            });



            // Funcionalidad general para activar el contraste de daltonismo
// Variable para almacenar los estilos originales de los elementos
var originalStyles = new Map();

// Función para restaurar los estilos originales de los elementos
function restoreOriginalStyles() {
    originalStyles.forEach(function(styles, element) {
        Object.assign(element.style, styles);
    });
}

// Evento para alternar entre el modo de contraste y el estado normal
var contrastMode = false; // Variable para controlar el estado del modo de contraste

document.getElementById('toggle-contrast').addEventListener('click', function () {
    if (!contrastMode) {
        // Aplicar los cambios de color para daltonismo
        var elements = document.querySelectorAll('*');
        elements.forEach(function (element) {
            // Guardar los estilos originales del elemento
            originalStyles.set(element, {
                backgroundColor: element.style.backgroundColor,
                color: element.style.color
            });

            // Cambiar los colores para simular daltonismo
            element.style.backgroundColor = '#f0f0f0'; // Fondo más claro
            element.style.color = '#333'; // Texto más oscuro

            if (element.classList.contains('boton')) {
                element.style.backgroundColor = '#6495ED'; // Cambiar el color de fondo del botón
                element.style.color = '#fff'; // Texto más claro en el botón
            }
            if (element.classList.contains('enlace')) {
                element.style.color = '#800080'; // Cambiar el color de los enlaces
            }
        });

        // Actualizar el estado del modo de contraste
        contrastMode = true;
    } else {
        // Restaurar los estilos originales
        restoreOriginalStyles();

        // Actualizar el estado del modo de contraste
        contrastMode = false;
    }

    // Mantener visible la barra de accesibilidad
    var accessibilityPanel = document.getElementById('accessibility-panel');
    accessibilityPanel.style.display = 'block';
});


            //Funconalidad general para activar el aumento de contenido
            // Variable para almacenar el estado del zoom
            var isZoomed = false;

            document.getElementById('toggle-cursor').addEventListener('click', function () {
                // Cambiar el tamaño del cursor aumentando o disminuyendo el zoom
                if (isZoomed) {
                    document.body.style.zoom = '100%'; // Restablecer el zoom
                } else {
                    document.body.style.zoom = '120%'; // Aumentar el zoom
                }

                // Alternar el estado del zoom
                isZoomed = !isZoomed;

                // Mantener visible la barra de accesibilidad
                var accessibilityPanel = document.getElementById('accessibility-panel');
                accessibilityPanel.style.display = 'block';
            });

            // Variable para almacenar el estado del narrador
            var isNarrating = false;
            var synth = window.speechSynthesis;
            var utterance;

            document.getElementById('toggle-narrator').addEventListener('click', function () {
                if (!isNarrating) {
                    // Crear una nueva instancia de SpeechSynthesisUtterance
                    utterance = new SpeechSynthesisUtterance(document.body.innerText);
                    utterance.lang = 'es-ES'; // Configurar el idioma a español

                    // Iniciar la narración
                    synth.speak(utterance);
                    isNarrating = true;
                } else {
                    // Detener la narración
                    synth.cancel();
                    isNarrating = false;
                }

                // Mantener visible la barra de accesibilidad
                var accessibilityPanel = document.getElementById('accessibility-panel');
                accessibilityPanel.style.display = 'block';
            });

            // Funconalidad para restablecer los estilos
            document.getElementById('reset-styles').addEventListener('click', function () {
                document.body.style.fontSize = '';
                var elements = document.querySelectorAll('body *');
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.fontSize = '';
                }
                restoreOriginalStyles();
                document.body.style.zoom = '100%';
                if (isNarrating) {
                    synth.cancel();
                    isNarrating = false;
                }
                clickCountIncrease = 0;
                clickCountDecrease = 0;
                contrastMode = false;
                isZoomed = false;
                var accessibilityPanel = document.getElementById('accessibility-panel');
                accessibilityPanel.style.display = 'block';
            });

        })
        .catch(error => console.error('Error al cargar el componente access:', error));

});
//Restablecer el desplazamiento a la parte superior de la página
// window.addEventListener('load', () => {
//     window.scrollTo(0, 0);
// });
