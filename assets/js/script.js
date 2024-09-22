let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionGastos = [];
let modoEdicion = false;
let posicionEdicion = -1;

function clickBoton() {
    let nombreGasto = document.getElementById("nombreGasto");
    let valorGasto = document.getElementById("valorGasto");
    let descripcionGasto = document.getElementById("descripcionGasto");
    let botonAgregar = document.getElementById("botonFormulario");
    
    // Reiniciar los bordes a su color inicial
    nombreGasto.style.border = "";
    valorGasto.style.border = "";
    descripcionGasto.style.border = "";
    
    let camposValidos = true;
    
    if (nombreGasto.value === "") {
        nombreGasto.style.border = "2px solid red";
        camposValidos = false;
        alert("Debe llenar todos los campos")
    }
    
    if (valorGasto.value === "") {
        valorGasto.style.border = "2px solid red";
        camposValidos = false;
        alert("Debe llenar todos los campos")
    }
    
    if (descripcionGasto.value === "") {
        descripcionGasto.style.border = "2px solid red";
        camposValidos = false;
        alert("Debe llenar todos los campos")
    }
    
    if (camposValidos) {
        if (modoEdicion) {
            // Actualizar el gasto existente
            if (nombreGasto.value !== "") listaNombresGastos[posicionEdicion] = nombreGasto.value;
            if (valorGasto.value !== "") listaValoresGastos[posicionEdicion] = valorGasto.value;
            if (descripcionGasto.value !== "") listaDescripcionGastos[posicionEdicion] = descripcionGasto.value;
            
            modoEdicion = false;
            posicionEdicion = -1;
            botonAgregar.textContent = "Agregar";
            actualizarListaGastos();
        } else {
            // Agregar nuevo gasto
            listaNombresGastos.push(nombreGasto.value);
            listaValoresGastos.push(valorGasto.value);
            listaDescripcionGastos.push(descripcionGasto.value);
        }
        gastoMayor();
        actualizarListaGastos();
    } else {
        alert("Debe llenar todos los campos");
    }
}

function actualizarListaGastos(){
    const listaElementos = document.getElementById("listaDeGastos");
    const totalElementos = document.getElementById("totalGastos");
    let htmlTabla = "<table class='gastos-tabla'>"+
    "<tr><th>Nombre</th><th>Precio</th><th>Descripción</th><th>Acciones</th></tr>";
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        htmlTabla += `
            <tr>
                <td>${elemento}</td>
                <td>USD ${valorGasto.toFixed(2)}</td>
                <td>${listaDescripcionGastos[posicion]}</td>
                <td>
                    <button id='boton-eliminar' onclick='eliminarGasto(${posicion})'>Eliminar</button>
                    <button id='boton-modificar' onclick='modificarGasto(${posicion})'>Modificar</button>
                </td>
            </tr>
        `;
        totalGastos += Number(valorGasto);
    });

    htmlTabla += "</table>";
    listaElementos.innerHTML = htmlTabla;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar(){
    document.getElementById("nombreGasto").value = "";
    document.getElementById("valorGasto").value = "";
    document.getElementById("descripcionGasto").value="";
}

function eliminarGasto(posicion){
    listaNombresGastos.splice(posicion,1);
    listaValoresGastos.splice(posicion,1);
    actualizarListaGastos();
}

function gastoMayor(){
    let valorGasto = document.getElementById("valorGasto").value;
    if(valorGasto>150){
        alert("El valor del gasto es mayor a 150");
    }
}

function modificarGasto(posicion){
    let nombreGasto = document.getElementById("nombreGasto");
    let valorGasto = document.getElementById("valorGasto");
    let descripcionGasto = document.getElementById("descripcionGasto");
    let botonAgregar = document.getElementById("botonFormulario");
    
    nombreGasto.value = listaNombresGastos[posicion];
    valorGasto.value = listaValoresGastos[posicion];
    descripcionGasto.value = listaDescripcionGastos[posicion];

    modoEdicion = true;
    posicionEdicion = posicion;
    botonAgregar.textContent = "Actualizar";
}