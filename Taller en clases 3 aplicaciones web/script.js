function ejecutarBucle() {

    var input1 = document.getElementById('numero1');
    var input2 = document.getElementById('numero2');
    var lista = document.getElementById('resultados');

    var num1 = parseFloat(input1.value);
    var num2 = parseFloat(input2.value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor ingrese ambos números.");
        return;
    }


    lista.innerHTML = "";

   
    for (var i = 1; i <= 5; i++) {
        var res = 0;
        var op = "";

        if (i === 1) {
            op = "SUMA";
            res = num1 + num2;
        } else if (i === 2) {
            op = "RESTA";
            res = num1 - num2;
        } else if (i === 3) {
            op = "MULTIPLICACIÓN";
            res = num1 * num2;
        } else if (i === 4) {
            op = "DIVISIÓN";
            res = num2 !== 0 ? (num1 / num2) : "No se puede dividir por cero";
        } else if (i === 5) {
            op = "MOD (%)";
            res = num2 !== 0 ? (num1 % num2) : "No se puede calcular MOD con cero";
        }

        // Crear elemento de lista y agregar
        var li = document.createElement("li");
        li.innerHTML = "<b>Iteración " + i + " (" + op + "):</b> " + res;
        lista.appendChild(li);
    }
}