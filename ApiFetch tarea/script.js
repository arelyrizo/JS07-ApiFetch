async function solicitudGet() {
    const response = await fetch("https://reqres.in/api/users?delay=3");
    const json = await response.json();
    return json;

}
function  almacenar (Valor ){
    localStorage.setItem("almacenar", Valor  );
    let almacenar = localStorage.getItem("almacenar");  
    return almacenar;
}

async function exec(){
    var tabla = document.createElement("table");

    // obtener la fecha actual
    const fechaActual = new Date();
    // obtiene la fecha guardada en el local storage
     const fechaAnteriorStr = localStorage.getItem(`fechaAlmacenada`);
     const fechaAnterior = new Date (fechaAnteriorStr);
     console.log( "Resultado de la fecha anterior", fechaAnterior);
    const diferenciaDeTiempo =  fechaActual - fechaAnterior ;
      
    console.log( "Resultado de la diferencia de tiempo", diferenciaDeTiempo);
    let obtenerValor;
    if( !fechaAnteriorStr || diferenciaDeTiempo === 60000 ) {
        // hace la peticion a la pagina web
         obtenerValor = await solicitudGet(); 
        
    }else{ 
        obtenerValor= localStorage.getItem("almacenar");
        obtenerValor = JSON.parse(obtenerValor);
    }
    setTimeout(function () {
        localStorage.removeItem("almacenar");
        localStorage.removeItem("fechaAlmacenada");
        console.log('El elemento ha expirado.');
        tabla.remove();
    }, 60000);
    
    console.log( obtenerValor);
    // guarda el resultado de la petiocion en localStorage
    let guardar  = almacenar(JSON.stringify(obtenerValor));
    console.log(guardar);
    
    //almacenar la fecha actual en el localStorage
    localStorage.setItem(`fechaAlmacenada`, fechaActual.toString());

    const datos = JSON.parse ( guardar);

      // Obtener la referencia al cuerpo de la tabla
    var cuerpoTabla = document.body;
    // Crear la tabla y su encabezado
    tabla = document.createElement("table");
    var encabezado = tabla.createTHead();
    var filaEncabezado = encabezado.insertRow();

    tabla.classList.add("table", "table-bordered", "table-striped", "table-hover"); // Agregar clases de Bootstrap

    // Crear las celdas del encabezado
    for (var clave in datos.data[0]) {
        var celda = filaEncabezado.insertCell();
        celda.textContent = clave;
    }

    // Agregar datos a la tabla
    for (var i = 0; i < datos.data.length; i++) {
        var fila = tabla.insertRow();
        for (var clave in datos.data[i]) {
            var celda = fila.insertCell();

            // Verificar si la clave es "imagen" y agregar una imagen
            if (clave === "avatar") {
                var imagen = document.createElement("img");
                imagen.src = datos.data[i][clave];
                imagen.alt = "Imagen de " + datos.data[i]["first_name"];
                imagen.classList.add("circular-image"); // Agregar la clase personalizada
                celda.appendChild(imagen);
            } else {
                celda.textContent = datos.data[i][clave];
                
        }

        }
    }

    // Agregar la tabla al cuerpo de la página
    cuerpoTabla.appendChild(tabla);
}


exec();