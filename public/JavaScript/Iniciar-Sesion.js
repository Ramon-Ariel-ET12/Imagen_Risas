const formUsuario = document.getElementById("formUsuario");
const dniUsuario = document.getElementById("dniUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const contrasenaUsuario = document.getElementById("contrasenaUsuario");
const verContrasenaUsuario = document.querySelector(".verContrasenaUsuario");
const BotonSubmit = document.getElementById("BotonSubmit");

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
    const camposVacios = Array.from(formUsuario.querySelectorAll("input[type='text'], input[type='password'], input[type='email']")).some(input => input.value.trim() === "");

    if (camposVacios) {
        showError(BotonSubmit, "Por favor complete los campos vacios.");
        return; // No continuar con la verificación si hay campos vacíos
    }else{
        hideError(BotonSubmit)
    }
    

    // Luego, verificar si todos los campos son válidos
    // Después de realizar las validaciones y antes de enviar los datos del formulario...

    fetch("/get-data")
    .then(response => response.json())
    .then(data => {
    const dniCorreoData = data; // Datos recibidos del servidor


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
        if (row.contrasena != contrasenaUsuario.value) {
            showError(contrasenaUsuario, "Contraseña incorrecto.");
        } else {
            hideError(contrasenaUsuario);
        }
        if (row.dni == dniUsuario.value && row.correo == correoUsuario.value){
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
