# GameZone — Menú dinámico con JSON

Proyecto académico para demostrar la creación de un menú dinámico desde una estructura de datos JSON. Incluye submenús, formulario para agregar/editar/eliminar opciones, validaciones, diseño responsive y persistencia local mediante `localStorage`.

## Tecnologías
- HTML5
- CSS3
- JavaScript
- JSON
- GitHub

## Cómo ejecutar en Visual Studio Code
1. Descarga y descomprime el proyecto.
2. Abre la carpeta `GameZone` en Visual Studio Code.
3. Instala la extensión **Live Server** si todavía no la tienes.
4. Haz clic derecho en `index.html` y selecciona **Open with Live Server**.
5. La página se abrirá en el navegador. Es necesario usar un servidor local porque el proyecto carga `data/menu.json` mediante `fetch()`.

## Funcionalidad
- Carga de opciones iniciales desde `data/menu.json`.
- Generación del menú y submenús desde los datos.
- Formulario para agregar, editar y eliminar opciones.
- Identificadores generados automáticamente.
- Validación de nombres y destinos; se bloquean protocolos distintos de HTTP/HTTPS y enlaces locales.
- Actualización de la interfaz sin recargar la página.
- Conservación de cambios en el almacenamiento local del navegador.
- Diseño adaptable a computadoras, tabletas y teléfonos.
- Botón para restaurar el menú de ejemplo.

## Nota importante sobre el almacenamiento
El archivo `data/menu.json` contiene los datos iniciales. Para permitir modificaciones desde una página web estática sin backend, los cambios se guardan en `localStorage`. Por eso, las modificaciones solo están disponibles en el navegador donde se hicieron y no modifican físicamente el archivo JSON ni se sincronizan automáticamente entre dispositivos. Para escribir directamente en el archivo JSON se necesitaría un servidor con una operación de escritura.

Para volver a los datos originales, utiliza **Restaurar** en el panel de administración. Si ya existen datos guardados en el navegador, estos tienen prioridad sobre el JSON inicial hasta que se restaure el menú.

## Conceptos de intercambio de datos

### API
Una API (interfaz de programación de aplicaciones) define las reglas y operaciones que permiten a un programa solicitar funciones o datos a otro programa. Por ejemplo, una aplicación de videojuegos podría consultar una API para obtener información de juegos, usuarios o puntuaciones.

### REST
REST es un estilo arquitectónico para diseñar servicios web orientados a recursos. Es común que utilice HTTP y métodos como `GET`, `POST`, `PUT` y `DELETE`. Una API REST puede entregar los datos de un menú en JSON para que la interfaz los represente.

### SOAP
SOAP es un protocolo de mensajería para intercambiar información estructurada entre sistemas. Sus mensajes suelen expresarse en XML y pueden utilizarse en servicios empresariales que requieren contratos y reglas formales de comunicación.

### JSON
JSON (JavaScript Object Notation) es un formato de texto ligero para representar datos mediante objetos, arreglos y valores. Es fácil de leer y se integra naturalmente con JavaScript. En GameZone, `data/menu.json` almacena las opciones iniciales del menú.

### XML
XML (Extensible Markup Language) representa información mediante etiquetas organizadas en una estructura jerárquica. Puede transportar datos entre aplicaciones y es utilizado, por ejemplo, en mensajes SOAP y en diferentes formatos de configuración.

### GraphQL
GraphQL es un lenguaje de consulta y un entorno de ejecución para APIs. Permite que el cliente especifique los campos de datos que necesita. A diferencia de esta práctica, que lee un archivo JSON local, una aplicación real podría consultar un servidor GraphQL para obtener categorías y detalles de videojuegos.

### Relación entre los conceptos
Las APIs permiten establecer la comunicación entre aplicaciones; REST y GraphQL son enfoques para diseñar interfaces de consulta, mientras que SOAP define un protocolo de mensajería. JSON y XML son formatos que pueden representar los datos intercambiados. No son conceptos equivalentes: una API puede utilizar un formato de datos concreto según su diseño. En este proyecto se usa JSON como fuente de datos del menú.

## Uso de inteligencia artificial
Se utilizó ChatGPT como herramienta de apoyo para interpretar los requisitos, proponer la organización de archivos, asistir con el código y preparar explicaciones técnicas. El proyecto debe ser revisado y comprendido por el estudiante antes de su entrega.

## Publicar en GitHub
1. Crea un repositorio público llamado `GameZone`.
2. Sube la carpeta del proyecto, incluyendo `index.html`, `css/`, `js/`, `data/` y `README.md`.
3. Abre el repositorio desde una ventana privada o sin iniciar sesión para comprobar que es público.
4. Copia el enlace del repositorio para entregarlo al profesor.

## Estructura
```text
GameZone/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── data/
│   └── menu.json
└── README.md
```
