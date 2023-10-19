const express = require("express");
const path = require("path");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Formulario"
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

app.post('/auth', async (req, res) => {
  const { correo, contrasena } = req.body;
  connection.query(
    'SELECT * FROM usuario WHERE correo = ? AND contraseña = ?',
    [correo, contrasena],
    (error, results) => {
      if (error) {
        console.error('Error al consultar la base de datos: ', error);
        return res.status(500).json({ error: 'Error de la base de datos' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Envía los datos del usuario encontrado
      res.json({ user: results[0] });
    }
  );
});

app.post('/registrar-usuario', (req, res) => {
  const UsuarioData = req.body;
  // No hay duplicados, proceder con la inserción
  connection.query(    
  "CALL AltaUsuario ( ?, ?, ?, ?, ?, ?, ?)",
  [ UsuarioData.nombre, UsuarioData.apellido, UsuarioData.apodo, UsuarioData.correo, UsuarioData.contrasena, UsuarioData.fechaNacimiento, UsuarioData.sexo],
  (insertError, insertResults) => {
    if (insertError) {
      console.log('Error al registrar al Usuario', insertError);
      res.status(500).json({ message: 'Error al registrar Usuario' });
      res.redirect("/Crear-Usuario.html");
    } else {
      console.log('Usuario registrado correctamente');
      res.status(200).json({ message: 'Usuario registrado correctamente' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
