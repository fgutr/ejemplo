// function agregarArticulo(){
//     var articulo = document.getElementById("entrada").value;
//     var ul = document.getElementById("lista");
//     var li = document.createElement("li");
//     li.appendChild(document.createTextNode(articulo));
//     ul.appendChild(li);
//     document.getElementById("entrada").value = "";
//     alert("Artículo agregado exitosamente.")
// }
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
}

function cargaInicial(){
    // var datos = [
    //     {
    //         nombres:"Fernando A.",
    //         apellidos:"Gutierrez R",
    //         correo:"fernandogutir@gmail.com",
    //         celular:"+569 12345678"
    //     }
    // ]
    // localStorage.setItem("datos",JSON.stringify(datos))
    if (!localStorage.getItem("datos")) {
        localStorage.setItem("datos",JSON.stringify([]))
    }
    var d = JSON.parse(localStorage.getItem("datos"))
    var columnas = ["nombres","apellidos","correo","celular","eliminar"]
    var body = document.getElementById("filas");
    console.log(body);
    var contador = 0
    for (const iterator of d) {
        
        var tr = document.createElement("tr");
        columnas.forEach(element => {
            var td = document.createElement("td");
            var text = ""
            if (element == "eliminar") {
                text = createElementFromHTML(`<button type="button" class="btn btn-danger" id="${contador}">Eliminar</button>`)
                
            }else{
                text = document.createTextNode(iterator[element])
            }
            td.appendChild(text);
            tr.appendChild(td)
        });
        
        body.appendChild(tr);
        console.log(contador);
        document.getElementById(`${contador}`).addEventListener("click",function(e){
            Swal.fire({
                title: '¿Estas seguro de eliminar el usuario?',
                
                showCancelButton: true,
                confirmButtonText: `Eliminar`,
                denyButtonText: `Cancelar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    var d = JSON.parse(localStorage.getItem("datos"))
                    d.splice(e.target.id,1)
                    localStorage.setItem("datos",JSON.stringify(d))
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Usuario eliminado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    
                    location.reload()
                    
                } 
              })
            
        })
        contador++
    }
}
cargaInicial()


function cargarUsuarios(){
    fetch('https://randomuser.me/api/?results=15', {
        method: 'GET', // or 'PUT'
        // body: JSON.stringify(data), // data can be `string` or {object}!
        // headers:{
        //   'Content-Type': 'application/json'
        // }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response.results)
        var columnas = ["first","last","email","cell"]
        var body = document.getElementById("filas-remotas");
        console.log(body);
        for (const iterator of response.results) {
            
            var tr = document.createElement("tr");
            columnas.forEach(element => {
                var td = document.createElement("td");
                if (element == "first" || element == "last") {
                    text = iterator["name"][element]
                }else{
                    text = iterator[element]
                }
                td.appendChild(document.createTextNode(text));
                tr.appendChild(td)
            });
            
            body.appendChild(tr);
        }
    });
}
cargarUsuarios()

