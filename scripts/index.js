let apiUsers = `https://63642eff8a3337d9a2f312fe.mockapi.io/users`;
let entradaUsuario = document.getElementById('inputGet1Id');

// botones
let btnBuscar = document.getElementById('btnGet1');
let btnAgregar = document.getElementById('btnPost');
let btnModificar = document.getElementById('btnPut');
let btnBorrar = document.getElementById('btnDelete');

// inputs
let inputGet1Id = document.getElementById('inputGet1Id');
let inputPostNombre = document.getElementById('inputPostNombre');
let inputPostApellido = document.getElementById('inputPostApellido');
let inputPutId = document.getElementById('inputPutId');
let inputDelete = document.getElementById('inputDelete');

//función para que lo que pone el usuario se busque en la api y se muestre en la lista
function mostrarEnLista(input){
    fetch(`https://63642eff8a3337d9a2f312fe.mockapi.io/users/${input}`)
    .then(response => response.json())
    .then(datos => {

        if (entradaUsuario.value === "") {
            fetch(apiUsers)
            .then(respuesta => respuesta.json())
            .then(listadoRegistros => {
                let datos = "";

                for (let x = 0; x < listadoRegistros.length; x++) {
                    datos += 
            `<li>ID: ${listadoRegistros[x].id}<br>NAME: ${listadoRegistros[x].name}<br>LASTNAME: ${listadoRegistros[x].lastname}</li>`;  
                }
                document.getElementById('results').innerHTML = datos;
            })
        } else {
            document.getElementById('results').innerHTML = 
            `<li>ID: ${datos.id}<br>NAME: ${datos.name}<br>LASTNAME: ${datos.lastname}</li>`;
        }
        inputGet1Id.value = "";
    })
}


//funcion para mostrar en la lista los registros que agregamos a la api
function mostrarAgregadosEnLista(registro){
    fetch(apiUsers)
    .then(respuesta => respuesta.json())
    .then(listadoRegistros => {
        for (let x = 0; x < listadoRegistros.length; x++) {
            document.getElementById('results').innerHTML += 
    `<li>ID: ${listadoRegistros[x].id}<br>NAME: ${listadoRegistros[x].name}<br>LASTNAME: ${listadoRegistros[x].lastname}</li>`;  
        }
    })
}

//funcion para agregar registro
function enviarDatosApi(){
    fetch(apiUsers, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            name: document.getElementById('inputPostNombre').value,
            lastname: document.getElementById('inputPostApellido').value
        })
        })
    .then(response => response.json())
    .then(data => mostrarAgregadosEnLista(data))
}

// funcion para borrar
function borrar(){
    fetch("https://63642eff8a3337d9a2f312fe.mockapi.io/users/" + inputDelete.value, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'DELETE',
        })
    .then(response => response.json())
    .then(data => mostrarAgregadosEnLista(data))
    // .then(response => console.log(response))
    };
    
// funcion para modificar
function modificar(){
    fetch('https://63642eff8a3337d9a2f312fe.mockapi.io/users/' + id, {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'PUT',
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }






document.addEventListener('DOMContentLoaded', ()=>{
    // busca
    btnBuscar.addEventListener('click', ()=>{
        mostrarEnLista(entradaUsuario.value);
    })
    // agrega 
    document.getElementById('btnPost').addEventListener('click', ()=>{
        enviarDatosApi();
    })

// deshabilita y habilita botones
    // BUSCAR
    inputGet1Id.addEventListener('click', function(){
        btnBuscar.disabled = false;
        btnAgregar.disabled = true;
        btnModificar.disabled = true;
        btnBorrar.disabled = true;
    })
    // AGREGAR
    inputPostNombre.addEventListener('click', function(){
        btnBuscar.disabled = true;
        btnAgregar.disabled = false;
        btnModificar.disabled = true;
        btnBorrar.disabled = true;
    })
    inputPostApellido.addEventListener('click', function(){
        btnBuscar.disabled = true;
        btnAgregar.disabled = false;
        btnModificar.disabled = true;
        btnBorrar.disabled = true;
    })
    // MODIFICAR
    inputPutId.addEventListener('click', function(){
        btnBuscar.disabled = true;
        btnAgregar.disabled = true;
        btnModificar.disabled = false;
        btnBorrar.disabled = true;
    })
    //BORRAR
    inputDelete.addEventListener('click', function(){
        btnBuscar.disabled = true;
        btnAgregar.disabled = true;
        btnModificar.disabled = true;
        btnBorrar.disabled = false;
    })
    btnBorrar.addEventListener('click', function(){
        borrar();
    })
    




});