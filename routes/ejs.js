const path = require("path")
const {Router} = require("express")
const Articulo = require("../models/Articulos")

const router = Router()

//objeto clase Articulo
const articuloModels = new Articulo()

//renderizar la plantilla
router.get("/",async(req,res)=>{
    //obtenemos articulos
    const articulos = await articuloModels.getAll()
    //plantilla + objeto contexto de la plantilla
    res.render("index", {articulos})
})

router.get('/add', (req, res) => res.render('nuevo'));

//añadir un articulo

router.post('/add', async (req, res) => {

    articuloModels.add(req.body)
  
    res.redirect(`/productos/result?articulo=${req.body.name}`)
  });

  
router.get('/result', (req, res) => {
    const articulo = req.query.articulo
    res.render('result', { articulo })
  });

module.exports = router
    