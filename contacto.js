var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => {
    const formContacto = document.getElementById("formContacto");
    const mensaje = document.getElementById("mensaje");
    // === Enviar formulario ===
    formContacto.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        if (nombre === "") {
            mensaje.textContent = "⚠️ El nombre no puede estar vacío.";
            mensaje.style.color = "red";
            return;
        }
        const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!patronCorreo.test(correo)) {
            mensaje.textContent = "⚠️ El formato del correo es inválido.";
            mensaje.style.color = "red";
            return;
        }
        const datos = { nombre, correo };
        try {
            const respuesta = yield fetch("/contacto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });
            if (respuesta.ok) {
                mensaje.textContent = "✅ Datos enviados correctamente.";
                mensaje.style.color = "green";
                formContacto.reset();
                yield cargarContactos(); // 🔥 Recarga la lista
            }
            else {
                mensaje.textContent = "❌ Error al enviar los datos.";
                mensaje.style.color = "red";
            }
        }
        catch (error) {
            console.error("Error en el envío:", error);
            mensaje.textContent = "❌ Error de conexión con el servidor.";
            mensaje.style.color = "red";
        }
    }));
    // === Mostrar lista dinámica ===
    function cargarContactos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield fetch("/contactos");
                if (!respuesta.ok)
                    throw new Error("Error al obtener contactos");
                const contactos = yield respuesta.json();
                const container = document.getElementById("contactosContainer");
                container.innerHTML = "";
                if (contactos.length === 0) {
                    container.innerHTML = "<p class='muted'>Aún no hay contactos registrados.</p>";
                    return;
                }
                contactos.forEach((c, index) => {
                    const card = document.createElement("div");
                    card.style.border = "1px solid #ccc";
                    card.style.borderRadius = "8px";
                    card.style.padding = "10px";
                    card.style.background = "#fff";
                    card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                    card.innerHTML = `
          <p><strong>👤 ${c.nombre}</strong></p>
          <p>${c.correo}</p>
          <button class="btn btn-ghost" data-index="${index}">🗑️ Eliminar</button>
        `;
                    container.appendChild(card);
                });
                // Botones de eliminar
                document.querySelectorAll(".btn-ghost").forEach((btn) => {
                    btn.addEventListener("click", (ev) => __awaiter(this, void 0, void 0, function* () {
                        const target = ev.target;
                        const index = target.getAttribute("data-index");
                        yield fetch(`/contactos/${index}`, { method: "DELETE" });
                        cargarContactos();
                    }));
                });
            }
            catch (err) {
                console.error("Error cargando contactos:", err);
            }
        });
    }
    // 🔥 Cargar contactos al abrir la página
    document.addEventListener("DOMContentLoaded", () => {
        cargarContactos();
    });
})();
