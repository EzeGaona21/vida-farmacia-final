const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta al archivo de la base de datos
const dbPath = path.join(__dirname, "..", "farmacia.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
  } else {
    console.log("✅ Conectado a la base de datos farmacia.db");
  }
});

db.serialize(() => {
  // Crear tablas
  db.run(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      rol_id INTEGER NOT NULL,
      FOREIGN KEY (rol_id) REFERENCES roles(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      precio REAL NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      categoria TEXT,
      activo INTEGER NOT NULL DEFAULT 1
    )
  `);

  // Insertar roles si no existen
  db.run(`INSERT OR IGNORE INTO roles (id, nombre) VALUES (1, 'ADMIN')`);
  db.run(`INSERT OR IGNORE INTO roles (id, nombre) VALUES (2, 'EMPLEADO')`);

  // Insertar usuarios de prueba si no existen
  db.run(`
    INSERT OR IGNORE INTO usuarios (id, nombre, email, password, rol_id)
    VALUES (1, 'Admin General', 'admin@farmacia.com', '123456', 1)
  `);

  db.run(`
    INSERT OR IGNORE INTO usuarios (id, nombre, email, password, rol_id)
    VALUES (2, 'Empleado Caja', 'empleado@farmacia.com', '123456', 2)
  `);

  // 👉 Revisar cuántos productos hay
  db.get("SELECT COUNT(*) AS count FROM productos", (err, row) => {
    if (err) {
      console.error("❌ Error contando productos:", err.message);
      return;
    }

    console.log("Actualmente hay productos:", row.count);

    // Si NO hay productos, insertamos algunos de ejemplo
    if (row.count === 0) {
      console.log("No hay productos, insertando datos de ejemplo...");

      db.run(
        `INSERT INTO productos (nombre, descripcion, precio, stock, categoria)
         VALUES ('Ibuprofeno 400mg', 'Analgesico y antiinflamatorio', 2500, 30, 'Analgesicos')`
      );

      db.run(
        `INSERT INTO productos (nombre, descripcion, precio, stock, categoria)
         VALUES ('Paracetamol 500mg', 'Fiebre y dolor leve a moderado', 2200, 40, 'Analgesicos')`
      );

      db.run(
        `INSERT INTO productos (nombre, descripcion, precio, stock, categoria)
         VALUES ('Alcohol en gel 250ml', 'Desinfectante de manos', 1800, 25, 'Higiene')`
      );

      db.run(
        `INSERT INTO productos (nombre, descripcion, precio, stock, categoria)
         VALUES ('Vitamina C 1g', 'Suplemento vitamínico', 3500, 15, 'Suplementos')`
      );
    }
  });
});

module.exports = db;
