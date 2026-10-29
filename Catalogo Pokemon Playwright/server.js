const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const contentTypes = {
".html": "text/html; charset=utf-8",
".css": "text/css; charset=utf-8",
".js": "text/javascript; charset=utf-8",
".json": "application/json; charset=utf-8",
".png": "image/png",
".jpg": "image/jpeg",
".svg": "image/svg+xml"

};

http.createServer((req, res) => {
const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
const requested = pathname === "/" ? "/index.html" : pathname;
const filePath = path.resolve(root, `.${requested}`);

if (!filePath.startsWith(root + path.sep) && filePath !== path.join(root, "index.html")) {
res.writeHead(403);
return res.end("Forbidden");
  
}

fs.readFile(filePath, (error, content) => {
if (error) {
res.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
return res.end(error.code === "ENOENT" ? "Not found" : "Server error");
    
}
    
res.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream" });
res.end(content);

});

}).listen(port, () => {
console.log(`Pokédex disponible en http://localhost:${port}`);

});
