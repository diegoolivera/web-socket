const path = require("path")
const {Router} = require("express")
const Articulo = require("../models/Articulos")

const router = Router()

//objeto clase Articulo
const articuloModels = new Articulo()

//renderizar la plantilla
router.get("/",async(req,res)=>{
    //obtenemos articulos
    // const articulos = await articuloModels.getAll()
    //plantilla + objeto contexto de la plantilla
    // res.render("index", {articulos})

    const productos =  await articuloModels.getAll()
    res.render("index", {productos})
})

// router.get('/add', (req, res) => res.render('nuevo'));

//añadir un articulo

router.post('/add', async (req, res) => {

    articuloModels.add(req.body)
  
    // res.redirect(`/productos/result?articulo=${req.body.name}`)
    res.redirect("/api/productos")
  });

router.get("/:id", async (req, res) => {
    const { id } = req.params
  
    const producto = await articuloModels.getById(id)
    if (!producto) {
      res.sendStatus(404)
    } else {
      res.send(producto)
    }
    
  })


  router.put("/:id", async (req, res) => {
    const { body } = req
    const { id } = req.params
    
    const exists = await articuloModels.exists(id)
  
    console.log(exists, id)
    if (!exists) {
      res.sendStatus(404)
      return
    }
  
    await articuloModels.update(id, body)
  
    res.sendStatus(200)
  })
  
router.get('/result', (req, res) => {
    const articulo = req.query.articulo
    res.render('result', { articulo })
  });

module.exports = router
    