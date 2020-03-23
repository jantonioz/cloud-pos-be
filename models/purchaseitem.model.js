const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PurchaseItemSchema = new Schema({
  productoId: { type: Schema.Types.ObjectId, required: [true, "productId is required"], ref: 'Producto' },
  cantidad: { type: Number, required: [true, "cantidad is required"] },
  costoUnidad: { type: Number, required: [true, "costoUnidad is required"] },
  costoTotal: { type: Number, required: [true, "costoTotal is required"] }
})

module.exports = mongoose.model('PurchaseItem', PurchaseItemSchema, 'PurchaseItem')