const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const mimeTypes = {
".html": "text/html; charset=utf-8",
".css": "text/css; charset=utf-8",
".js": "text/javascript; charset=utf-8",
".json": "application/json; charset=utf-8"

};

const server = http.createServer((req, res) => {
let requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
if (requestPath === "/") requestPath = "/index.html";
const filePath = path.join(root, requestPath);

if (!filePath.startsWith(root)) {
res.writeHead(403);
return res.end("Acceso denegado");
  
}

fs.readFile(filePath, (error, data) => {
if (error) {
res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
return res.end("Archivo no encontrado");
    
}
    
res.writeHead(200, {
"Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream"

});

res.end(data);
  
});

});

const port = process.env.PORT || 3000;
server.listen(port, "127.0.0.1", () => {
console.log(`GameVault está disponible en http://127.0.0.1:${port}`);

});
