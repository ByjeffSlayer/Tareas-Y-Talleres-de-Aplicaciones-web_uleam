// 1. Referencias al Modelo de Objetos del Documento (DOM)
const formularioTareas = document.getElementById('formulario-tareas');
const tituloTarea = document.getElementById('titulo-tarea');
const descripcionTarea = document.getElementById('descripcion-tarea');
const listaTareas = document.getElementById('lista-tareas');
const btnExportarJson = document.getElementById('btn-exportar-json');
const btnExportarXml = document.getElementById('btn-exportar-xml');

// 2. Estado de la Aplicación (Cargando datos con la llave corregida 'tareasGuardadas')
let coleccionTareas = JSON.parse(localStorage.getItem('tareasGuardadas')) || [];

// 3. Función para pintar las tareas en el HTML
function redibujarInterfaz() {
    listaTareas.innerHTML = ''; // Vaciar contenedor antes de actualizar

    coleccionTareas.forEach((tarea, indice) => {
        const elementoLista = document.createElement('li');
        elementoLista.className = 'elemento-tarea';

        elementoLista.innerHTML = `
            <div>
                <h3>${tarea.titulo}</h3>
                <p>${tarea.descripcion}</p>
                <p><small>Código: ${tarea.codigo} | Registro: ${tarea.fecha}</small></p>
            </div>
            <button class="btn-eliminar" onclick="removerTarea(${indice})">Eliminar</button>
        `;
        listaTareas.appendChild(elementoLista);
    });
}

// 4. Guardar datos nativos en LocalStorage convirtiéndolos a texto JSON
function actualizarAlmacenamientoLocal() {
    localStorage.setItem('tareasGuardadas', JSON.stringify(coleccionTareas));
}

// 5. Captura del evento de envío del formulario
formularioTareas.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita que la página se recargue

    const nuevaTarea = {
        codigo: Date.now().toString(),
        titulo: tituloTarea.value,
        descripcion: descripcionTarea.value,
        fecha: new Date().toLocaleDateString()
    };

    coleccionTareas.push(nuevaTarea);
    actualizarAlmacenamientoLocal();
    redibujarInterfaz();

    formularioTareas.reset(); // Limpiar campos de texto
});

// 6. Eliminar elemento del arreglo por su índice
window.removerTarea = function(indice) {
    coleccionTareas.splice(indice, 1);
    actualizarAlmacenamientoLocal();
    redibujarInterfaz();
};

// =======================================================
// PROCESAMIENTO DE FORMATOS SEMIESTRUCTURADOS (XML y JSON)
// =======================================================

// Exportación nativa a formato JSON
btnExportarJson.addEventListener('click', () => {
    if (coleccionTareas.length === 0) return alert('No existen tareas para exportar.');

    const textoJson = JSON.stringify(coleccionTareas, null, 2);

    console.log("--- FLUJO DE DATOS: JSON GENERADO ---");
    console.log(textoJson);

    generarDescarga(textoJson, 'tareas_academicas.json', 'application/json');
});

// Exportación estructurada a formato XML mediante marcado manual
btnExportarXml.addEventListener('click', () => {
    if (coleccionTareas.length === 0) return alert('No existen tareas para exportar.');

    let textoXml = '<?xml version="1.0" encoding="UTF-8"?>\n<tareas>\n';

    coleccionTareas.forEach(tarea => {
        textoXml += `  <tarea codigo="${tarea.codigo}">\n`;
        textoXml += `    <titulo>${sanitizarTextoXml(tarea.titulo)}</titulo>\n`;
        textoXml += `    <descripcion>${sanitizarTextoXml(tarea.descripcion)}</descripcion>\n`;
        textoXml += `    <fecha>${tarea.fecha}</fecha>\n`;
        textoXml += `  </tarea>\n`;
    });

    textoXml += '</tareas>';

    console.log("--- FLUJO DE DATOS: XML GENERADO ---");
    console.log(textoXml);

    generarDescarga(textoXml, 'tareas_academicas.xml', 'application/xml');
});

// Función utilitaria para disparar la descarga de archivos en el cliente
function generarDescarga(contenidoTexto, nombreArchivo, tipoMime) {
    const bloqueDatos = new Blob([contenidoTexto], { type: tipoMime });
    const urlDescarga = URL.createObjectURL(bloqueDatos);
    const enlaceDescarga = document.createElement('a');

    enlaceDescarga.href = urlDescarga;
    enlaceDescarga.download = nombreArchivo;
    enlaceDescarga.click();

    URL.revokeObjectURL(urlDescarga); // Liberar memoria del navegador
}

// Sanitización para prevenir errores de parsing si el usuario ingresa caracteres reservados de XML
function sanitizarTextoXml(textoInseguro) {
    return textoInseguro.replace(/[<>&'"]/g, (caracter) => {
        switch (caracter) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

// 7. Renderizado inicial al cargar la ventana del navegador por primera vez
redibujarInterfaz();