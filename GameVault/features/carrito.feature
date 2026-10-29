# language: es
Característica: Gestión del carrito de videojuegos
Como cliente de GameVault
Quiero añadir videojuegos al carrito
Para revisar mi selección antes de comprar

Escenario: Añadir un videojuego disponible al carrito
Dado que estoy en el catálogo de GameVault
Cuando añado "Shadow Quest" al carrito
Entonces el contador del carrito debe mostrar "1"
Y debo ver "Shadow Quest" en el carrito

Escenario: Añadir dos videojuegos diferentes
Dado que estoy en el catálogo de GameVault
Cuando añado "Shadow Quest" al carrito
Y añado "Street Rivals" al carrito
Entonces el contador del carrito debe mostrar "2"
Y debo ver "Shadow Quest" en el carrito
Y debo ver "Street Rivals" en el carrito

Escenario: No permitir añadir un videojuego agotado
Dado que estoy en el catálogo de GameVault
Cuando intento añadir "Galaxy Drift" al carrito
Entonces el contador del carrito debe mostrar "0"
Y debo ver un aviso que indica que el juego está agotado

Escenario: Mantener el carrito vacío al abrirlo sin productos
Dado que estoy en el catálogo de GameVault
Cuando abro el carrito
Entonces debo ver el mensaje "Tu carrito está vacío."
Y el botón para continuar la compra debe estar deshabilitado

Escenario: Actualizar la cantidad al añadir dos veces el mismo videojuego
Dado que estoy en el catálogo de GameVault
Cuando añado "Shadow Quest" al carrito
Y añado "Shadow Quest" al carrito
Entonces el contador del carrito debe mostrar "2"
Y debo ver "Shadow Quest × 2" en el carrito
