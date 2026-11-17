# Vida+ — Sistema web para farmacia

Proyecto final de la materia Programación Web (Tecnicatura en Programación e Innovación Tecnológica, INCADE).

Vida+ es el sitio de una farmacia con una API REST para administrar el catálogo de productos y un login con roles. Para diseñarlo apliqué lo que aprendí trabajando en atención al cliente en una farmacia.

## Qué hace

- **Catálogo de productos (CRUD completo):** alta, consulta, edición y baja de productos con nombre, descripción, precio, stock y categoría. La baja es lógica: el producto queda inactivo y no se pierde el registro.
- **Login con roles:** usuarios con rol ADMIN o EMPLEADO, sesión del lado del servidor y endpoint para saber quién está logueado.
- **Frontend propio:** sitio de la farmacia y pantalla de inicio de sesión en HTML, CSS y JavaScript, con validación de formulario en TypeScript.

## API

| Método | Ruta | Qué hace |
| --- | --- | --- |
| GET | `/api/productos` | Lista los productos activos |
| GET | `/api/productos/:id` | Devuelve un producto |
| POST | `/api/productos` | Crea un producto |
| PUT | `/api/productos/:id` | Edita un producto |
| DELETE | `/api/productos/:id` | Da de baja un producto (baja lógica) |
| POST | `/auth/login` | Inicia sesión |
| POST | `/auth/logout` | Cierra sesión |
| GET | `/auth/me` | Devuelve el usuario logueado |

## Base de datos

SQLite (`farmacia.db`), con tres tablas: `roles`, `usuarios` y `productos`. Se crea sola al iniciar el servidor, con dos usuarios de prueba:

| Email | Contraseña | Rol |
| --- | --- | --- |
| admin@farmacia.com | 123456 | ADMIN |
| empleado@farmacia.com | 123456 | EMPLEADO |

## Tecnologías

Node.js · Express 5 · express-session · SQLite · HTML · CSS · JavaScript · TypeScript

## Cómo correrlo

```bash
npm install
npm start          # o npm run dev, con nodemon
```

Abrí http://localhost:3000

## Mejoras pendientes

Es un proyecto académico y estas son las mejoras que haría para llevarlo a producción:

- Guardar las contraseñas con hash (bcrypt) en lugar de texto plano.
- Proteger las rutas de productos según el rol del usuario.
- Mover el secreto de la sesión a una variable de entorno.

---

Autor: [Ezequiel Gaona](https://www.linkedin.com/in/ezequielgaona) · [GitHub](https://github.com/EzeGaona21)
