// Interacciones del sitio demostrativo Banco Horizonte Dominicano

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const navLinks = document.querySelectorAll(".nav-link");

// Abrir y cerrar el menú de navegación
menuToggle.addEventListener("click", () => {
const isOpen = mainNav.classList.toggle("open");

menuToggle.setAttribute("aria-expanded", String(isOpen));
menuToggle.setAttribute(
"aria-label",
isOpen ? "Cerrar menú" : "Abrir menú"
);

});

// Cerrar el menú al seleccionar una opción
navLinks.forEach((link) => {
link.addEventListener("click", () => {
mainNav.classList.remove("open");

menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-label", "Abrir menú");
});

});

// Resaltar en el menú la sección que se está visualizando
const sectionObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (!entry.isIntersecting) return;

const id = entry.target.id;

navLinks.forEach((link) => {
const active = link.getAttribute("href") === `#${id}`;
link.classList.toggle("active", active);

});

});
  
},
  
{

rootMargin: "-35% 0px -55% 0px"
  
}

);

document
.querySelectorAll("main section[id], .about-section[id]")
.forEach((section) => {
sectionObserver.observe(section);
  
});

// Completar el tema del formulario al seleccionar un producto o servicio
document.querySelectorAll("[data-service]").forEach((link) => {
link.addEventListener("click", () => {
const topic = document.querySelector("#topic");
const wanted = link.dataset.service;

const matchingOption = [...topic.options].find(
(option) => option.textContent.trim() === wanted

);

if (matchingOption) {
topic.value = matchingOption.value;
} else if (wanted.toLowerCase().includes("débito")) {
topic.value = "Tarjetas";
} else if (wanted.toLowerCase().includes("meta")) {
topic.value = "Educación financiera";
} else if (wanted.toLowerCase().includes("tarjeta")) {
topic.value = "Tarjetas";

}

});

});

// Consejos de educación financiera
const tips = {
budget: {
title: "Empieza con un presupuesto sencillo",
body:
"Durante un mes, registra tus ingresos y gastos. Separa los pagos esenciales, los gastos variables y el ahorro. Revisa el resultado cada semana y ajusta el plan sin perder de vista tus necesidades."
  
},

savings: {
title: "Convierte el ahorro en un hábito",
body:
"Elige una meta específica, calcula cuánto necesitas y fija una fecha realista. Si puedes, aparta una cantidad al recibir tus ingresos. La regularidad suele ser más útil que esperar a tener una suma grande."
  
},

safety: {
title: "Protege tus datos financieros",
body:
"Nunca compartas contraseñas, PIN ni códigos de un solo uso. No abras enlaces inesperados que pidan información bancaria. En caso de duda, cierra el mensaje y contacta a la entidad mediante sus canales oficiales."
  
}

};

// Elementos de la ventana modal de consejos
const tipDialog = document.querySelector("#tipDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogBody = document.querySelector("#dialogBody");

// Mostrar el consejo seleccionado
document.querySelectorAll("[data-modal]").forEach((button) => {
button.addEventListener("click", () => {
const tip = tips[button.dataset.modal];

if (!tip) return;

dialogTitle.textContent = tip.title;
dialogBody.textContent = tip.body;

tipDialog.showModal();
  
});

});

// Cerrar la ventana modal mediante sus botones
document
.querySelector("#dialogClose")
.addEventListener("click", () => {
tipDialog.close();
  
});

document
.querySelector("#dialogOk")
.addEventListener("click", () => {
tipDialog.close();
  
});

// Cerrar la ventana modal al hacer clic fuera de su contenido
tipDialog.addEventListener("click", (event) => {
if (event.target === tipDialog) {
tipDialog.close();
  
}

});

// Formulario demostrativo de contacto
// Valida los campos, pero no envía ni almacena información.
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

contactForm.addEventListener("submit", (event) => {
event.preventDefault();

if (!contactForm.reportValidity()) return;

const name = document.querySelector("#fullName").value.trim();
const topic = document.querySelector("#topic").value;

formStatus.textContent =
`¡Gracias, ${name}! Tu consulta de ejemplo sobre "${topic}" está lista. ` +
"Este formulario es demostrativo y no envía información.";

contactForm.reset();

});

// Botón para regresar al principio de la página
const backToTop = document.querySelector("#backToTop");

window.addEventListener(
"scroll",
() => {
backToTop.classList.toggle("visible", window.scrollY > 450);
  
},
  
{ passive: true }

);

backToTop.addEventListener("click", () => {
window.scrollTo({
top: 0,
behavior: "smooth"
  
});

});

// Actualizar automáticamente el año del pie de página
document.querySelector("#year").textContent = new Date().getFullYear();