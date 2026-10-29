const { test, expect } = require("@playwright/test");
const fs = require("node:fs");

// Crear la carpeta donde se guardarán las capturas de pantalla.
fs.mkdirSync("artifacts", { recursive: true });

test("UI-01: la página principal carga el título y las secciones", async ({ page }) => {
await page.goto("/");

await expect(page).toHaveTitle(/Pokédex\s*\|\s*Catálogo Pokémon/);
await expect(
page.getByRole("heading", { name: /Tu próxima aventura/i })
).toBeVisible();

await expect(
page.getByRole("heading", { name: "Explora el catálogo" })
).toBeVisible();

await expect(
page.getByRole("navigation", { name: "Navegación principal" })
).toBeVisible();

await page.screenshot({
path: "artifacts/ui-01-home.png",
fullPage: true
  
});

});

test("UI-02: la navegación lleva al catálogo y a la sección Acerca de", async ({ page }) => {
await page.goto("/");

// Seleccionar únicamente el enlace principal llamado "Catálogo".
await page.getByRole("link", { name: "Catálogo", exact: true }).click();

await expect(page).toHaveURL(/#catalogo$/);

await expect(
page.getByRole("heading", { name: "Explora el catálogo" })
).toBeVisible();

await page.getByRole("link", { name: "Acerca de", exact: true }).click();

await expect(page).toHaveURL(/#acerca$/);

await expect(
page.getByRole("heading", { name: "Una Pokédex para explorar" })
).toBeVisible();

});

test("UI-03: la búsqueda encuentra a Pikachu", async ({ page }) => {
await page.goto("/");

const search = page.getByRole("searchbox", {
name: "Buscar Pokémon por nombre"
  
});

await search.fill("pikachu");

await page.getByRole("button", { name: "Buscar", exact: true }).click();

await expect(
page.getByRole("heading", { name: "Pikachu" })
).toBeVisible({ timeout: 20000 });

await expect(page.locator("#status-message"))
.toContainText(/Resultado encontrado/i);

await expect(page.locator(".pokemon-card")).toHaveCount(1);

await page.screenshot({
path: "artifacts/ui-03-busqueda-pikachu.png",
fullPage: true
  
});

});

test("UI-04: la tarjeta permite abrir y cerrar los detalles del Pokémon", async ({ page }) => {
await page.goto("/");

await page.getByRole("searchbox", {
name: "Buscar Pokémon por nombre"
}).fill("bulbasaur");

await page.getByRole("button", { name: "Buscar", exact: true }).click();

const card = page.getByRole("button", {
name: "Ver detalles de bulbasaur"
  
});

await expect(card).toBeVisible({ timeout: 20000 });

await card.click();

const dialog = page.getByRole("dialog");

await expect(dialog).toBeVisible();

// Buscar Bulbasaur únicamente dentro de la ventana de detalles.
await expect(
dialog.getByRole("heading", { name: "Bulbasaur" })
).toBeVisible();

await expect(dialog.getByText("Altura")).toBeVisible();

await dialog.getByRole("button", {
name: "Cerrar detalles"
}).click();

await expect(dialog).not.toBeVisible();

});

test("UI-05: una búsqueda inexistente muestra un mensaje adecuado", async ({ page }) => {
await page.goto("/");

await page.getByRole("searchbox", {
name: "Buscar Pokémon por nombre"
}).fill("pokemon-que-no-existe-xyz987");

await page.getByRole("button", { name: "Buscar", exact: true }).click();

await expect(page.locator("#status-message"))
.toContainText(/No se encontró ningún Pokémon/i, {
timeout: 20000
    
});

await expect(page.locator(".pokemon-card")).toHaveCount(0);

});