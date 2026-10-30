import http from 'k6/http';
import { check, sleep } from 'k6';

// API pública seleccionada: JSONPlaceholder.
// Se puede cambiar la URL sin editar el script:
// Windows PowerShell: $env:BASE_URL="https://jsonplaceholder.typicode.com"; k6 run tests/performance.js
const BASE_URL = __ENV.BASE_URL || 'https://jsonplaceholder.typicode.com';

export const options = {
// Carga moderada y progresiva para no saturar innecesariamente una API pública.
stages: [
{ duration: '5s', target: 1 },
{ duration: '10s', target: 3 },
{ duration: '10s', target: 5 },
{ duration: '5s', target: 0 },
  
],
  
thresholds: {
// Objetivos de referencia para esta práctica, no garantías del proveedor.
http_req_failed: ['rate<0.01'],
http_req_duration: ['p(95)<1500'],
checks: ['rate>0.95'],

},

};

export default function () {
const postResponse = http.get(`${BASE_URL}/posts/1`, {
tags: { endpoint: 'post_by_id' },
  
});

check(postResponse, {
'GET /posts/1 devuelve estado 200': (response) => response.status === 200,
'GET /posts/1 devuelve JSON': (response) =>
response.headers['Content-Type'] &&
response.headers['Content-Type'].includes('application/json'),
'GET /posts/1 contiene id': (response) => {
try {
return response.json('id') === 1;
} catch (_) {
return false;
      
}

},
  
});

const listResponse = http.get(`${BASE_URL}/posts?userId=1`, {
tags: { endpoint: 'posts_by_user' },
  
});

check(listResponse, {
'GET /posts?userId=1 devuelve estado 200': (response) => response.status === 200,
'GET /posts?userId=1 devuelve una lista JSON': (response) => {
try {
return Array.isArray(response.json());
} catch (_) {
return false;

}
    
},
  
});

// Pausa breve para evitar un patrón de solicitudes innecesariamente agresivo.
sleep(0.5);

}

function metricValue(data, metricName, valueName) {
const metric = data.metrics[metricName];
if (!metric || !metric.values || metric.values[valueName] === undefined) {
return 'No disponible';
  
}
  
const value = metric.values[valueName];
return typeof value === 'number' ? value.toFixed(2) : String(value);

}

export function handleSummary(data) {
const summary = {
generated_at: new Date().toISOString(),
target: BASE_URL,
note: 'Resultados generados por la ejecución real de k6; no son datos de ejemplo.',
metrics: {
total_http_requests: data.metrics.http_reqs?.values?.count ?? null,
requests_per_second: data.metrics.http_reqs?.values?.rate ?? null,
failed_request_rate: data.metrics.http_req_failed?.values?.rate ?? null,
response_time_avg_ms: data.metrics.http_req_duration?.values?.avg ?? null,
response_time_min_ms: data.metrics.http_req_duration?.values?.min ?? null,
response_time_max_ms: data.metrics.http_req_duration?.values?.max ?? null,
response_time_p95_ms: data.metrics.http_req_duration?.values?.['p(95)'] ?? null,
checks_passed_rate: data.metrics.checks?.values?.rate ?? null,
iterations: data.metrics.iterations?.values?.count ?? null,
virtual_users_max: data.metrics.vus_max?.values?.max ?? null,
    
},
  
};

const m = summary.metrics;
const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Reporte de pruebas de performance</title>
<style>
body{font-family:Arial,sans-serif;max-width:900px;margin:40px auto;padding:0 18px;color:#202124}
h1{color:#174ea6}table{border-collapse:collapse;width:100%;margin:20px 0}
th,td{border:1px solid #d0d7de;padding:10px;text-align:left}
th{background:#f3f6fa}small{color:#5f6368}
</style>
</head>
<body>
<h1>Reporte de pruebas de performance con k6</h1>
<p><strong>API evaluada:</strong> ${BASE_URL}</p>
<p><strong>Fecha de generación:</strong> ${summary.generated_at}</p>
<p>Este reporte se genera automáticamente al ejecutar el script. Utiliza únicamente métricas de esa ejecución.</p>
<table>
<thead><tr><th>Métrica</th><th>Resultado</th></tr></thead>
<tbody>
<tr><td>Solicitudes HTTP totales</td><td>${m.total_http_requests ?? 'No disponible'}</td></tr>
<tr><td>Solicitudes por segundo</td><td>${m.requests_per_second == null ? 'No disponible' : m.requests_per_second.toFixed(2)}</td></tr>
<tr><td>Porcentaje de solicitudes fallidas</td><td>${m.failed_request_rate == null ? 'No disponible' : (m.failed_request_rate * 100).toFixed(2) + '%'}</td></tr>
<tr><td>Tiempo medio de respuesta</td><td>${m.response_time_avg_ms == null ? 'No disponible' : m.response_time_avg_ms.toFixed(2) + ' ms'}</td></tr>
<tr><td>Tiempo mínimo de respuesta</td><td>${m.response_time_min_ms == null ? 'No disponible' : m.response_time_min_ms.toFixed(2) + ' ms'}</td></tr>
<tr><td>Tiempo máximo de respuesta</td><td>${m.response_time_max_ms == null ? 'No disponible' : m.response_time_max_ms.toFixed(2) + ' ms'}</td></tr>
<tr><td>Percentil 95 (p95)</td><td>${m.response_time_p95_ms == null ? 'No disponible' : m.response_time_p95_ms.toFixed(2) + ' ms'}</td></tr>
<tr><td>Porcentaje de checks correctos</td><td>${m.checks_passed_rate == null ? 'No disponible' : (m.checks_passed_rate * 100).toFixed(2) + '%'}</td></tr>
<tr><td>Iteraciones completadas</td><td>${m.iterations ?? 'No disponible'}</td></tr>
<tr><td>Máximo de usuarios virtuales</td><td>${m.virtual_users_max ?? 'No disponible'}</td></tr>
</tbody></table>
<h2>Interpretación</h2>
<p>Compara el resultado del p95 con el objetivo configurado de 1500 ms y la tasa de errores con el objetivo inferior al 1%. Si los umbrales no se cumplen, revisa la conectividad, el estado del servicio y las métricas completas de k6. Una prueba contra una API pública refleja las condiciones de esa ejecución y no demuestra por sí sola el rendimiento de una aplicación propia.</p>
<small>Generado por tests/performance.js mediante k6 handleSummary().</small>
</body></html>`;

return {
'results/resumen.json': JSON.stringify(summary, null, 2),
'results/reporte.html': html,
  
};

}
