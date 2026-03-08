
// Abrir modal
document.getElementById('btnAgregar').onclick = () => {
    document.getElementById('modalEquipo').style.display = 'block';
};

// Ejemplo de cómo se vería una función para renderizar un equipo
function crearTarjetaEquipo(nombre, logo) {
    return `
        <div class="card">
            <img src="${logo}" alt="Logo">
            <h3>${nombre}</h3>
            <button>Ver Jugadores</button>
        </div>
    `;
}
