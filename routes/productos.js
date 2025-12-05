const express = require("express");
const router = express.Router();
const db = require("../db/db");

// ================================
// GET - Listar todos los productos
// ================================
router.get("/", (req, res) => {
  db.all("SELECT * FROM productos WHERE activo = 1", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// ================================
// GET - Obtener un producto por ID
// ================================
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM productos WHERE id = ? AND activo = 1", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(row);
  });
});

// ================================
// POST - Agregar un producto
// ================================
router.post("/", (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  db.run(
    `INSERT INTO productos (nombre, descripcion, precio, stock, categoria)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, descripcion, precio, stock, categoria],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Producto agregado", id: this.lastID });
    }
  );
});

// ================================
// PUT - Editar un producto
// ================================
router.put("/:id", (req, res) => {
  // Si el body viene undefined, evitamos que explote
  if (!req.body) {
    return res.status(400).json({ error: "No se recibió body en la petición" });
  }

  const { nombre, descripcion, precio, stock, categoria } = req.body;

  // Validación mínima
  if (!nombre || precio == null || stock == null) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const id = req.params.id;

  db.run(
    `UPDATE productos
       SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?
     WHERE id = ?`,
    [nombre, descripcion, precio, stock, categoria, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json({ message: "Producto actualizado" });
    }
  );
});


// ================================
// DELETE - Borrado lógico
// ================================
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.run(
    `UPDATE productos SET activo = 0 WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Producto eliminado" });
    }
  );
});

module.exports = router;
