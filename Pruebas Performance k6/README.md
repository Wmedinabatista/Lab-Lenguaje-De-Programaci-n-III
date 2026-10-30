# Pruebas de Performance con k6

## Objetivo
Evaluar el comportamiento de una API HTTP pública bajo una carga pequeña y progresiva, midiendo tiempos de respuesta, solicitudes ejecutadas, tasa de errores y validaciones de las respuestas.

## Herramientas
- Visual Studio Code para editar y organizar los archivos.
- Grafana k6 para ejecutar la prueba.
- API pública JSONPlaceholder: https://jsonplaceholder.typicode.com/

## Escenario de prueba
El script `tests/performance.js` consulta dos rutas por iteración:
- `GET /posts/1`
- `GET /posts?userId=1`

La carga aumenta progresivamente hasta un máximo de 5 usuarios virtuales y luego disminuye:
- 5 segundos: 1 usuario virtual.
- 10 segundos: 3 usuarios virtuales.
- 10 segundos: 5 usuarios virtuales.
- 5 segundos: descenso a 0 usuarios virtuales.

Se añade una pausa breve entre iteraciones para evitar generar carga excesiva sobre la API pública.

## Métricas y criterios
- Total de solicitudes HTTP y solicitudes por segundo.
- Tiempo medio, mínimo, máximo y percentil 95 (p95).
- Tasa de solicitudes fallidas.
- Porcentaje de checks correctos.
- Iteraciones y máximo de usuarios virtuales.

Umbrales configurados en el script:
- Solicitudes fallidas: menos del 1%.
- Percentil 95 del tiempo de respuesta: menos de 1500 ms.
- Checks correctos: más del 95%.

Estos valores son objetivos didácticos definidos para la práctica; no son garantías del proveedor de la API.

## Requisitos previos
1. Instalar k6 siguiendo la documentación oficial: https://grafana.com/docs/k6/latest/set-up/install-k6/
2. Instalar Visual Studio Code.
3. Tener conexión a Internet para acceder a JSONPlaceholder.

## Cómo ejecutar en Visual Studio Code
1. Descomprime la carpeta del proyecto.
2. Abre Visual Studio Code y selecciona **Archivo > Abrir carpeta**.
3. Abre **Terminal > Nueva terminal**.
4. Comprueba la instalación ejecutando:

   ```powershell
   k6 version
   ```

5. Desde la carpeta raíz del proyecto, ejecuta:

   ```powershell
   k6 run tests/performance.js
   ```

6. Al terminar, k6 mostrará las métricas en la terminal y generará:
   - `results/resumen.json`
   - `results/reporte.html`

7. Abre `results/reporte.html` en un navegador y guarda una captura de pantalla del reporte y otra de los resultados de la terminal como evidencias de la práctica.

Si el comando `k6` no se reconoce, instala k6 y reinicia la terminal de Visual Studio Code.

## Cómo interpretar los resultados
- **Tiempo medio:** promedio de duración de las solicitudes HTTP.
- **p95:** el 95% de las solicitudes medidas terminó en ese tiempo o menos.
- **Solicitudes por segundo:** tasa de solicitudes HTTP durante la ejecución.
- **Tasa de fallos:** proporción de solicitudes que k6 clasificó como fallidas por error HTTP o de transporte.
- **Checks:** proporción de validaciones que pasaron; por ejemplo, que el estado sea 200 y que la respuesta tenga el formato esperado.

Si se cumple un umbral, significa que la medición quedó dentro del criterio definido para esta prueba. Si no se cumple, no implica automáticamente que la API esté caída: hay que revisar los resultados, la conexión y las condiciones de ejecución.

## Resultados y evidencias
Los archivos de `results` se crean o actualizan cuando ejecutes el script. No se incluyen cifras inventadas: los resultados definitivos deben proceder de tu propia ejecución.

Después de ejecutar la prueba, completa la explicación de resultados con datos reales:
1. Número total de solicitudes HTTP.
2. Tiempo medio y p95.
3. Porcentaje de solicitudes fallidas.
4. Cantidad de checks aprobados y fallidos.
5. Conclusión sobre los umbrales y el comportamiento observado.

## Alcance y uso responsable
Esta práctica utiliza una API pública de demostración y una carga deliberadamente pequeña. No aumentes el número de usuarios ni la duración sin necesidad ni realices pruebas de estrés sobre servicios que no administras o para los que no tienes autorización.

## Referencias
- Documentación de k6: https://grafana.com/docs/k6/latest/
- Primer script de k6: https://grafana.com/docs/k6/latest/get-started/write-your-first-test/
- Umbrales en k6: https://grafana.com/docs/k6/latest/using-k6/thresholds/
- JSONPlaceholder: https://jsonplaceholder.typicode.com/
