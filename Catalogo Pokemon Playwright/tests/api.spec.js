const { test, expect } = require("@playwright/test");

const API_BASE = "https://pokeapi.co/api/v2";

test("API-01: un Pokémon existente responde HTTP 200 y JSON válido", async ({ request }) => {
const response = await request.get(`${API_BASE}/pokemon/pikachu`);
expect(response.status()).toBe(200);
expect(response.headers()["content-type"]).toContain("application/json");

const data = await response.json();
expect(data.name).toBe("pikachu");
expect(data.id).toBe(25);
expect(Array.isArray(data.types)).toBeTruthy();
expect(data.sprites).toBeTruthy();

});

test("API-02: la lista de Pokémon incluye resultados y URLs", async ({ request }) => {
const response = await request.get(`${API_BASE}/pokemon?limit=5&offset=0`);
expect(response.status()).toBe(200);

const data = await response.json();
expect(data.count).toBeGreaterThan(0);
expect(data.results).toHaveLength(5);
expect(data.results[0]).toHaveProperty("name");
expect(data.results[0]).toHaveProperty("url");
expect(data.results[0].url).toContain("/pokemon/");

});

test("API-03: un Pokémon inexistente responde HTTP 404", async ({ request }) => {
const response = await request.get(`${API_BASE}/pokemon/pokemon-que-no-existe-xyz987`);
expect(response.status()).toBe(404);

});
