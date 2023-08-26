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

app.post('/registrar-usuario', (req, res) => {
  const UsuarioData = req.body;

  // Verificar duplicados en la base de datos
  connection.query(
    "SELECT dni, correo FROM Usuario WHERE dni = ? OR correo = ?",
    [UsuarioData.dni, UsuarioData.correo],
    (error, results) => {
      if (error) {
        console.log('Error al verificar duplicados', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
      } else {
        if (results.length > 0) {
          const errors = {};
          results.forEach(row => {
            if (row.dni == UsuarioData.dni) {  // Cambio a la comparación no estricta
              errors.dni = 'El DNI ya está registrado';
            }
            
            if (row.correo === UsuarioData.correo) {
              errors.correo = 'El correo electrónico ya está registrado';
            }
          });
          res.status(400).json({ errors }); // Envía errores al cliente
        } else {
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
        }
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
