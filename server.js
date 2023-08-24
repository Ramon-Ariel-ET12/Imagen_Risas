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

app.post('/registrar-jefe', (req, res) => {
  const jefeData = req.body;

  // Ejecutar el procedimiento almacenado
  connection.query(
    "CALL AltaJefe(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      jefeData.nombre,
      jefeData.apellido,
      jefeData.dni,
      jefeData.correo,
      jefeData.contrasena,
      jefeData.empresa,
      jefeData.fechaNacimiento,
      jefeData.sexo
    ],
    (error, results) => {
      if (error) {
        console.log('Error al registrar al jefe'+error);
        res.status(500).json({ message: 'Error al registrar jefe' });
      } else {
        console.log('Jefe registrado correctamente');       
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
