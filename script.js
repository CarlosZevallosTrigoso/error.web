// Espera a que todo el contenido del HTML se cargue antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Función para cargar la fecha actual
    loadCurrentDate();
    
    // 2. Función para cargar la información de la IP pública
    loadIpInfo();

});

/**
 * Función 1: Obtiene la fecha actual y la formatea
 */
function loadCurrentDate() {
    const dateElement = document.getElementById("current-date");
    
    const today = new Date();
    
    // Formateamos los números para que tengan un '0' delante si son menores de 10
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
    const year = today.getFullYear();

    // Formato: dd-mm-año
    const formattedDate = `${day}-${month}-${year}`;
    
    dateElement.textContent = formattedDate;
}

/**
 * Función 2: Obtiene la IP pública y la ubicación usando un servicio externo (API)
 */
function loadIpInfo() {
    const ipElement = document.getElementById("ip-info");
    ipElement.textContent = "Cargando IP...";

    // Usamos el servicio 'ipinfo.io' para obtener la IP y la geolocalización.
    // fetch() es la forma moderna de JavaScript para hacer peticiones a servidores.
    fetch('https://ipinfo.io/json')
        .then(response => {
            // Comprobamos si la respuesta del servidor es buena
            if (!response.ok) {
                throw new Error('Respuesta de red no fue OK');
            }
            return response.json(); // Convertimos la respuesta a formato JSON
        })
        .then(data => {
            // 'data' es un objeto con la información: data.ip, data.city, data.country
            console.log("Datos de IP:", data);
            
            const ip = data.ip;
            const city = data.city || 'Ubicación desconocida';
            const country = data.country || '';

            ipElement.textContent = `Tu IP Pública: ${ip} (desde ${city}, ${country})`;
        })
        .catch(error => {
            // Si algo falla (ej. no hay internet), mostramos un error en la consola y en la web
            console.error('Error al obtener la IP:', error);
            ipElement.textContent = 'Tu IP Pública: (No se pudo obtener)';
        });
}
