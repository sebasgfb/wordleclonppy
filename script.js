// Variables
let intentos = 6;
const diccionario = ['MANOS', 'TIGRE', 'SILLA', 'FUEGO', 'COCHE', 'PERRO', 'GATOS', 'FLORES', 'MESAS', 'PATIO', 'LUNES', 'JUEGO', 'BEBES', 'RADIO', 'SOLAR', 'PULPO', 'CIELO', 'HOYOS', 'ROJOS', 'RELOJ'];
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const grid = document.getElementById("grid");
const guesses = document.getElementById("guesses");

// Obtener una palabra aleatoria del diccionario
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

// Función para terminar el juego
function terminar(mensaje) {
    input.disabled = true;
    button.disabled = true;
    guesses.innerHTML = mensaje;
}

// Función para validar el intento del usuario
function validarIntento(intento) {
    intento = intento.toUpperCase(); // Eliminar espacios en blanco y convertir a mayúsculas

    if (intento.length !== 5) {
        return false; // El intento no tiene 5 caracteres
    }

    return true; // El intento es válido
}

// Función para realizar un intento
function intentar() {
    const INTENTO = input.value.toUpperCase();

    if (!validarIntento(INTENTO)) {
        // Mostrar mensaje de error al usuario
        alert("El intento debe tener 5 caracteres.");
        return;
    }

    if (INTENTO === palabra) {
        terminar("<h1>¡GANASTE! 😀</h1>");
        return;
    }

    // Crear una nueva fila para mostrar los resultados
    const row = document.createElement('div');
    row.className = 'row';

    // Comparar cada letra del intento con la palabra y asignar estilos de color
    for (let i = 0; i < palabra.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter';

        if (INTENTO[i] === palabra[i]) { // VERDE
            span.innerHTML = INTENTO[i];
            span.style.backgroundColor = '#79b851';
        } else if (palabra.includes(INTENTO[i])) { // AMARILLO
            span.innerHTML = INTENTO[i];
            span.style.backgroundColor = '#f3c237';
        } else { // GRIS
            span.innerHTML = INTENTO[i];
            span.style.backgroundColor = '#a4aec4';
        }

        row.appendChild(span);
    }

    grid.appendChild(row);
    intentos--;

    if (intentos === 0) {
        terminar("<h1>¡PERDISTE! 😖</h1>");
    }
}

// Agregar evento al botón
button.addEventListener("click", intentar);
