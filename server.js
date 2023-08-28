const express = require("express");
const path = require("path");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Task_Flow_Manager"
});

connection.connect((error) => {
  if (error) {
    console.error("Error de conexión a la base de datos:", error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/pagina.html");
});

// Después de la conexión a la base de datos y la configuración del servidor...

app.get("/get-dni-correo-data", (req, res) => {
  connection.query("SELECT dni, correo FROM Usuario", (error, results) => {
    if (error) {
      console.error("Error al obtener datos de DNI y correo:", error);
      res.status(500).json({ message: "Error al obtener datos de DNI y correo" });
    } else {
      res.json(results);
    }
  });
});

app.post('/registrar-usuario', (req, res) => {
  const UsuarioData = req.body;
  // No hay duplicados, proceder con la inserción
  connection.query(    
  "CALL AltaUsuario ( ?, ?, ?, ?, ?, ?, ?)",
  [ UsuarioData.nombre, UsuarioData.apellido, UsuarioData.dni, UsuarioData.correo, UsuarioData.contrasena, UsuarioData.fechaNacimiento, UsuarioData.sexo],
  (insertError, insertResults) => {
    if (insertError) {
      console.log('Error al registrar al Usuario', insertError);
      res.status(500).json({ message: 'Error al registrar Usuario' });
    } else {
      console.log('Usuario registrado correctamente');
      res.status(200).json({ message: 'Usuario registrado correctamente' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
