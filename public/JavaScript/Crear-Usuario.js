const formUsuario = document.getElementById("formUsuario");
const nombreUsuario = document.getElementById("nombreUsuario");
const apellidoUsuario = document.getElementById("apellidoUsuario");
const dniUsuario = document.getElementById("dniUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const fechaNacimientoUsuario = document.getElementById("fechaNacimientoUsuario");
const contrasenaUsuario = document.getElementById("contrasenaUsuario");
const verContrasenaUsuario = document.querySelector(".verContrasenaUsuario");
const sexoUsuario = document.getElementById("sexoUsuario");

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

    // Validación del nombre (requerido)
    if (nombreUsuario.value.trim() === "") {
    showError(nombreUsuario, "Por favor ingresa un nombre válido.");
    } else {
    hideError(nombreUsuario);
    }

    // Validación del apellido (requerido)
    if (apellidoUsuario.value.trim() === "") {
    showError(apellidoUsuario, "Por favor ingresa un apellido válido.");
    } else {
    hideError(apellidoUsuario);
    }

    // Validación del DNI (requerido, número)
    if (dniUsuario.value.trim() === "" || isNaN(dniUsuario.value)) {
    showError(dniUsuario, "Por favor ingresa un DNI válido.");
    } else {
    hideError(dniUsuario);
    }

    // Validación del correo electrónico (requerido, formato)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(correoUsuario.value)) {
    showError(correoUsuario, "Por favor ingresa un correo electrónico válido.");
    } else {
    hideError(correoUsuario);
    }

    // Validación de la contraseña (requerida)
    if (contrasenaUsuario.value.trim() === "") {
    showError(contrasenaUsuario, "Por favor ingresa una contraseña válida.");
    } else if (contrasenaUsuario.value.length < 6) {
        showError(contrasenaUsuario, "La contraseña debe tener al menos 6 caracteres.");
    }else {
    hideError(contrasenaUsuario);
    }

    // Validación de la fecha de nacimiento (requerida)
    if (fechaNacimientoUsuario.value === "") {
    showError(fechaNacimientoUsuario, "Por favor selecciona una fecha de nacimiento válida.");
    } else {
    hideError(fechaNacimientoUsuario);
    }
    

    // Luego, verificar si todos los campos son válidos
    // Después de realizar las validaciones y antes de enviar los datos del formulario...

    fetch("/get-dni-correo-data")
    .then(response => response.json())
    .then(data => {
    const dniCorreoData = data; // Datos recibidos del servidor

    // Realiza las comparaciones para mostrar mensajes de error si es necesario
    dniCorreoData.forEach(row => {
        if (row.dni === dniUsuario.value) {
        showError(dniUsuario, "El DNI ya está registrado.");
        }
        if (row.correo === correoUsuario.value) {
        showError(correoUsuario, "El correo electrónico ya está registrado.");
        }
    });

    if (isValid) {
        const UsuarioData = {
            nombre: nombreUsuario.value,
            apellido: apellidoUsuario.value,
            dni: dniUsuario.value,
            correo: correoUsuario.value,
            contrasena: contrasenaUsuario.value,
            fechaNacimiento: fechaNacimientoUsuario.value,
            sexo: sexoUsuario.value,
            };

    // Después de enviar los datos del formulario
    fetch('/registrar-usuario', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(UsuarioData)
    })
    .then(response => response.json())
    .then(data => {
        // Redirigir a la página de inicio de sesión después del registro exitoso
        window.location.href = '/Iniciar-Sesion.html';
    })
    .catch(error => {
        console.error('Error al enviar datos:', error);
    });

    }
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
