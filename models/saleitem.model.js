const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleItemSchema = new Schema({
  productoId: { type: Schema.Types.ObjectId, ref: 'Producto' },
  cantidad: Number
})

module.exports = mongoose.model('SaleItem', SaleItemSchema, 'SaleItem')