const express = require("express")
const app = express()
const path = require("path")
const Productos = require("./models/Articulos")
const Chat = require("./models/Chat")
const modelProductos = new Productos("./database/productos.json")
// const modelChat = new Chat("./database/chat.json")



//importar engine instrucciones para pug engine
const pugEngine = require("./engine/pug")
//para ejs
const ejsEngine = require("./engine/ejs")
//para handlebars
const hbsEngine = require("./engine/hbs")

//importar rutas pug
const pugRouter = require("./routes/pug")
//rutas ejs
const ejsRouter = require("./routes/ejs")
//rutas hbs
const hbsRouter = require("./routes/hbs")

const PORT  = process.env.PORT || 8080

//descomentar para usar pug y comentar ejs
// pugEngine(app)

//descomentar para usar ejs y comentar los demas
// ejsEngine(app)

hbsEngine(app)

const {Server} =require("socket.io")

//para crear un server montado en http asi require socket.io
const http = require("http")
const server = http.createServer(app)

//creamos el sv socket
const io = new Server(server)

//midwallers
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//sirve archivos estaticos en  /static
app.use("/static", express.static(path.join(__dirname,"public")))

//ruta principal pug
// app.use("/productos",pugRouter)

//ruta principal ejs
// app.use("/productos",ejsRouter)

//ruta principal hbs
// app.use("/productos",hbsRouter)

app.get("/productos",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})


const users = {}
//escuchamos el evento io
io.on("connection", async(socket)=>{

    const todosProductos = await modelProductos.getAll()
    
    socket.emit("productos",todosProductos)

    socket.on('nuevoProducto', async (producto) => {
        const nuevoProducto = await modelProductos.add(producto)
        socket.emit('producto', nuevoProducto)
    })

    //mensajes 
   
    //brodcast envia mensajes a todos
    socket.on("mensaje", (mensaje) => {
        socket.broadcast.emit("mensaje", mensaje)
      })
    
})

server.listen(PORT,()=>{
    console.log("escuchando el puerto:",PORT)
})