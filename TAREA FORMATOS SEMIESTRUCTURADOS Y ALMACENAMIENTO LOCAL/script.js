document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentForm');
  const tableBody = document.getElementById('tableBody');

  const patterns = {
    cedula: /^\d{10}$/,
    apellidos: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,40}$/,
    nombres: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,40}$/,
    telefono: /^09\d{8}$/,
    correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    direccion: /^.{5,100}$/,
    paralelo: /^[a-zA-Z0-9]{1,2}$/
  };

  const errorMessages = {
    cedula: "Debe contener 10 dígitos.",
    apellidos: "Solo letras (2-40 caracteres).",
    nombres: "Solo letras (2-40 caracteres).",
    telefono: "Debe iniciar con 09 y tener 10 dígitos.",
    correo: "Ingrese un correo válido.",
    direccion: "Mínimo 5 y máximo 100 caracteres.",
    facultad: "Seleccione una facultad.",
    nivel: "Seleccione un nivel.",
    paralelo: "Máximo 2 caracteres (Ej: A)."
  };

  loadStudents();

  form.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    form.querySelectorAll('input, select').forEach(input => {
      if (!validateField(input)) isFormValid = false;
    });

    if (!isFormValid) return;

    const studentData = {
      id: Date.now(),
      cedula: document.getElementById('cedula').value.trim(),
      apellidos: document.getElementById('apellidos').value.trim(),
      nombres: document.getElementById('nombres').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      correo: document.getElementById('correo').value.trim(),
      direccion: document.getElementById('direccion').value.trim(),
      facultad: document.getElementById('facultad').value,
      nivel: document.getElementById('nivel').value,
      paralelo: document.getElementById('paralelo').value.trim().toUpperCase()
    };

    saveStudent(studentData);
    form.reset();
    loadStudents();
  });

  function validateField(input) {
    const fieldName = input.name;
    const value = input.value.trim();
    const errorElement = input.parentElement.querySelector('.error-msg');
    let isValid = true;

    if (input.tagName === 'SELECT') {
      isValid = value !== "";
    } else {
      const regex = patterns[fieldName];
      isValid = regex ? regex.test(value) : true;
    }

    if (!isValid) {
      input.classList.add('invalid');
      errorElement.textContent = errorMessages[fieldName] || "Campo inválido.";
    } else {
      clearError(input);
    }

    return isValid;
  }

  function clearError(input) {
    input.classList.remove('invalid');
    const errorElement = input.parentElement.querySelector('.error-msg');
    if (errorElement) errorElement.textContent = "";
  }

  function getStoredStudents() {
    return JSON.parse(localStorage.getItem('students')) || [];
  }

  function saveStudent(student) {
    const students = getStoredStudents();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
  }

  function loadStudents() {
    const students = getStoredStudents();
    tableBody.innerHTML = "";

    if (students.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: #6b7280; padding: 20px;">No hay estudiantes registrados.</td></tr>`;
      return;
    }

    students.forEach(student => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="student-info-primary">${student.apellidos} ${student.nombres}</div>
          <div class="student-info-sub">C.I: ${student.cedula}</div>
        </td>
        <td>
          <div class="student-info-primary">${student.correo}</div>
          <div class="student-info-sub">Tel: ${student.telefono}</div>
          <div class="student-info-sub">Dir: ${student.direccion}</div>
        </td>
        <td>
          <div class="student-info-primary">${student.facultad}</div>
          <span class="badge-level">Nivel ${student.nivel} - ${student.paralelo}</span>
        </td>
        <td>
          <button class="btn-delete" onclick="deleteStudent(${student.id})">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  window.deleteStudent = function(id) {
    let students = getStoredStudents();
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
  };
});