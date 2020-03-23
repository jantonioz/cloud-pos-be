const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Store purchases inventory
 */
const PurchaseSchema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: 'PurchaseItem' }],
  dateTime: { type: Date, default: Date.now().toString() }
})

module.exports = mongoose.model('Purchase', PurchaseSchema, 'Purchase')