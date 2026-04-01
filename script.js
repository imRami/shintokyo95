    const log = document.getElementById('console-log');
    const messages = [
        "> Link established with Sector-MDQ",
        "> Scanning inventory...",
        "> 1995 Archive accessible",
        "> System Status: NOMINAL"
    ];
    let i = 0;

    setInterval(() => {
        log.innerHTML += `<br> ${messages[i % messages.length]}`;
        i++;
        // Limpiar para que no sea infinito
        if(i > 10) { log.innerHTML = "> System Refresh..."; i = 0; }
    }, 4000);

    function updateClock() {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ":" + 
                 now.getMinutes().toString().padStart(2, '0') + ":" + 
                 now.getSeconds().toString().padStart(2, '0');
    document.getElementById('live-clock').innerText = time;
}

setInterval(updateClock, 1000);
updateClock(); // Carga inicial

window.onload = () => {
    // Esto hace que la barra empiece en 0 y suba hasta el valor real
    const bar = document.querySelector('.progress-fill');
    const finalWidth = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
        bar.style.width = finalWidth;
    }, 500);
};

window.onload = () => {
    // 1. Ocultar scrollbar al inicio
    document.body.classList.add('loading');
    
    // 2. Mostrar líneas de texto secuencialmente
    const lines = document.querySelectorAll('.loader-line');
    let delay = 300; // Delay inicial en milisegundos

    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, delay * (index + 1));
    });

    // 3. Ocultar la pantalla de carga tras 3 segundos
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.classList.add('fade-out');
        document.body.classList.remove('loading'); // Devolver scrollbar
    }, 3000); // 3 segundos de carga total
};



//COMANDOS (ESCENCIAL)

// Esperar a que cargue la página
window.addEventListener('load', () => {
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    const output = body.querySelector('.output');

    // Enfocar el input automáticamente
    input.focus();

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toUpperCase();
            input.value = ''; // Limpiar input

            // 1. Mostrar el comando escrito en la salida
            output.innerHTML += `<div><span class="prompt">></span> ${command}</div>`;

            // 2. Procesar el comando
            let response = '';

            switch (command) {
                case 'HELP':
                    response = `
                        Available Commands:<br>
                        - HELP: Show this list.<br>
                        - CLEAR: Clear the terminal screen.<br>
                        - ARCHIVE: List current collection.<br>
                        - STATUS: System status report.<br>
                        - MDQ_HUB: Local information (Mar del Plata).<br>
                        - MOTHERLODE: ???
                    `;
                    break;
                case 'CLEAR':
                    output.innerHTML = ''; // Limpiar salida
                    return; // Salir del switch

                    //Colocar stock disponible
                case 'ARCHIVE':
                    response = `
                        > Accessing ARCHIVE_95...<br>
                        - [UNIT-01 System Status] - AVAILABLE<br>
                        - [CYBERIA Archive] - AVAILABLE<br>
                        - [PROTO-TYPE Studio] - AVAILABLE
                    `;
                    break;
                case 'STATUS':
                    response = `> System Status: NOMINAL.<br>> Connection Sector-7: ESTABLISHED.`;
                    break;
                case 'MDQ_HUB':
                    response = `> Sector: MAR DEL PLATA.<br>> Status: ONLINE.<br>> Local Pickup available.`;
                    break;
                case 'MOTHERLODE':
                    // EL EASTER EGG DE DESCUENTO
                    response = `
                        <span style="color: #ff0055; font-weight: bold;">
                        > !!! SECURITY BREACH !!!<br>
                        > ACCESS GRANTED.<br>
                        > 10% DISCOUNT CODE ACTIVATED: SHINTOKYO10<br>
                        > Use this code when ordering via WhatsApp.
                        </span>
                    `;
                    break;
                case '':
                    response = ''; // No hacer nada si está vacío
                    break;
                default:
                    response = `> ERROR: Command '${command}' not recognized. Type 'HELP'.`;
            }

            // 3. Mostrar la respuesta
            if (response) {
                output.innerHTML += `<div>${response}</div><br>`;
            }

            // 4. Scroll automático hacia abajo
            body.scrollTop = body.scrollHeight;
        }
    });

    // Mantener el input enfocado si hacen clic en la terminal
    body.addEventListener('click', () => {
        input.focus();
    });
});

function filterCategory(category) {
    // 1. Actualizar visualmente los botones
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 2. Filtrar los productos
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        if (category === 'all') {
            card.classList.remove('hidden');
        } else {
            // Si la card tiene la clase (remeras, buzos, etc), la muestra
            if (card.classList.contains(category)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

//FUNCION DEL FAQ
function toggleFaq(button) {
    const item = button.parentElement;
    
    // Si querés que se cierre el resto al abrir una:
    /*
    document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
    });
    */

    item.classList.toggle('active');
}

window.addEventListener('load', () => {
    // Inicia el movimiento automático para cada track
    startAutoScan('track-remeras');
    startAutoScan('track-buzos');
});

