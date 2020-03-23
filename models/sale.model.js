const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleSchema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: 'SaleItem' }],
  dateTime: { type: Schema.Types.Date, default: Date.now().toString() }
})

module.exports = mongoose.model('Sale', SaleSchema, 'Sale')