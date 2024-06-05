// Funciones de utilidad

// Función para cargar un componente desde una ruta y agregarlo al DOM
function fetchAndAppendComponent(componentId, componentPath, callback) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            const fragment = document.createRange().createContextualFragment(data);
            document.getElementById(componentId).appendChild(fragment);
            if (callback) callback();
        })
        .catch(error => console.error(`Error al cargar el componente ${componentId}:`, error));
}

// Función para agregar un event listener a un botón
function addEventListenerToButton(buttonId, event, callback) {
    document.getElementById(buttonId).addEventListener(event, callback);
}

// Función para agregar un event listener al objeto window
function addEventListenerToWindow(event, callback) {
    window.addEventListener(event, callback);
}

// Cargar componentes
document.addEventListener('DOMContentLoaded', function () {
    // Componentes y sus rutas
    const components = [
        { id: 'navbar-componente', path: './components/navbar/navbar.html' },
        { id: 'banner-componente', path: './components/swiper/banner.html', callback: initializeSwiper },
        { id: 'footer-componente', path: './components/footer/footer.html' },
        { id: 'scroll-arrow-componente', path: './components/scroll-arrow/scroll-arrow.html', callback: addScrollArrowFunctionality },
        { id: 'social-componente', path: './components/social/social.html' },
        { id: 'donacion-componente', path: './components/donacion/donacion.html' },
        { id: 'discapacidad-componente', path: './components/discapacidad/discapacidad.html', callback: addAccessibilityFunctionality }
    ];

    // Cargar componentes
    components.forEach(component => {
        fetchAndAppendComponent(component.id, component.path, component.callback);
    });
});

// Funcionalidades específicas de los componentes
// Función para inicializar Swiper
function initializeSwiper() {
    new Swiper(".swiper", {
        direction: "horizontal",
        loop: true,
        allowTouchMove: true,
        effect: "fade",
        autoplay: { delay: 6000 },
        keyboard: { enabled: true },
        pagination: { el: ".swiper-pagination", clickable: true, dynamicBullets: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
    });
}

// Función para agregar funcionalidad de flecha de desplazamiento
function addScrollArrowFunctionality() {
    addEventListenerToWindow("scroll", function () {
        const scrollArrow = document.querySelector('.scroll-arrow');
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.offsetHeight;
        const scrollPercent = (scrollPosition / (documentHeight - windowHeight)) * 100;

        if (scrollPercent > 85) {
            scrollArrow.style.opacity = 1;
        } else {
            scrollArrow.style.opacity = 0;
        }
    });

    addEventListenerToButton("scroll-arrow-componente", "click", function (e) {
        if (e.target.classList.contains('arrow')) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });
}

// Función para agregar funcionalidades de accesibilidad
function addAccessibilityFunctionality() {
    // Funcionalidad para mostrar/ocultar panel de accesibilidad
    addEventListenerToButton("accessibility-button", "click", function () {
        const panel = document.getElementById('accessibility-panel');
        const button = document.getElementById('accessibility-button');
        panel.classList.toggle('active');
        button.classList.toggle('active');
    });

    // Funcionalidades de ajuste de aumento de tamaño de fuente
    addEventListenerToButton("increase-font", "click", function () {
        changeFontSize(2);
    });

    // Funcionalidades de ajuste de disminución de tamaño de fuente
    addEventListenerToButton("decrease-font", "click", function () {
        changeFontSize(-2);
    });

    // Funcionalidad de cambio de contraste
    addEventListenerToButton("toggle-contrast", "click", function () {
        toggleContrast();
    });

    // Funcionalidad de cambio de zoom
    addEventListenerToButton("toggle-cursor", "click", function () {
        toggleZoom();
    });

    // Funcionalidad del narrador
    addEventListenerToButton("toggle-narrator", "click", function () {
        toggleNarrator();
    });

    // Funcionalidad para restablecer estilos
    addEventListenerToButton("reset-styles", "click", function () {
        resetStyles();
    });

    // Función para cambiar el tamaño de la fuente (Incremento)
    function changeFontSize(increment) {
        const body = document.querySelector('body');
        let currentFontSize = parseFloat(window.getComputedStyle(body, null).getPropertyValue('font-size'));
        currentFontSize += increment;
        body.style.fontSize = currentFontSize + 'px';

        const elements = document.querySelectorAll('body *:not(#accessibility-button):not(#accessibility-button *):not(#accessibility-panel):not(#accessibility-panel *)');
        elements.forEach(element => {
            let currentElementFontSize = parseFloat(window.getComputedStyle(element, null).getPropertyValue('font-size'));
            currentElementFontSize += increment;
            element.style.fontSize = currentElementFontSize + 'px';
        });
    }

    // Función para alternar el modo de contraste
    let contrastMode = false;
    const originalStyles = new Map();

    function toggleContrast() {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (!contrastMode) {
                originalStyles.set(element, {
                    backgroundColor: element.style.backgroundColor,
                    color: element.style.color
                });

                element.style.backgroundColor = '#f0f0f0';
                element.style.color = '#333';

                if (element.classList.contains('boton')) {
                    element.style.backgroundColor = '#6495ED';
                    element.style.color = '#fff';
                }
                if (element.classList.contains('enlace')) {
                    element.style.color = '#800080';
                }
            } else {
                restoreOriginalStyles();
            }
        });

        contrastMode = !contrastMode;
        const accessibilityPanel = document.getElementById('accessibility-panel');
        accessibilityPanel.style.display = 'block';
    }

    // Función para restaurar los estilos originales
    function restoreOriginalStyles() {
        originalStyles.forEach((styles, element) => {
            Object.assign(element.style, styles);
        });
    }

    // Función para alternar el zoom
    let isZoomed = false;

    function toggleZoom() {
        if (isZoomed) {
            document.body.style.zoom = '100%';
        } else {
            document.body.style.zoom = '120%';
        }

        isZoomed = !isZoomed;
        const accessibilityPanel = document.getElementById('accessibility-panel');
        accessibilityPanel.style.display = 'block';
    }

    // Función para alternar el narrador
    let isNarrating = false;
    let synth = window.speechSynthesis;
    let utterance;

    function toggleNarrator() {
        if (!isNarrating) {
            utterance = new SpeechSynthesisUtterance(document.body.innerText);
            utterance.lang = 'es-ES';
            synth.speak(utterance);
            isNarrating = true;
        } else {
            synth.cancel();
            isNarrating = false;
        }

        const accessibilityPanel = document.getElementById('accessibility-panel');
        accessibilityPanel.style.display = 'block';
    }

    // Función para restablecer estilos
    function resetStyles() {
        document.body.style.fontSize = '';
        const elements = document.querySelectorAll('body *');
        elements.forEach(element => {
            element.style.fontSize = '';
        });
        restoreOriginalStyles();
        document.body.style.zoom = '100%';
        if (isNarrating) {
            synth.cancel();
            isNarrating = false;
        }
        contrastMode = false;
        isZoomed = false;
        const accessibilityPanel = document.getElementById('accessibility-panel');
        accessibilityPanel.style.display = 'block';
    }
}

// Otras funcionalidades globales...

