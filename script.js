// Importar Firebase (usa la versión CDN para GitHub Pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1kDgjZm2f-1fb6HabfHo_9WiR8S43vx4",
  authDomain: "torneovdq.firebaseapp.com",
  projectId: "torneovdq",
  storageBucket: "torneovdq.firebasestorage.app",
  messagingSenderId: "442728471476",
  appId: "1:442728471476:web:7702017d0d7f63d9d370e1",
  measurementId: "G-401DFQEZFX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Función para calcular la tabla automáticamente
function actualizarTabla(partidos) {
    let tabla = {}; // Objeto para guardar estadísticas por equipo

    Object.values(partidos).forEach(partido => {
        const { equipoLocal, golesLocal, equipoVisitante, golesVisitante } = partido;

        // Inicializar equipos si no existen en el objeto
        [equipoLocal, equipoVisitante].forEach(eq => {
            if (!tabla[eq]) tabla[eq] = { pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, pts:0 };
        });

        // Sumar goles y partidos jugados
        tabla[equipoLocal].pj++;
        tabla[equipoVisitante].pj++;
        tabla[equipoLocal].gf += golesLocal;
        tabla[equipoLocal].gc += golesVisitante;
        tabla[equipoVisitante].gf += golesVisitante;
        tabla[equipoVisitante].gc += golesLocal;

        // Lógica de puntos: Victoria (3), Empate (1), Derrota (0)
        if (golesLocal > golesVisitante) {
            tabla[equipoLocal].pg++; tabla[equipoLocal].pts += 3;
            tabla[equipoVisitante].pp++;
        } else if (golesLocal < golesVisitante) {
            tabla[equipoVisitante].pg++; tabla[equipoVisitante].pts += 3;
            tabla[equipoLocal].pp++;
        } else {
            tabla[equipoLocal].pe++; tabla[equipoLocal].pts += 1;
            tabla[equipoVisitante].pe++; tabla[equipoVisitante].pts += 1;
        }
    });

    renderizarTabla(tabla);
}
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const db = getDatabase();

// Función para guardar el resultado (Solo para la página admin.html)
if (document.getElementById('btnGuardar')) {
    document.getElementById('btnGuardar').addEventListener('click', () => {
        const partido = {
            local: document.getElementById('eqLocal').value,
            gLocal: parseInt(document.getElementById('golesLocal').value),
            visita: document.getElementById('eqVisita').value,
            gVisita: parseInt(document.getElementById('golesVisita').value),
            fecha: new Date().toLocaleDateString()
        };

        push(ref(db, 'partidos'), partido)
            .then(() => alert("Resultado guardado con éxito"))
            .catch((error) => console.error("Error:", error));
    });
}
