const productos = [
    {
        id: "ST95-001",
        nombre: "UNIT-01 SYSTEM",
        categoria: "remeras",
        precio: 35000,
        imagen: "img/remera1.jpg",
        descripcion: "Oversize - Algodón 24/1"
    },
    {
        id: "ST95-002",
        nombre: "NERV PROTO-HOODIE",
        categoria: "buzos",
        precio: 55000,
        imagen: "img/REMERA1.png",
        descripcion: "Friza Invisible - Premium"
    },
    {
        id: "ST95-003",
        nombre: "DATA-DISK STICKER",
        categoria: "accesorios",
        precio: 5000,
        imagen: "img/REMERA3.png",
        descripcion: "Holográfico - Water resistant"
    }
];

function cargarProductos() {
    // Limpiamos los contenedores por si acaso
    const contRemeras = document.getElementById('contenedor-remeras');
    const contBuzos = document.getElementById('contenedor-buzos');

    productos.forEach(prod => {
        // Creamos el diseño de la card (usando el código que ya teníamos)
        const cardHTML = `
            <div class="product-card">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <p class="price">$${prod.precio.toLocaleString()}</p>
                <a href="https://wa.me/54223XXXX?text=Pedido_${prod.id}" class="btn-ws">ADQUIRIR_DATA</a>
            </div>
        `;

        // Clasificamos: ¿A qué sección va?
        if (prod.categoria === "remeras") {
            contRemeras.innerHTML += cardHTML;
        } else if (prod.categoria === "buzos") {
            contBuzos.innerHTML += cardHTML;
        }
    });
}

// Ejecutamos la función al cargar la página
window.addEventListener('DOMContentLoaded', cargarProductos);