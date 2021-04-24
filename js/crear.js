function Guardar(){
    var nombres = document.getElementById("nombres").value;
    var apellidos = document.getElementById("apellidos").value;
    var correo = document.getElementById("correo").value;
    var celular = document.getElementById("celular").value;

    var datos = JSON.parse(localStorage.getItem("datos"))
    
    if (datos.length == 0) {
        localStorage.setItem("datos",JSON.stringify([]))    
    }
    var obj = {
        nombres:nombres,
        apellidos:apellidos,
        correo:correo,
        celular:celular
    }

    datos.push(obj);
    localStorage.setItem("datos",JSON.stringify(datos))
    alert("Usuario guardado exitosamente")
    window.location.href = 'index.html'
}

function cancelar(){
    window.location.href = 'index.html'
}