// ===== Menú hamburguesa =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ===== Temporizador =====
let tiempoActual = 0;
let referenciaIntervalo;

function iniciarTimer() {
  console.log("⏱️ Temporizador iniciado...");
  const contador = document.getElementById("contador");

  referenciaIntervalo = setInterval(() => {
    if (tiempoActual < 10) {
      contador.textContent = `Tiempo actual: ${tiempoActual}`;
      console.log("Tiempo actual:", tiempoActual);
      tiempoActual++;
    } else {
      contador.textContent = "¡Conteo completado! Se ha detenido.";
      console.log("¡Conteo completado! Se ha detenido.");
      clearInterval(referenciaIntervalo);
      tiempoActual = 0;
    }
  }, 1000);
}

document.getElementById("btnIniciar").addEventListener("click", iniciarTimer);

// ===== Botón de cambio de color y texto =====
document.getElementById("btnCambiar").addEventListener("click", () => {
  const titulo = document.getElementById("tituloTemp");
  titulo.textContent = "🎨 Color cambiado!";
  titulo.style.color = titulo.style.color === "var(--brand)" ? "#ff5722" : "var(--brand)";
});
