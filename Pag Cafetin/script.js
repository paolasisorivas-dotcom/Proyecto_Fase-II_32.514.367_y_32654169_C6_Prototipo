document.addEventListener('DOMContentLoaded', function() {

    //Login
    var formLogin = document.getElementById('loginForm');
    if (formLogin) {
        formLogin.onsubmit = function(e) {
            e.preventDefault();
            var user = document.getElementById('usuario').value;
            var pass = document.getElementById('password').value;

            if (user == "adminRoot" && pass == "cafetinAdmin") {
                window.location.href = "admin.html";
            } else if (user == "caja_01" && pass == "Cajero#123") {
                window.location.href = "caja.html";
            } else if (user == "ClienteUCV" && pass == "Central_123") {
                window.location.href = "cliente.html";
            } else {
                alert("Usuario o clave incorrectos.");
            }
        };
    }

    //Parte del Admin
    var adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        //Eliminar productos 
        document.addEventListener('click', function(evento) {
            if (evento.target.classList.contains('botoneliminar')) {
                var producto = evento.target.closest('.productoadmin');
                if (confirm("¿Seguro que quieres quitar este producto?")) {
                    producto.remove();
                }
            }
        });

        //Añadir productos
        var btnAdd = document.getElementById('botagregar');
        if (btnAdd) {
            btnAdd.onclick = function() {
                var nom = document.getElementById('nombrenuevo').value;
                var pre = document.getElementById('precionuevo').value;
                var url = document.getElementById('imagenprod').value;

                if (nom && pre && url) {
                    var nuevaCaja = document.createElement('div');
                    nuevaCaja.className = 'productoadmin';
                    nuevaCaja.innerHTML = '<h3>' + nom + '</h3>' +
                                          '<img src="' + url + '">' +
                                          '<p>Precio: $' + pre + '</p>' +
                                          '<button class="botoneliminar">Eliminar producto</button>';
                    
                    document.getElementById('lista-gestion-deproductos').appendChild(nuevaCaja);
                    
                    
                    document.getElementById('nombrenuevo').value = "";
                    document.getElementById('precionuevo').value = "";
                    document.getElementById('imagenprod').value = "";
                } else {
                    alert("Por favor, llena todos los campos.");
                }
            };
        }
    }

    //Parte del ciente
    var seccionCliente = document.getElementById('Menu'); // ID de tu contenedor de productos
    if (seccionCliente) {
        var total = 0;
        var listaCarrito = document.getElementById('lista-carrito');
        var textoTotal = document.getElementById('precio-total');

        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('botonañadir')) {
                var productoPadre = e.target.closest('.producto');
                var nombreProd = productoPadre.querySelector('h3').innerText;
                var precioProd = parseFloat(productoPadre.querySelector('.precio').innerText);

                // Crear elemento en el carrito
                var li = document.createElement('li');
                li.innerText = nombreProd + " - $" + precioProd.toFixed(2);
                listaCarrito.appendChild(li);

                // Sumar al total
                total += precioProd;
                textoTotal.innerText = total.toFixed(2);
            }
        });

        var btnComprar = document.getElementById('botoncomprar');
        if (btnComprar) {
            btnComprar.onclick = function() {
                alert("¡Pedido enviado exitosamente! Pase por caja para cancelar.");
                location.reload();
            };
        }
    }

    //parte del Punto de venta
    window.emitirRecibo = function() {
        var divMensaje = document.getElementById('mensaje-recibido');
        if (divMensaje) {
            divMensaje.style.display = 'block'; 
            alert("Venta procesada. Imprimiendo recibo...");
        }
    };
});