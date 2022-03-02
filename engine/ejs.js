//recibe el app.js
module.exports = function(app){
    //que busca las vistas en views
    app.set("views","./views/ejs")
    //que motor va usar
    app.set("view engine","ejs")
}