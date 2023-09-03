const formUsuario = document.getElementById("formUsuario");
const dniUsuario = document.getElementById("dniUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const contrasenaUsuario = document.getElementById("contrasenaUsuario");
const verContrasenaUsuario = document.querySelector(".verContrasenaUsuario");


formUsuario.addEventListener("submit",(event) => {
    event.preventDefault(); 
    let isValid = true;

    // Función para mostrar mensajes de error
    function showError(element, message) {
    const errorElement = element.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = "block";
    isValid = false;
    }

    // Función para ocultar mensajes de error
    function hideError(element) {
    const errorElement = element.nextElementSibling;
    errorElement.style.display = "none";
    }

    // Luego, verificar si todos los campos son válidos
    // Después de realizar las validaciones y antes de enviar los datos del formulario...

    fetch("/get-data")
    .then(response => response.json())
    .then(data => {
    const dniCorreoData = data; // Datos recibidos del servidor
    // Realiza el hash SHA-256 de la contraseña
    const hashedContrasena = CryptoJS.SHA256(contrasenaUsuario).toString(CryptoJS.enc.Hex);


    // Realiza las comparaciones para mostrar mensajes de error si es necesario
    dniCorreoData.forEach(row => {
        if (row.dni != dniUsuario.value) {
            showError(dniUsuario, "DNI incorrecto.");
        } else {
            hideError(dniUsuario);
        }
        if (row.correo != correoUsuario.value) {
            showError(correoUsuario, "Correo incorrecto.");
        } else {
            hideError(correoUsuario);
        }
        if (row.contrasena != hashedContrasena) {
            showError(contrasenaUsuario, "Contraseña incorrecto.");
        } else {
            hideError(contrasenaUsuario);
        }
        if (row.dni === dniUsuario.value && row.correo === correoUsuario.value && row.contrasena === hashedContrasena){
            window.location.href = '/pagina.html';
        }
    });

    });
});

// Mostrar u ocultar la contraseña
verContrasenaUsuario.addEventListener("click", () => {
    if (contrasenaUsuario.type === "password") {
        contrasenaUsuario.type = "text"; // Mostrar contraseña
        verContrasenaUsuario.textContent = "Mostrar";
    } else {
        contrasenaUsuario.type = "password"; // Ocultar contraseña
        verContrasenaUsuario.textContent = "Ocultar";
    }
});
