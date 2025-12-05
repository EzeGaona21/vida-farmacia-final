(() => {
  interface DatosContacto {
    nombre: string;
    correo: string;
  }

  const formContacto = document.getElementById("formContacto") as HTMLFormElement;
  const mensaje = document.getElementById("mensaje") as HTMLElement;

  // === Enviar formulario ===
  formContacto.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    const nombre = (document.getElementById("nombre") as HTMLInputElement).value.trim();
    const correo = (document.getElementById("correo") as HTMLInputElement).value.trim();

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

    const datos: DatosContacto = { nombre, correo };

    try {
      const respuesta = await fetch("/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (respuesta.ok) {
        mensaje.textContent = "✅ Datos enviados correctamente.";
        mensaje.style.color = "green";
        formContacto.reset();
        await cargarContactos(); // 🔥 Recarga la lista
      } else {
        mensaje.textContent = "❌ Error al enviar los datos.";
        mensaje.style.color = "red";
      }
    } catch (error) {
      console.error("Error en el envío:", error);
      mensaje.textContent = "❌ Error de conexión con el servidor.";
      mensaje.style.color = "red";
    }
  });

  // === Mostrar lista dinámica ===
  async function cargarContactos() {
    try {
      const respuesta = await fetch("/contactos");
      if (!respuesta.ok) throw new Error("Error al obtener contactos");

      const contactos = await respuesta.json();
      const container = document.getElementById("contactosContainer") as HTMLElement;
      container.innerHTML = "";

      if (contactos.length === 0) {
        container.innerHTML = "<p class='muted'>Aún no hay contactos registrados.</p>";
        return;
      }

      contactos.forEach((c: { nombre: string; correo: string }, index: number) => {
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
        btn.addEventListener("click", async (ev: Event) => {
          const target = ev.target as HTMLButtonElement;
          const index = target.getAttribute("data-index");
          await fetch(`/contactos/${index}`, { method: "DELETE" });
          cargarContactos();
        });
      });
    } catch (err) {
      console.error("Error cargando contactos:", err);
    }
  }

  // 🔥 Cargar contactos al abrir la página
  document.addEventListener("DOMContentLoaded", () => {
    cargarContactos();
  });
})();
