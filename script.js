// Espera a que todo el contenido del HTML se cargue
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Iniciar el reloj en vivo
    startLiveClock();
    
    // 2. Cargar la información de la IP
    loadIpInfo();

});

/**
 * Función 1: Inicia un reloj en vivo (Sin cambios)
 * Muestra fecha y hora actualizados (incluyendo milisegundos).
 */
function startLiveClock() {
    const dateElement = document.getElementById("current-date");
    
    // Esta función se ejecutará repetidamente
    function updateClock() {
        const now = new Date();

        // Formatear Fecha
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
        const year = now.getFullYear();

        // Formatear Hora
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        // padStart(3, '0') para asegurar 3 dígitos (ej. 005, 034, 123)
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

        // Combinar todo y actualizar el HTML
        dateElement.textContent = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}:${milliseconds}`;
    }
    
    // Llama a updateClock inmediatamente para no esperar,
    // y luego repítela cada 50 milisegundos para crear el efecto "en vivo".
    updateClock();
    setInterval(updateClock, 50); 
}


/**
 * Función 2: Obtiene la IP pública y la ubicación (ACTUALIZADA)
 */
function loadIpInfo() {
    const ipElement = document.getElementById("ip-info");
    ipElement.textContent = "Cargando IP...";

    // Usamos el servicio 'ipinfo.io' para obtener la IP y la geolocalización.
    fetch('https://ipinfo.io/json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta de red no fue OK');
            }
            return response.json();
        })
        .then(data => {
            // 'data' es un objeto con la información: data.ip, data.city, data.country
            const ip = data.ip;
            const city = data.city || 'Ubicación desconocida';
            const country = data.country || '';

            ipElement.textContent = `Tu IP Pública: ${ip} (desde ${city}, ${country})`;
        })
        .catch(error => {
            // --- INICIO DEL CAMBIO ---
            console.error('Error al obtener la IP:', error);
            // Muestra el error como en tu captura de pantalla
            ipElement.textContent = 'Tu IP Pública: (No se pudo obtener)';
            // --- FIN DEL CAMBIO ---
        });
}
// Espera a que todo el contenido del HTML se cargue
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Iniciar el reloj en vivo
    startLiveClock();
    
    // 2. Cargar la información de la IP
    loadIpInfo();

    // 3. --- INICIO DEL CAMBIO ---
    // Configurar el hover para el fondo
    setupBackgroundHover();
    // --- FIN DEL CAMBIO ---

});

/*
... (Aquí van las funciones startLiveClock() y loadIpInfo() existentes) ...
*/


/**
 * Función 3: NUEVA
 * Configura el evento hover en "Enlace 1" para cambiar el fondo del body.
 */
function setupBackgroundHover() {
    // Seleccionamos el enlace por el ID que pusimos en el HTML
    const enlace = document.getElementById("enlace-fondo-1");
    
    // Seleccionamos el body
    const body = document.body;

    // Asegurarnos de que el enlace existe antes de añadir eventos
    if (enlace) {
        
        // Evento cuando el cursor ENTRA en el enlace
        enlace.addEventListener("mouseenter", function() {
            body.classList.add("fondo-activo");
        });

        // Evento cuando el cursor SALE del enlace
        enlace.addEventListener("mouseleave", function() {
            body.classList.remove("fondo-activo");
        });
    }
}

