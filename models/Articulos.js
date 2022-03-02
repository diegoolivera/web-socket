const path = require('path')
const fs = require('fs').promises


class Articulo {
  constructor() {
    this.path = path.join(__dirname, "../database/productos.json")
  }

  async getArticuloById(id) {
    const data = await this.readData()
    const art = data.find(a => a.id == id)
    if (!art) {
      throw new Error('Articulo not found')
    }
    return art
  }

  async add(articulo) {
    const data = await this.readData()
    // const id = data[data.length - 1] ? data[data.length - 1].id : 0
    // articulo.id = id + 1
    data.push(articulo)
    await this.writeData(data)
  }

  async getAll() {
    return await this.readData()
  }

  writeData(data) {
    return fs.writeFile(this.path, JSON.stringify(data, null, 2))
  }

  async readData () {
    const raw = await fs.readFile(this.path, "utf8")
    return JSON.parse(raw)
  }


}

module.exports = Articulo
