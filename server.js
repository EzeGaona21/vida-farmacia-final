const express = require("express");
const path = require("path");
const session = require("express-session");
const cors = require("cors");

require("./db/db"); // crea y prepara la base

// 👉 IMPORTAR RUTAS
const productosRoutes = require("./routes/productos");
const authRoutes = require("./routes/auth"); // ⬅ NUEVO

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "farmacia-secreto",
    resave: false,
    saveUninitialized: false,
  })
);

// servir frontend (tu index.html, login.html, etc)
app.use(express.static(__dirname));

// 👉 MONTAR RUTAS API
app.use("/api/productos", productosRoutes);
app.use("/auth", authRoutes); // ⬅ NUEVO

app.get("/ping", (req, res) => {
  res.send("Servidor funcionando con DB local 😎");
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
