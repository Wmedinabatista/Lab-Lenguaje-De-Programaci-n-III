# Análisis de resultados de la prueba de rendimiento

## Análisis de los resultados

Durante la prueba de rendimiento realizada con la herramienta k6 sobre la API pública JSONPlaceholder, se ejecutaron **230 solicitudes HTTP** distribuidas en **115 iteraciones**, con un máximo de **cinco usuarios virtuales**. La prueba permitió evaluar los tiempos de respuesta, la tasa de errores y el comportamiento de las validaciones configuradas en el script.

Los resultados mostraron un tiempo medio de respuesta de **57,26 milisegundos**, un tiempo mínimo de **48,02 milisegundos** y un tiempo máximo de **106,12 milisegundos**. El percentil 95 fue de **68,80 milisegundos**, lo que indica que aproximadamente el 95 % de las solicitudes medidas se completó en ese tiempo o menos. Además, se registró una tasa de solicitudes fallidas del **0 %** y un porcentaje de validaciones aprobadas del **100 %**.

Al comparar estos resultados con los umbrales establecidos en el script, se comprobó que los tres criterios se cumplieron: la tasa de errores fue inferior al 1 %, el percentil 95 se mantuvo por debajo de 1.500 milisegundos y las validaciones superaron el 95 % de aprobación.

## En mi opinión

La práctica me permitió comprobar cómo se realizan las pruebas de rendimiento de una API utilizando k6 y Visual Studio Code. A partir de los resultados obtenidos, pude observar que JSONPlaceholder respondió satisfactoriamente bajo la carga moderada aplicada, con tiempos de respuesta bajos y sin solicitudes HTTP fallidas registradas durante la ejecución.

También pude comprender la importancia de medir el tiempo de respuesta, la cantidad de solicitudes ejecutadas, la tasa de errores y el porcentaje de validaciones correctas para evaluar el comportamiento de un servicio web.

Sin embargo, debido a que la prueba utilizó un máximo de cinco usuarios virtuales, los resultados corresponden únicamente a las condiciones de esta ejecución. Para determinar cómo se comportaría el servicio ante una carga mayor, sería necesario realizar pruebas adicionales con diferentes niveles de concurrencia.
