
const {engine} = require("express-handlebars")


//recibe el app.js
module.exports = function(app){
    app.engine("handlebars",engine({
        defaultLayout:false,
        layoutDir:__dirname+'/views/handlebars/layouts'
    }))
    //que busca las vistas en views
    app.set("views","./views/handlebars")
    //que motor va usar
    app.set("view engine","handlebars")
}