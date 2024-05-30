document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.impacto-counter');
    const speed = 200; // La velocidad del contador

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Calcular la velocidad de incremento
            const inc = target / speed;

            // Comprobar si la cuenta actual es menor que el objetivo
            if (count < target) {
                // Añadir el incremento
                counter.innerText = Math.ceil(count + inc);
                // Llamar a la función de nuevo después de 1ms
                setTimeout(updateCount, 1);
            } else {
                // Si la cuenta ha alcanzado el objetivo, establecer el valor final
                counter.innerText = target;
            }
        };

        // Comprobar si el contador está en el viewport
        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        // Si el contador está en el viewport, iniciar la cuenta
        const runCounter = () => {
            if (isElementInViewport(counter)) {
                updateCount();
                // Eliminar el listener después de ejecutar una vez
                window.removeEventListener('scroll', runCounter);
            }
        };

        // Ejecutar el contador cuando se haga scroll
        window.addEventListener('scroll', runCounter);

        // Ejecutar el contador al cargar la página en caso de que el contador ya esté en el viewport
        runCounter();
    });
});







