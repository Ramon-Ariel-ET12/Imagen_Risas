document.addEventListener("DOMContentLoaded", () => {
    const formularioUsuario = document.getElementById("formUsuario");
    const formularioGerente = document.getElementById("formGerente");
    const formularioJefe = document.getElementById("formJefe");
  
    // Mostrar el formulario de usuario por defecto
    formularioUsuario.style.display = "block";
  
    // Función para mostrar el formulario seleccionado y ocultar los demás
    function mostrarFormulario(formulario) {
      formularioUsuario.style.display = "none";
      formularioGerente.style.display = "none";
      formularioJefe.style.display = "none";
      formulario.style.display = "block";
    }
  
    // Event listeners para los botones de tipo de usuario
    document.getElementById("btnUsuario").addEventListener("click", () => {
      mostrarFormulario(formularioUsuario);
    });
  
    document.getElementById("btnGerente").addEventListener("click", () => {
      mostrarFormulario(formularioGerente);
    });
  
    document.getElementById("btnJefe").addEventListener("click", () => {
      mostrarFormulario(formularioJefe);
    });
  });