# GameVault — Práctica 5.2: Pruebas BDD con Gherkin

## Descripción
GameVault es una tienda virtual de videojuegos de demostración. Esta práctica valida el comportamiento del carrito de compras con escenarios BDD escritos en Gherkin y automatizados con Cucumber y Playwright.

## Funcionalidad principal
Añadir videojuegos disponibles al carrito y comprobar que el sistema actualiza la selección correctamente o informa cuando un juego está agotado.

## Escenarios y qué valida cada uno
1. **Añadir un videojuego disponible:** valida que un producto disponible se agrega y que el contador se actualiza.
2. **Añadir dos videojuegos diferentes:** valida que el carrito acepta varios productos y refleja ambos.
3. **Videojuego agotado:** valida que el sistema rechaza un producto sin existencias y muestra un aviso.
4. **Carrito vacío:** valida el estado inicial del carrito y que no se pueda continuar una compra sin productos.
5. **Añadir dos veces el mismo videojuego:** valida que la cantidad del mismo producto se incrementa correctamente.

Los escenarios incluyen resultados exitosos y casos negativos, y usan Given/Dado, When/Cuando y Then/Entonces.

## Requisitos previos
- Node.js LTS instalado.
- Visual Studio Code.
- Conexión a internet durante la instalación de dependencias.

## Cómo abrir y ejecutar
1. Descomprime la carpeta `GameVault`.
2. En Visual Studio Code, selecciona **Archivo > Abrir carpeta** y abre `GameVault`.
3. Abre una terminal integrada: **Terminal > Nueva terminal**.
4. Instala las dependencias:
```bash
npm install
```
5. Instala el navegador de Playwright:
```bash
npx playwright install chromium
```
6. En la primera terminal, inicia la aplicación:
```bash
npm start
```
7. Abre `http://127.0.0.1:3000` en el navegador para ver la tienda.
8. Mantén esa terminal abierta. Abre una segunda terminal en Visual Studio Code y ejecuta:
```bash
npm test
```

Cucumber leerá los escenarios de `features/carrito.feature` y Playwright automatizará las acciones en el navegador. Cada escenario debe terminar con estado `passed` si se ejecuta correctamente.

## Estructura del proyecto
```text
GameVault/
├── index.html
├── styles.css
├── app.js
├── server.js
├── package.json
├── README.md
└── features/
    ├── carrito.feature
    ├── support/
    │   └── world.js
    └── step_definitions/
        └── carrito.steps.js
```

## Alcance de la demostración
El proyecto es una práctica académica: no incluye base de datos, cuentas de usuario ni una pasarela real de pago. El botón de compra solo muestra un aviso. `Galaxy Drift` está configurado intencionalmente sin existencias para poder probar el caso de error.

## Nota de implementación
Los escenarios están en español y usan la palabra clave `# language: es` para que Gherkin reconozca `Característica`, `Escenario`, `Dado`, `Cuando`, `Entonces` y `Y`.
