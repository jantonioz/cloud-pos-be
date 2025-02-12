const mongo = require('mongoose')
const Schema = mongo.Schema

const usuarioSchema = new Schema({
  nombre: String,
  username: String,
  password: String,
  lastLogin: Schema.Types.Date,
  serverURI: String,
})

module.exports = mongo.model('Usuario', usuarioSchema, 'Usuario')