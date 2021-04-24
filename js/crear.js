function Guardar(){
    Swal.fire({
        title: '¿Está seguro que desea guardar el usuario?',
        showDenyButton: true,
        
        confirmButtonText: `Guardar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
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
            Swal.fire({
                title: 'Usuario guardado exitosamente',
                confirmButtonText: `Ok`,
                icon:'success'
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                window.location.href = 'index.html'
            }
          })
            // Swal.fire('Usuario guardado exitosamente', '', 'success')
            // window.location.href = 'index.html'
        } else if (result.isDenied) {
          Swal.fire('Usuario no ha sido guardado', '', 'info')
        }
    })
    
}

function cancelar(){
    window.location.href = 'index.html'
}
