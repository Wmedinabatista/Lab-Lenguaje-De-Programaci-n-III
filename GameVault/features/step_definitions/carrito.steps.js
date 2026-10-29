const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const assert = require("node:assert/strict");

setDefaultTimeout(30 * 1000);

Before(async function () {
this.browser = await chromium.launch({ headless: true });
this.page = await this.browser.newPage();
await this.page.goto("http://127.0.0.1:3000");

});

After(async function () {
if (this.browser) await this.browser.close();

});

Given("que estoy en el catálogo de GameVault", async function () {
await this.page.goto("http://127.0.0.1:3000");
await this.page.locator("#catalogo").waitFor();

});

When("añado {string} al carrito", async function (gameName) {
const card = this.page.locator(".game-card").filter({ has: this.page.getByRole("heading", { name: gameName }) });
await card.getByRole("button", { name: "Añadir +" }).click();

});

When("intento añadir {string} al carrito", async function (gameName) {
const card = this.page.locator(".game-card").filter({ has: this.page.getByRole("heading", { name: gameName }) });
await card.getByRole("button", { name: "Añadir +" }).click();

});

When("abro el carrito", async function () {
await this.page.getByRole("button", { name: /Ver carrito/ }).click();

});

Then("el contador del carrito debe mostrar {string}", async function (count) {
await this.page.waitForFunction(expected => document.querySelector("#cart-count").textContent === expected, count);
assert.equal(await this.page.locator("#cart-count").textContent(), count);

});

Then("debo ver un aviso que indica que el juego está agotado", async function () {
const toast = this.page.locator("#toast");
await toast.waitFor({ state: "visible" });
await this.page.waitForFunction(() => document.querySelector("#toast").textContent.includes("agotado"));
assert.match(await toast.textContent(), /agotado/i);

});

Then("debo ver el mensaje {string}", async function (message) {
await this.page.getByRole("button", { name: /Ver carrito/ }).click();
await this.page.locator("#cart-panel").waitFor({ state: "visible" });
assert.equal(await this.page.locator("#cart-message").textContent(), message);

});

Then("el botón para continuar la compra debe estar deshabilitado", async function () {
assert.equal(await this.page.locator("#checkout-button").isDisabled(), true);

});

Then("debo ver {string} en el carrito", async function (itemText) {
await this.page.getByRole("button", { name: /Ver carrito/ }).click();
await this.page.locator("#cart-panel").waitFor({ state: "visible" });
await this.page.locator("#cart-items").getByText(itemText, { exact: false }).waitFor();
assert.ok(await this.page.locator("#cart-items").getByText(itemText, { exact: false }).isVisible());

});
