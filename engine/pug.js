//recibe el app.js
module.exports = function(app){
    //que busca las vistas en views
    app.set("views","./views/pug")
    //que motor va usar
    app.set("view engine","pug")
}