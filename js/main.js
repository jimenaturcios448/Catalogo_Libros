const contenedor = document.getElementById("contenedor-libros");
const botones = document.querySelectorAll(".filtro-btn");
const buscador = document.getElementById("buscador-libros");

let generoActual = "todos";

const coloresPorGenero = {
    clasico: "#8b6f47",
    fantasia: "#3d5a80",
    misterio: "#6b3f4d"
};

function crearTarjeta(libro, index) {

    const card = document.createElement("div");

    card.className = "libro-card";

    card.style.animationDelay = `${index * 0.06}s`;

    card.innerHTML = `
        <div class="libro-portada" style="background-color:${coloresPorGenero[libro.genero]}">

            <img 
                src="${libro.imagen}" 
                alt="Portada de ${libro.titulo}"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            >

            <div 
                class="icono-respaldo" 
                style="display:none; background-color:${coloresPorGenero[libro.genero]}"
            >
                📖
            </div>

        </div>

        <div class="libro-info">

            <h3>${libro.titulo}</h3>

            <p class="libro-autor">
                ${libro.autor} — ${libro.anio}
            </p>

            <p class="libro-descripcion">
                ${libro.descripcion}
            </p>

            <span class="libro-genero">
                ${libro.genero}
            </span>

            <button class="btn-detalles" data-titulo="${libro.titulo}">
                Ver detalles
            </button>

        </div>
    `;

    return card;
}

function mostrarLibros(genero = generoActual) {
    contenedor.innerHTML = "";

    generoActual = genero;

    const textoBusqueda = buscador.value.toLowerCase().trim();

    const librosFiltrados = libros.filter(libro => {

        const coincideGenero =
            genero === "todos" ||
            libro.genero === genero;

        const coincideBusqueda =
            libro.titulo.toLowerCase().includes(textoBusqueda) ||
            libro.autor.toLowerCase().includes(textoBusqueda);

        return coincideGenero && coincideBusqueda;
    });

    if (librosFiltrados.length === 0) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <div class="sin-resultados-icono">📚</div>
                <h3>No encontramos ningún libro</h3>
                <p>Prueba buscando otro título o autor.</p>
            </div>
        `;
        return;
    }

    librosFiltrados.forEach((libro, index) => {
        contenedor.appendChild(crearTarjeta(libro, index));
    });
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {

        botones.forEach(b => b.classList.remove("activo"));

        boton.classList.add("activo");

        generoActual = boton.dataset.genero;

        mostrarLibros(generoActual);
    });
});

buscador.addEventListener("input", () => {
    mostrarLibros(generoActual);
});

mostrarLibros("todos");

// ==============================
// MODAL DE DETALLES
// ==============================

const modal = document.getElementById("modal-libro");
const modalInfo = document.getElementById("modal-info");
const cerrarModal = document.getElementById("cerrar-modal");

contenedor.addEventListener("click", (evento) => {

    if (!evento.target.classList.contains("btn-detalles")) {
        return;
    }

    const titulo = evento.target.dataset.titulo;

    const libro = libros.find(
        libro => libro.titulo === titulo
    );

    if (!libro) {
        return;
    }

    modalInfo.innerHTML = `
        <div class="modal-libro">

            <div class="modal-portada">

                <img 
                    src="${libro.imagen}"
                    alt="Portada de ${libro.titulo}"
                >

            </div>

            <div class="modal-datos">

                <span class="modal-genero">
                    ${libro.genero}
                </span>

                <h2>${libro.titulo}</h2>

                <p class="modal-autor">
                    ${libro.autor}
                </p>

                <p class="modal-anio">
                    Año de publicación: ${libro.anio}
                </p>

                <p class="modal-descripcion">
                    ${libro.descripcion}
                </p>

            </div>

        </div>
    `;

    modal.classList.add("mostrar");
});


// Cerrar con el botón X
cerrarModal.addEventListener("click", () => {
    modal.classList.remove("mostrar");
});


// Cerrar haciendo clic fuera del contenido
modal.addEventListener("click", (evento) => {

    if (evento.target === modal) {
        modal.classList.remove("mostrar");
    }

});