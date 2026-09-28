function validar() {
  var cedula = document.getElementById("cedula").value;
  var telefono = document.getElementById("telefono").value;
  var nombre = document.getElementById("nombre").value;
  var direccion = document.getElementById("direccion").value;
  var email = document.getElementById("email").value;

  // Regla para que el nombre solo acepte letras y espacios
  var soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

  var todoValido = true;

  // Cedula
  if (cedula == "") {
    document.getElementById("errorCedula").innerHTML = "Debe llenar la cédula";
    document.getElementById("errorCedula").style.color = "red";
    todoValido = false;
  } else if (cedula.length != 10) {
    document.getElementById("errorCedula").innerHTML = "La cédula debe tener 10 dígitos";
    document.getElementById("errorCedula").style.color = "red";
    todoValido = false;
  } else if (isNaN(cedula) == true || cedula.includes("-") || cedula.includes(".")) {
    document.getElementById("errorCedula").innerHTML = "Solo se permiten números enteros positivos";
    document.getElementById("errorCedula").style.color = "red";
    todoValido = false;
  } else {
    document.getElementById("errorCedula").innerHTML = "10 dígitos";
    document.getElementById("errorCedula").style.color = "";
  }
 
  // Telefono
  if (telefono == "") {
    document.getElementById("errorTelefono").innerHTML = "Debe llenar el teléfono";
    document.getElementById("errorTelefono").style.color = "red";
    todoValido = false;
  } else if (telefono.length != 10) {
    document.getElementById("errorTelefono").innerHTML = "El teléfono debe tener 10 dígitos";
    document.getElementById("errorTelefono").style.color = "red";
    todoValido = false;
  } else if (isNaN(telefono) == true || telefono.includes("-") || telefono.includes(".")) {
    document.getElementById("errorTelefono").innerHTML = "Solo se permiten números enteros positivos";
    document.getElementById("errorTelefono").style.color = "red";
    todoValido = false;
  } else {
    document.getElementById("errorTelefono").innerHTML = "10 dígitos";
    document.getElementById("errorTelefono").style.color = "";
  }

  // Nombre
 
  if (nombre == "") {
    document.getElementById("errorNombre").innerHTML = "Debe llenar el nombre";
    document.getElementById("errorNombre").style.color = "red";
    todoValido = false;
  } else if (nombre.length > 30) {
    document.getElementById("errorNombre").innerHTML = "Máximo 30 caracteres permitidos";
    document.getElementById("errorNombre").style.color = "red";
    todoValido = false;
  } else if (soloLetras.test(nombre) == false) {
    document.getElementById("errorNombre").innerHTML = "No se permiten números ni símbolos";
    document.getElementById("errorNombre").style.color = "red";
    todoValido = false;
  } else {
    document.getElementById("errorNombre").innerHTML = "Máximo 30 caracteres";
    document.getElementById("errorNombre").style.color = "";
  }

  // Direccion

  if (direccion == "") {
    document.getElementById("errorDireccion").innerHTML = "Debe llenar la dirección";
    document.getElementById("errorDireccion").style.color = "red";
    todoValido = false;
  } else if (direccion.length > 50) {
    document.getElementById("errorDireccion").innerHTML = "Máximo 50 caracteres permitidos";
    document.getElementById("errorDireccion").style.color = "red";
    todoValido = false;
  } else {
    document.getElementById("errorDireccion").innerHTML = "Máximo 50 caracteres";
    document.getElementById("errorDireccion").style.color = "";
  }

  // Correo

  if (email == "") {
    document.getElementById("errorEmail").innerHTML = "Debe llenar el correo";
    document.getElementById("errorEmail").style.color = "red";
    todoValido = false;
  } else if (email.includes("@") == false || email.includes(".com") == false) {
    document.getElementById("errorEmail").innerHTML = "El correo debe tener '@' y '.com'";
    document.getElementById("errorEmail").style.color = "red";
    todoValido = false;
  } else {
    document.getElementById("errorEmail").innerHTML = "Ejemplo: usuario@dominio.com";
    document.getElementById("errorEmail").style.color = "";
  }


  if (todoValido == true) {
    alert("¡Cliente registrado exitosamente!");

    // Borra los datos que escribió el usuario en las casillas
    document.getElementById("clienteForm").reset();


    document.getElementById("errorCedula").innerHTML = "10 dígitos";
    document.getElementById("errorTelefono").innerHTML = "10 dígitos";
    document.getElementById("errorNombre").innerHTML = "Máximo 30 caracteres";
    document.getElementById("errorDireccion").innerHTML = "Máximo 50 caracteres";
    document.getElementById("errorEmail").innerHTML = "Ejemplo: usuario@dominio.com";
  }
}