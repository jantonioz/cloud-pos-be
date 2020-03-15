const mongo = require('mongoose')
const Schema = mongo.Schema

const productoSchema = new Schema({
  nombre: String,
  precio: Number,
  peso: Number,
  categoria: String
})

module.exports = mongo.model('Producto', productoSchema)