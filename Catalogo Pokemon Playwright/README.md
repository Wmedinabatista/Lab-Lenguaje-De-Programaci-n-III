# Pokédex: pruebas automatizadas de UI y API

Proyecto académico desarrollado con HTML, CSS, JavaScript, Node.js, Playwright y PokéAPI.

## Funcionalidades

- Catálogo inicial de Pokémon.
- Búsqueda por nombre.
- Consulta de detalles (tipo, altura, peso, experiencia base y habilidades).
- Mensajes para resultados y errores de búsqueda.
- Navegación entre Inicio, Catálogo y Acerca de.

## Tecnologías

- HTML, CSS y JavaScript
- Node.js y npm
- Playwright Test
- PokéAPI: https://pokeapi.co/

## Requisitos previos

Instala Node.js en una versión LTS compatible con Playwright. Comprueba la instalación desde la terminal:

```bash
node -v
npm -v
```

## Instalación

Abre la carpeta del proyecto en Visual Studio Code y ejecuta en la terminal:

```bash
npm install
npx playwright install chromium
```

## Ejecutar la aplicación

```bash
npm start
```

Abre http://localhost:4173 en el navegador. Para detener el servidor, vuelve a la terminal y presiona `Ctrl + C`.

## Ejecutar las pruebas

Todas las pruebas:

```bash
npm test
```

Solo las pruebas de interfaz:

```bash
npm run test:ui
```

Solo las pruebas de API:

```bash
npm run test:api
```

Abrir el reporte HTML después de ejecutar las pruebas:

```bash
npm run report
```

## Casos automatizados

### Interfaz de usuario (UI)
- UI-01: carga de página, título y secciones.
- UI-02: navegación entre secciones.
- UI-03: búsqueda de Pikachu.
- UI-04: apertura y cierre de detalles.
- UI-05: búsqueda sin resultados.

### API
- API-01: HTTP 200, tipo de contenido JSON y propiedades de Pikachu.
- API-02: HTTP 200 y estructura JSON de la lista.
- API-03: HTTP 404 para un Pokémon inexistente.

## Evidencias

Las pruebas guardan capturas de ejemplo en `artifacts/` cuando se ejecutan. El reporte HTML se genera en `playwright-report/`. Las carpetas generadas están excluidas de Git para evitar subir resultados temporales; si el profesor pide evidencia, puedes adjuntar las capturas y el reporte por separado o ajustar `.gitignore`.

## Publicar en GitHub

1. Crea un repositorio público en GitHub.
2. Abre la terminal dentro de esta carpeta.
3. Ejecuta los comandos, sustituyendo `USUARIO` por tu usuario de GitHub y `REPOSITORIO` por el nombre del repositorio:

```bash
git init
git add .
git commit -m "Proyecto de pruebas UI y API con Playwright"
git branch -M main
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

Si Git solicita identidad, configura tu nombre y correo con `git config --global user.name "Tu Nombre"` y `git config --global user.email "tu-correo"`. No compartas contraseñas ni tokens.

## Nota

Las pruebas de API requieren conexión a Internet y dependen de la disponibilidad de PokéAPI. Los resultados deben verificarse ejecutando el proyecto en el equipo antes de entregar.
