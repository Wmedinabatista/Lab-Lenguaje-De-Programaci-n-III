const API_BASE = "https://pokeapi.co/api/v2";
const INITIAL_LIMIT = 12;
let offset = 0;
let displayedPokemon = [];
let searchMode = false;

const grid = document.querySelector("#pokemon-grid");
const statusMessage = document.querySelector("#status-message");
const countLabel = document.querySelector("#catalog-count");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#pokemon-search");
const clearButton = document.querySelector("#clear-search");
const loadMoreButton = document.querySelector("#load-more");
const dialog = document.querySelector("#pokemon-dialog");
const dialogContent = document.querySelector("#dialog-content");

function titleCase(value) {
return value.charAt(0).toUpperCase() + value.slice(1);

}

function imageFor(pokemon) {
return pokemon.sprites?.other?.["official-artwork"]?.front_default
|| pokemon.sprites?.front_default
|| "";

}

function renderCard(pokemon) {
const card = document.createElement("button");
card.type = "button";
card.className = "pokemon-card";
card.setAttribute("aria-label", `Ver detalles de ${pokemon.name}`);
const number = String(pokemon.id).padStart(3, "0");
const image = imageFor(pokemon);
const types = pokemon.types.map(item => `<span class="type-pill">${item.type.name}</span>`).join("");
card.innerHTML = `
<div class="pokemon-art">
<span class="pokemon-number">#${number}</span>
<img src="${image}" alt="${titleCase(pokemon.name)}" loading="lazy">
</div>
<div class="pokemon-info">
<h3>${titleCase(pokemon.name)}</h3>
<div class="type-list">${types}</div>
</div>`;
card.addEventListener("click", () => showDetails(pokemon));
return card;

}

function renderPokemon(items, append = false) {
if (!append) grid.replaceChildren();
items.forEach(pokemon => grid.appendChild(renderCard(pokemon)));
displayedPokemon = append ? [...displayedPokemon, ...items] : items;
countLabel.textContent = `${displayedPokemon.length} Pokémon mostrados`;

}

async function fetchPokemonDetails(url) {
const response = await fetch(url);
if (!response.ok) throw new Error(`La API respondió con HTTP ${response.status}`);
return response.json();

}

async function loadCatalog() {
searchMode = false;
loadMoreButton.hidden = false;
statusMessage.textContent = "Cargando Pokémon…";
try {
const response = await fetch(`${API_BASE}/pokemon?limit=${INITIAL_LIMIT}&offset=${offset}`);
if (!response.ok) throw new Error(`La API respondió con HTTP ${response.status}`);
const data = await response.json();
const items = await Promise.all(data.results.map(item => fetchPokemonDetails(item.url)));
renderPokemon(items, offset > 0);
statusMessage.textContent = `Se cargaron ${items.length} Pokémon correctamente.`;
loadMoreButton.hidden = false;
} catch (error) {
statusMessage.textContent = "No se pudo cargar el catálogo. Comprueba tu conexión e inténtalo de nuevo.";
countLabel.textContent = "Catálogo no disponible";
  
}

}

async function searchPokemon(name) {
const query = name.trim().toLowerCase();
if (!query) {
offset = 0;
await loadCatalog();
return;
  
}
  
searchMode = true;
loadMoreButton.hidden = true;
statusMessage.textContent = `Buscando "${query}"…`;
try {
const response = await fetch(`${API_BASE}/pokemon/${encodeURIComponent(query)}`);
if (response.status === 404) {
renderPokemon([]);
statusMessage.textContent = `No se encontró ningún Pokémon con el nombre "${query}".`;
countLabel.textContent = "0 resultados";
return;
    
}

if (!response.ok) throw new Error(`La API respondió con HTTP ${response.status}`);
const pokemon = await response.json();
renderPokemon([pokemon]);
statusMessage.textContent = `Resultado encontrado para "${query}".`;
} catch (error) {
renderPokemon([]);
statusMessage.textContent = "No se pudo realizar la búsqueda. Inténtalo de nuevo.";
countLabel.textContent = "Búsqueda no disponible";
  
}

}

function showDetails(pokemon) {
const types = pokemon.types.map(item => `<span class="type-pill">${item.type.name}</span>`).join("");
const image = imageFor(pokemon);
dialogContent.innerHTML = `
<div class="dialog-pokemon-art"><img src="${image}" alt="${titleCase(pokemon.name)}"></div>
<div class="dialog-details">
<p class="eyebrow">POKÉMON #${String(pokemon.id).padStart(3, "0")}</p>
<h2 id="dialog-name">${titleCase(pokemon.name)}</h2>
<div class="type-list">${types}</div>
<div class="dialog-stats">
<div class="stat"><span>Altura</span><strong>${(pokemon.height / 10).toFixed(1)} m</strong></div>
<div class="stat"><span>Peso</span><strong>${(pokemon.weight / 10).toFixed(1)} kg</strong></div>
<div class="stat"><span>Experiencia base</span><strong>${pokemon.base_experience ?? "No disponible"}</strong></div>
<div class="stat"><span>Habilidades</span><strong>${pokemon.abilities.length}</strong></div>
</div>
</div>`;
if (typeof dialog.showModal === "function") dialog.showModal();
else dialog.setAttribute("open", "");

}

searchForm.addEventListener("submit", event => {
event.preventDefault();
offset = 0;
searchPokemon(searchInput.value);

});

clearButton.addEventListener("click", () => {
searchInput.value = "";
offset = 0;
loadCatalog();

});

loadMoreButton.addEventListener("click", () => {
offset += INITIAL_LIMIT;
loadCatalog();

});

document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
if (event.target === dialog) dialog.close();

});

loadCatalog();
