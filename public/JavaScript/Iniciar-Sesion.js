const formUsuario = document.getElementById("formUsuario");
const dniUsuario = document.getElementById("dniUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const contrasenaUsuario = document.getElementById("contrasenaUsuario");
const verContrasenaUsuario = document.querySelector(".verContrasenaUsuario");
const BotonSubmit = document.getElementById("BotonSubmit");

// Función para encriptar una cadena con SHA-256
async function sha256(str) {
    // Codificar la cadena en utf-8
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
  
    // Calcular el hash SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convertir el resultado en una cadena hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  }

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
        sha256(contrasenaUsuario.value).then(hash => {
            if (row.contrasena != hash) {
                showError(contrasenaUsuario, "Contraseña incorrecto.");
            } else {
                hideError(contrasenaUsuario);
            }
            if (row.dni == dniUsuario.value && row.correo == correoUsuario.value && row.contrasena == hash){
                console.log(hash);
                //window.location.href = '/pagina.html';
            }
        });
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

