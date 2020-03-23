const Purchase = require('../models/purchase.model')
const PurchaseItem = require('../models/purchaseitem.model')
const Producto = require('../models/producto.model')
const { errorHandler } = require('../utils/errorHandler')

class PurchaseController {
  async get(req, res) {
    try {
      // const purchases = await Purchase.find(req.query).populate({ path: 'items', populate: { path: 'productoId' } }).exec()
      const purchases = await Purchase.find(req.query).populate('items').exec()
      res.status(200).json(purchases)
    } catch (error) {
      errorHandler({ code: error.code, massage: error.message, http: 500 }, res)
    }
  }

  async add(req, res) {
    try {
      const purchaseItems = await PurchaseItem.insertMany(req.body)
      const productosUpdated = await Promise.all(
        purchaseItems.map(async item => {
          const producto = await Producto.findById(item.productoId)
          producto.cantidad = producto.cantidad + item.cantidad
          await producto.save()
        })
      )
      const purchase = await Purchase.create({ items: purchaseItems.map(i => i.id), dateTime: Date.now().toString() })
      res.status(200).json(purchase)
    } catch (error) {
      errorHandler({ code: error.code, massage: error.message, http: 500 }, res)
    }
  }
}

module.exports = new PurchaseController()