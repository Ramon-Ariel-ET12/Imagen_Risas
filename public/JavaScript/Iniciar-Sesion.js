const formUsuario = document.getElementById("formUsuario");
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



    // No redeclarar las variables, simplemente accede a las definidas arriba
    const correoUsuarioValue = correoUsuario.value;
    const contrasenaUsuarioValue = contrasenaUsuario.value;

    // Encripta la contraseña
    sha256(contrasenaUsuarioValue).then(async (hash) => {
        const response = await fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo: correoUsuarioValue, contrasena: hash }),
        });

        if (response.status === 200) {
            // userData.user contendrá todos los datos de la fila del usuario
            const userData = await response.json();

            if (userData.user.contrasena == hash) {
                showError(contrasenaUsuario, "Contraseña incorrecta.");
            } else {
                hideError(contrasenaUsuario);
            }

            if (userData.user.correo === correoUsuarioValue) {
                // Usuario autenticado con éxito, puedes redirigirlo a la página deseada
                window.location.href = '/principal.html';
            } else {
                showError(correoUsuario, "Correo incorrecto.");
            }
        } else if (response.status === 401) {
            showError(BotonSubmit, "Credenciales incorrectas.");
        } else {
            showError(BotonSubmit, "Error en la autenticación.");
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