// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db/db");

// POST /auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT u.id, u.nombre, u.email, u.password, r.nombre AS rol
     FROM usuarios u
     JOIN roles r ON u.rol_id = r.id
     WHERE u.email = ?`,
    [email],
    (err, user) => {
      if (err) {
        console.error("Error en login:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      if (!user) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      // Para el final lo dejamos simple: comparo texto plano
      if (user.password !== password) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Guardamos el usuario en sesión
      req.session.user = {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      };

      res.json({
        message: "Login exitoso",
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
      });
    }
  );
});

// Cerrar sesión
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Sesión cerrada" });
  });
});

// Usuario actual
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ user: null });
  }
  res.json({ user: req.session.user });
});

module.exports = router;
