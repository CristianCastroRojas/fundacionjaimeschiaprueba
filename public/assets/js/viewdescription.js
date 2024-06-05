document.querySelectorAll('.mostrar-descripcion').forEach(btn => {
    btn.addEventListener('click', function () {
        // Obtener el elemento de la descripción
        const descripcion = this.parentNode.querySelector('.descripcion');
        // Alternar la clase "oculto" para mostrar o ocultar la descripción
        descripcion.classList.toggle('oculto');
        // Cambiar el texto del botón según el estado de la descripción
        this.textContent = descripcion.classList.contains('oculto') ? 'Leer noticia completa' : 'Mostrar menos';
    });
});

// Ajustar el tamaño del botón a 14px en pantallas de 768px o menos
if (window.innerWidth <= 768) {
    document.querySelectorAll('.mostrar-descripcion').forEach(btn => {
        btn.style.fontSize = '14px';
    });
}

// Ajustar el tamaño del botón a 12px en pantallas de 576px o menos
if (window.innerWidth <= 576) {
    document.querySelectorAll('.mostrar-descripcion').forEach(btn => {
        btn.style.fontSize = '12px';
    });
}

// Filtrar con barra de blog
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los elementos con la clase "filtro"
    var filtros = document.querySelectorAll(".filtro");

    // Agrega un evento de clic a cada elemento de filtro
    filtros.forEach(function (filtro) {
        filtro.addEventListener("click", function () {
            // Obtiene la categoría del filtro
            var categoria = filtro.getAttribute("data-categoria");

            // Selecciona todas las tarjetas de noticias
            var tarjetas = document.querySelectorAll(".card");

            // Itera sobre todas las tarjetas de noticias
            tarjetas.forEach(function (tarjeta) {
                // Si la categoría de la tarjeta de noticias coincide con la categoría del filtro o es "todos", muestra la tarjeta de noticias, de lo contrario, oculta la tarjeta de noticias
                if (categoria === "todos" || tarjeta.classList.contains("filtro-" + categoria)) {
                    tarjeta.parentElement.style.display = "block";
                } else {
                    tarjeta.parentElement.style.display = "none";
                }
            });
        });
    });
});

// Buscar con el label del blog
document.addEventListener("DOMContentLoaded", function () {
    // Función para filtrar las noticias por texto de búsqueda
    function filtrarNoticiasPorTexto(texto) {
        var noticias = document.querySelectorAll("#noticias-container .card");
        noticias.forEach(function (noticia) {
            var titulo = noticia.querySelector('.card-title').textContent.toLowerCase();
            var tarjeta = noticia.closest(".card");
            if (titulo.includes(texto.toLowerCase())) {
                tarjeta.style.display = "block";
            } else {
                tarjeta.style.display = "none";
            }
        });
    }

    // Función para manejar la presentación de resultados de búsqueda cuando se hace clic en el botón de búsqueda
    function handleSearch(event) {
        event.preventDefault();
        var searchText = document.getElementById("search-input").value.trim();
        filtrarNoticiasPorTexto(searchText);
    }

    // Agregar evento de clic para el botón de búsqueda
    document.getElementById("search-button").addEventListener("click", handleSearch);
});
