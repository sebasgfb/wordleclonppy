// Variables
let intentos = 6;
let palabra = '';
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const grid = document.getElementById("grid");
const guesses = document.getElementById("guesses");
const diccionario = ['MANOS', 'TIGRE', 'SILLA', 'FUEGO', 'COCHE', 'PERRO', 'GATOS', 'MESAS', 'PATIO', 'LUNES', 'JUEGO', 'BEBES', 'RADIO', 'SOLAR', 'PULPO', 'CIELO', 'HOYOS', 'ROJOS', 'RELOJ']

// Obtener palabra aleatoria en español de longitud 5
function obtenerPalabra() {
    fetch("https://random-word-api.herokuapp.com/word?length=5&lang=es")
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            console.log(palabra);
        })
        .catch(error => {
            console.log(error);
            palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
            console.log(palabra);
        });
}

// Agregar evento al botón
button.addEventListener("click", intentar);

// Agregar evento a enter
input.addEventListener("keyup", function(event) {
    // Verificar enter ( tecla código 13)
    if (event.keyCode === 13) {
        event.preventDefault(); // Prevenir el comportamiento por defecto de enter
        intentar(); // Llamar a la función intentar()
    }
});

// Funcion para terminar el juego y cambiar el boton a nuevo juego.
function terminar(mensaje) {
    input.disabled = true;
    guesses.innerHTML = mensaje;
    button.textContent = "Nuevo Juego c:";
    button.addEventListener("click", function() {location.reload();});
}

function errorCaracteres(mensaje) {
    guesses.innerHTML = mensaje;
}
function limpiarError() {
    guesses.innerHTML = "";
}

// Funcion para validar el intento del usuario
function validarIntento(intento) {
    intento = intento.toUpperCase(); // Convertir a mayúsculas

    if (intento.length !== 5) {
        return false; // El intento no tiene 5 caracteres
    }

    return true; // El intento es válido
}

// Funcion para realizar un intento
function intentar() {
    limpiarError(); //Esto se usa para limpiar el error de 5 caracteres en caso de que este mostrandose.
    const INTENTO = input.value.toUpperCase();

    if (!validarIntento(INTENTO)) {
        // Mostrar mensaje de error al usuario
        errorCaracteres("El intento debe tener 5 caracteres :)");
        return;
    }

    if (INTENTO === palabra) {
        terminar("<p class='mensaje'>¡GANASTE! 😀</p>");
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
        terminar("<p class='mensaje'>¡PERDISTE! 😖</p>");
    }
}

// Obtener la primera palabra antes de iniciar el juego
obtenerPalabra();
