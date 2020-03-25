const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleItemSchema = new Schema({
  sku: { type: Schema.Types.ObjectId, ref: 'Producto' },
  cantidad: Number
})

const SaleSchema = new Schema({
  items: [SaleItemSchema],
  dateTime: { type: Schema.Types.Date, default: Date.now().toString() }
})

module.exports = mongoose.model('Sale', SaleSchema, 'Sale')