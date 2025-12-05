# 💊 Vida+ — Tu Farmacia Online

Proyecto final desarrollado para la materia **Programación Web**.

El sitio representa una farmacia online con:

- Frontend dinámico (HTML, CSS, JS, TS)
- Conexión con backend en Node.js + Express
- CRUD completo
- Persistencia de datos en **base de datos SQLite**
- Visualización y administración de los registros desde el navegador y desde DB Browser

---

## 📘 Descripción general

**Vida+** permite a los usuarios:

- Navegar por distintas secciones del sitio (categorías, proveedores, testimonios, contacto).
- Usar un **temporizador dinámico** y un botón que cambia texto y color.
- Completar un formulario validado con **TypeScript**.
- Guardar los datos enviados en una **base de datos SQLite**.
- Visualizar los registros en pantalla mediante un **CRUD completo**.
- Eliminar registros directamente desde el navegador.

---

## ⚙️ Tecnologías utilizadas

### 🖥️ Frontend
- HTML5  
- CSS3 (Flexbox, Grid, Mobile First)  
- JavaScript (ES6)  
- TypeScript (validación de formulario y tipado estricto)  

### 🖥️ Backend
- Node.js  
- Express.js  
- SQLite3 (base de datos local)  
- Módulo fs (solo para configuraciones internas)

### 🗄️ Base de datos
- **SQLite** (archivo `.sqlite` o `.db`)
- Herramienta recomendada para visualizar y editar:
  ✔ **DB Browser for SQLite**

---

# 🧩 Funcionalidades principales

## 🟢 CRUD completo

| Operación | Descripción | Ruta |
|----------|-------------|-------|
| Crear | Guarda un nuevo contacto desde el formulario | POST /contacto |
| Leer | Lista todos los contactos guardados | GET /contactos |
| Eliminar | Elimina un contacto de la base | DELETE /contactos/:id |

Los datos se almacenan en un archivo SQLite:

/database/farmacia.db

---

# 🗄️ Base de datos – Configuración y Uso

El proyecto utiliza **SQLite**, una base de datos liviana, sin necesidad de servidor externo.

## ✔ Base ya incluida en el proyecto
Dentro de la carpeta:

/database/farmacia.db

Se encuentra la tabla:

contactos (id, nombre, email, mensaje)

---

## ✔ Cómo visualizar la base de datos

1️⃣ Descargar **DB Browser for SQLite**:  
👉 https://sqlitebrowser.org/dl/

2️⃣ Abrir el programa.

3️⃣ Ir a **Open Database / Abrir Base de Datos**.

4️⃣ Seleccionar el archivo:

/database/farmacia.db

5️⃣ Ir a la pestaña:  
**Browse Data (Ver datos)**

Ahí verás todos los registros guardados del formulario.

6️⃣ Si querés editar, agregar o borrar registros manualmente:  
➜ Usar "Edit Database" o “Execute SQL”.

---

# 🧠 Dinámicas incluidas

### ✔ Temporizador
Cuenta de 0 a 9, mostrando un mensaje final.

### ✔ Botón interactivo
Cambia de color y texto al hacer clic.

### ✔ Formulario validado con TypeScript
Valida:
- Nombre
- Email  
- Campo mensaje

Previene envíos incompletos y evita errores.

### ✔ Visualización dinámica de contactos
Muestra todos los registros que existen en la base de datos y permite eliminarlos desde la web.

---

# 🚀 Cómo ejecutar el proyecto

## 1️⃣ Instalar dependencias

Abrir la carpeta del proyecto en Visual Studio Code y ejecutar:

npm install npm install express sqlite3 npm install -g typescript

## 2️⃣ Compilar TypeScript

Convierte `contacto.ts` en `contacto.js`:

tsc contacto.ts --target ES6

## 3️⃣ Iniciar el servidor

node server.js

📌 Si todo funciona, verás en consola:

🚀 Servidor ejecutándose en http://localhost:3000 Base de datos conectada con éxito

## 4️⃣ Abrir el navegador
Entrar a:

http://localhost:3000

---

# 🧱 Estructura del proyecto

VIDA-PARCIAL/ │ ├── index.html           # Página principal ├── styles.css           # Estilos generales ├── main.js              # Interacciones y menú ├── contacto.ts          # Lógica TS del formulario ├── contacto.js          # Archivo compilado ├── server.js            # Servidor y rutas ├── /database │     └── farmacia.db        # Base de datos SQLite └── README.md            # Documentación del proyecto

---

# 👥 Autores

**Ezequiel Gaona**  
Materia: Programación Web  
Profesora: Florencia Von Borowski  
Año: 2025


