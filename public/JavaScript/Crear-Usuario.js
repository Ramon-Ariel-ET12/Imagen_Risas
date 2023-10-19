const formUsuario = document.getElementById("formUsuario");
const nombreUsuario = document.getElementById("nombreUsuario");
const apellidoUsuario = document.getElementById("apellidoUsuario");
const apodoUsuario = document.getElementById("apodoUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const fechaNacimientoUsuario = document.getElementById("fechaNacimientoUsuario");
const contrasenaUsuario = document.getElementById("contrasenaUsuario");
const verContrasenaUsuario = document.querySelector(".verContrasenaUsuario");
const sexoUsuario = document.getElementById("sexoUsuario");
const BotonSubmit = document.getElementById("BotonSubmit");

// Calcular la fecha máxima como la fecha actual menos 15 años
const fechaMaxima = new Date();
fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 15);
const fechaMaximaFormato = fechaMaxima.toISOString().split('T')[0];

// Calcular la fecha mínima como la fecha actual menos 100 años
const fechaMinima = new Date();
fechaMinima.setFullYear(fechaMinima.getFullYear() - 100);
const fechaMinimaFormato = fechaMinima.toISOString().split('T')[0];

// Establecer la fecha máxima y mínima calculadas en el campo de fecha
document.getElementById("fechaNacimientoUsuario").setAttribute("max", fechaMaximaFormato);
document.getElementById("fechaNacimientoUsuario").setAttribute("min", fechaMinimaFormato);

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

    // Validación: Verificar si todos los campos están vacíos
    const camposVacios = Array.from(formUsuario.querySelectorAll("input[type='text'], input[type='password'], input[type='email'], input[type='date']")).some(input => input.value.trim() === "");

    if (camposVacios) {
        showError(BotonSubmit, "Por favor complete los campos vacios.");
        return; // No continuar con la verificación si hay campos vacíos
    }else{
        hideError(BotonSubmit)
    }

    // Validación del nombre (requerido y sin números)
    if (nombreUsuario.value.trim() === "") {
        showError(nombreUsuario, "Por favor ingresa un nombre válido.");
    } else if (/[\d]/.test(nombreUsuario.value)) {
        showError(nombreUsuario, "El nombre no debe contener números.");
    } else {
        hideError(nombreUsuario);
    }

    // Validación del apellido (requerido y sin números)
    if (apellidoUsuario.value.trim() === "") {
        showError(apellidoUsuario, "Por favor ingresa un apellido válido.");
    } else if (/[\d]/.test(apellidoUsuario.value)) {
        showError(apellidoUsuario, "El apellido no debe contener números.");
    } else {
        hideError(apellidoUsuario);
    }

    // Validación del apellido (requerido y sin números)
    if (apodoUsuario.value.trim() === "") {
        showError(apodoUsuario, "Por favor ingresa un apellido válido.");
    } else {
        hideError(apodoUsuario);
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
    } else if (fechaNacimientoUsuario.value > fechaMaximaFormato) {
        showError(fechaNacimientoUsuario, "Por favor selecciona una fecha de nacimiento válida.");
    } else if (fechaNacimientoUsuario.value < fechaMinimaFormato) {
        showError(fechaNacimientoUsuario, "Por favor selecciona una fecha de nacimiento válida.");
    } else {
    hideError(fechaNacimientoUsuario);
    }
    

    // Luego, verificar si todos los campos son válidos
    // Después de realizar las validaciones y antes de enviar los datos del formulario...

    fetch("/get-data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: correoUsuario.value, apodo: apodoUsuario.value }),
      })
      .then(response => response.json())
      .then(data => {
        // Accede a los datos que recibiste como JSON
        const ApodoCorreoData = data.data;

    // Realiza las comparaciones para mostrar mensajes de error si es necesario
    ApodoCorreoData.forEach(row => {
        if (row.apodo === apodoUsuario.value) {
        showError(apodoUsuario, "El apodo ya está registrado.");
        }
        if (row.correo === correoUsuario.value) {
        showError(correoUsuario, "El correo electrónico ya está registrado.");
        }
    });

    if (isValid) {
        const UsuarioData = {
            nombre: nombreUsuario.value,
            apellido: apellidoUsuario.value,
            apodo: apodoUsuario.value,
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
    if (contrasenaUsuario.type == "password") {
        contrasenaUsuario.type = "text"; // Mostrar contraseña
    } else {
        contrasenaUsuario.type = "password"; // Ocultar contraseña
    }
});
