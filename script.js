function abrirModal(nombreEquipo) {
    const modal = document.getElementById("miModal");
    const lista = document.getElementById("lista-jugadores");
    const titulo = document.getElementById("modal-titulo");

    titulo.innerText = "Jugadores de " + nombreEquipo;
    modal.style.display = "block";

    // Ejemplo de datos (puedes cambiar esto según el equipo)
    lista.innerHTML = `
        <tr>
            <td><img src="https://via.placeholder.com/40" style="border-radius:50%"></td>
            <td>Marlon Yajamin</td>
            <td>22</td>
            <td>25</td>
        </tr>
        <tr>
            <td><img src="https://via.placeholder.com/40" style="border-radius:50%"></td>
            <td>Jonathan Lucumi</td>
            <td>28</td>
            <td>9</td>
        </tr>
    `;
}

function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
}

// Cerrar si se hace clic fuera de la caja blanca
window.onclick = function(event) {
    const modal = document.getElementById("miModal");
    if (event.target == modal) {
        cerrarModal();
    }
}
