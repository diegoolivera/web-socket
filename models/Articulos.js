const path = require("path");
const knex = require("knex");
const fs = require("fs").promises;

class Articulo {
  constructor() {
    this.path = path.join(__dirname, "../database/productos.json");
    this.db = knex(
      {
        client: "mysql",
        connection:{
          host: "localhost",
          port: 3306, //especificado en la bd
          user: "root",
          password: "",
          database: "productos_db"
        }
      }  
      // {
      //   client: "sqlite3",
      //   connection:{
      //     filename: "Articulos.sqlite3"
      //   },
      //   useNullAsDefault: true
      // }  
    )
  }

  async getArticuloById(id) {
    // const data = await this.readData();
    // const art = data.find((a) => a.id == id);
    // if (!art) {
    //   throw new Error("Articulo not found");
    // }
    // return art;

    const producto = await this.db("productos")
      .where({ id })
      .first()

    return producto

  }

  async add(producto) {
    // const data = await this.readData();
    // // const id = data[data.length - 1] ? data[data.length - 1].id : 0
    // // articulo.id = id + 1
    // data.push(articulo);
    // await this.writeData(data);
    const result = await this.db("productos")
      .insert(producto)



    return result[0]
  }

  async getAll() {
    // return await this.readData();
    const productos = await this.db.select().table('productos')
    return productos
  }

  // writeData(data) {
  //   return fs.writeFile(this.path, JSON.stringify(data, null, 2));
  // }

  async update(id, body) {
    console.log(id, body)
    await this.db("productos")
      .where({ id })
      .update(body)
  }

  // async readData() {
  //   const raw = await fs.readFile(this.path, "utf8");
  //   return JSON.parse(raw);
  // }


  async delete (id) {
     await this.db("productos").where({ id }).del()

  }

  async loadData () {
    try {
      //schema significa en esta base de datos
      //elimina la tabla si existe
      await this.db.schema.dropTableIfExists("productos")
      //crea una tabla
      await this.db.schema.createTable("productos", (table) => {
        //columnas
        table.increments("id")
        table.string("name")
        table.integer("price")
        table.string("image")
      })

      const raw = await fs.readFile(path.join(__dirname, "../database/productos.json"))
      const productos = JSON.parse(raw)

      for (const p of productos) {
        await this.db("productos").insert(p)
      }
    } catch (e) {
      throw e
    }
    
  }

  async exists(id) {
    const result = await this.db("productos")
      .where({ id })
      .count("id as count")
      .first()
      
      
    console.log(result.count)
    return result.count == 1
  }


}

module.exports = Articulo;
