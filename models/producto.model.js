const mongo = require('mongoose')
const Schema = mongo.Schema

const productoSchema = new Schema({
  nombre: { type: String, required: [true, "nombre is required"] },
  precio: { type: Number, required: [true, "precio is required"] },
  peso: { type: Number, required: [true, "precio is required"] },
  categoria: { type: String, required: [true, "categoria is required"] },
  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, "usuario is required"] },
  iconId: { type: Number, required: [true, "iconId is required"] },
  isActive: { type: Boolean, default: 1 },
  created: { type: Schema.Types.Date, default: Date.now().toString() }
})

productoSchema.index({ nombre: 1, precio: 1, peso: 1 }, { unique: true })

module.exports = mongo.model('Producto', productoSchema, 'Producto')