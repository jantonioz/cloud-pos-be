const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PurchaseItemSchema = new Schema({
  sku: { type: Schema.Types.ObjectId, ref: 'Producto' },
  cantidad: Number
})

/**
 * Store purchases inventory
 */
const PurchaseSchema = new Schema({
  sellerName: String,
  items: [PurchaseItemSchema],
  dateTime: { type: Date, default: Date.now().toString() }
})

module.exports = mongoose.model('Purchase', PurchaseSchema, 'Purchase')