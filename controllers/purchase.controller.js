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
      let sellerName = req.body.sellerName
      if (!Array.isArray(req.body.items)) throw { code: 400, message: 'Items must be an array' }

      const purchaseItems = await Promise.all(
        req.body.items.map(async item => {
          const producto = await Producto.findById(item.productoId || item._id)
          producto.cantidad = producto.cantidad + Number(item.cant)
          await producto.save()
          return { sku: item.productoId, cantidad: Number(item.cant) }
        })
      )

      const purchase = await Purchase.create({ items: purchaseItems, dateTime: Date.now().toString(), sellerName })
      res.status(200).json(purchase)
    } catch (error) {
      errorHandler({ code: error.code, massage: error.message, http: 500 }, res)
    }
  }
}

module.exports = new PurchaseController()