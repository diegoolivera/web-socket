
const socket = io()

const tabla = document.getElementById("tabla")
const formNuevoProducto = document.getElementById("form")



socket.on('productos', (productos) => {

     
    
    for (let i = 0; i < productos.length; i++) {

        let fila = document.createElement('tr');
        let colum1 = document.createElement("td")  
        let colum2 = document.createElement("td")  
        let colum3 = document.createElement("td")

        colum1.innerHTML = productos[i].name
        colum2.innerHTML = productos[i].price
        colum3.innerHTML = `<img src= ${productos[i].image} height="100">`
   
        fila.appendChild(colum1)
        fila.appendChild(colum2)
        fila.appendChild(colum3)
        
        tabla.appendChild(fila)    
        
    }
    
    

    console.log(productos)
    
})

formNuevoProducto.addEventListener("submit", e=>{
    e.preventDefault()

    const producto = {
        name: formNuevoProducto[0].value,
        price: formNuevoProducto[1].value,
        image: formNuevoProducto[2].value
    }

    socket.emit('nuevoProducto', producto);
    formNuevoProducto.reset()
})


//chat

const btnEnviar = document.getElementById("btnEnviarMesange")
const inputMesaje = document.getElementById("mensaje")
const inputEmail = document.getElementById("email")
const formChat = document.getElementById("chatForm")
const contenedorChat = document.getElementById('chatContenedor')


formChat.addEventListener('submit', e => {

    e.preventDefault()
    if (!inputMesaje.value) {
      return
    }
  
    const mensaje = {
      usuario:  inputEmail.value,
      fecha: Date.now(),
      mensaje: inputMesaje.value
    }

    socket.emit("mensaje", mensaje)
    render(mensaje)
    inputMesaje.value = null
    
})




const render = (data)=> {
    const msgElement = document.createElement("div")
    
    msgElement.innerHTML = `
        <div>
            <b style="color:blue;">${data.usuario}</b>
            [<span style="color:brown;">${new Date(data.fecha).toLocaleString()}</span>] :
            <i style="color:green;">${data.mensaje}</i>
        </div>  
    `
    contenedorChat.appendChild(msgElement)
    contenedorChat.scrollTop = contenedorChat.scrollHeight
  }


  