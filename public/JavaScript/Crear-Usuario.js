const formJefe = document.getElementById("formJefe");
const nombreJefe = document.getElementById("nombreJefe");
const apellidoJefe = document.getElementById("apellidoJefe");
const dniJefe = document.getElementById("dniJefe");
const correoJefe = document.getElementById("correoJefe");
const fechaNacimientoJefe = document.getElementById("fechaNacimientoJefe");
const empresaJefe = document.getElementById("empresaJefe");
const contrasenaJefe = document.getElementById("contrasenaJefe");
const verContrasenaJefe = document.getElementById("verContrasenaJefe");
const sexoJefe = document.getElementById("sexoJefe");

formJefe.addEventListener("submit",(event) => {
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
    if (nombreJefe.value.trim() === "") {
    showError(nombreJefe, "Por favor ingresa un nombre válido.");
    } else {
    hideError(nombreJefe);
    }

    // Validación del apellido (requerido)
    if (apellidoJefe.value.trim() === "") {
    showError(apellidoJefe, "Por favor ingresa un apellido válido.");
    } else {
    hideError(apellidoJefe);
    }

    // Validación del DNI (requerido, número)
    if (dniJefe.value.trim() === "" || isNaN(dniJefe.value)) {
    showError(dniJefe, "Por favor ingresa un DNI válido.");
    } else {
    hideError(dniJefe);
    }

    // Validación del correo electrónico (requerido, formato)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(correoJefe.value)) {
    showError(correoJefe, "Por favor ingresa un correo electrónico válido.");
    } else {
    hideError(correoJefe);
    }

    // Validación de la contraseña (requerida)
    if (contrasenaJefe.value.trim() === "") {
    showError(contrasenaJefe, "Por favor ingresa una contraseña válida.");
    } else {
    hideError(contrasenaJefe);
    }
    
    // Validación del nombre de la empresa (requerido)
    if (empresaJefe.value.trim() === "") {
    showError(empresaJefe, "Por favor ingresa un nombre de empresa válido.");
    } else {
    hideError(empresaJefe);
    }

    // Validación de la fecha de nacimiento (requerida)
    if (fechaNacimientoJefe.value === "") {
    showError(fechaNacimientoJefe, "Por favor selecciona una fecha de nacimiento válida.");
    } else {
    hideError(fechaNacimientoJefe);
    }
        // Luego, verificar si todos los campos son válidos


    if (isValid) {
        const jefeData = {
            nombre: nombreJefe.value,
            apellido: apellidoJefe.value,
            dni: dniJefe.value,
            correo: correoJefe.value,
            contrasena: contrasenaJefe.value,
            empresa: empresaJefe.value,
            fechaNacimiento: fechaNacimientoJefe.value,
            sexo: sexoJefe.value,
            };

        try {
            fetch('/registrar-jefe', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(jefeData)
            });
            // Redirigir a la página de inicio de sesión después del registro exitoso
            window.location.href = '/Iniciar-Sesion.html';
        } 
        catch (error) {
        console.error('Error al enviar datos:', error);
        }

    }
});

// Mostrar u ocultar la contraseña
verContrasenaJefe.addEventListener("change", () => {
    if (verContrasenaJefe.checked) {
    contrasenaJefe.type = "text";
    } else {
    contrasenaJefe.type = "password";
    }
});
