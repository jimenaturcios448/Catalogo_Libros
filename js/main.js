const contenedor = document.getElementById("contenedor-libros");
const botones = document.querySelectorAll(".filtro-btn");

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
            <img src="${libro.imagen}" alt="Portada de ${libro.titulo}"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="icono-respaldo" style="display:none; background-color:${coloresPorGenero[libro.genero]}">📖</div>
        </div>
        <div class="libro-info">
            <h3>${libro.titulo}</h3>
            <p class="libro-autor">${libro.autor} — ${libro.anio}</p>
            <p class="libro-descripcion">${libro.descripcion}</p>
            <span class="libro-genero">${libro.genero}</span>
        </div>
    `;
    return card;
}

function mostrarLibros(genero) {
    contenedor.innerHTML = "";
    const librosFiltrados = genero === "todos"
        ? libros
        : libros.filter(libro => libro.genero === genero);

    librosFiltrados.forEach((libro, index) => {
        contenedor.appendChild(crearTarjeta(libro, index));
    });
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        botones.forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");
        mostrarLibros(boton.dataset.genero);
    });
});

mostrarLibros("todos");