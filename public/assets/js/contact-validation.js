// JavaScript nativo para validación del formulario
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Seleccionamos el formulario por su ID
        var form = document.getElementById('contactForm');
        // Añadimos un listener para el evento 'submit'
        form.addEventListener('submit', function(event) {
            // Si el formulario no es válido, prevenimos el envío y detenemos la propagación del evento
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            // Añadimos la clase 'was-validated' al formulario para activar los estilos de Bootstrap
            form.classList.add('was-validated');
        }, false);
    }, false);
})();

//Validador de reCAPTCHA
// document.getElementById("contactForm").addEventListener("submit", function(event) {
//     var recaptchaResponse = grecaptcha.getResponse();
//     if (recaptchaResponse.length === 0) {
        // event.preventDefault(); // Evita que el formulario se envíe
//         alert("Por favor, completa el reCAPTCHA.");
//     }
// });
