const Purchase = require('../models/purchase.model')
const PurchaseItem = require('../models/purchaseitem.model')
const Producto = require('../models/producto.model')
const { errorHandler } = require('../utils/errorHandler')

class PurchaseController {
  async get(req, res) {
    try {
      const { _id, dateTime, startDate, endDate } = req.query
      let filters = {}
      if (startDate && endDate) {
        filters.dateTime = {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate)
        }
      }
      if (_id) filters._id = _id
      if (dateTime) filters.dateTime = dateTime

      const purchases = await Purchase.find({
        ...filters,
      }).populate('items.sku')

      res.status(200).json(purchases)
    } catch (error) {
      errorHandler({ code: error.code, massage: error.message, http: 500 }, res)
    }
  }

  async add(req, res) {
    try {
      let sellerName = req.body.sellerName || "No. id"
      if (!Array.isArray(req.body.items)) throw { code: 400, message: 'Items must be an array' }

      const purchaseItems = req.body.items

      // purchaseItems.forEach(item => {
      //   if (!item.cant || !Number.isNaN(item.cant) || Number(item.cant) === 0)
      //     throw { http: 409, code: 201, message: { text: 'Item quantity not allowed', details: item } }
      // })

      await Promise.all(
        purchaseItems.map(async item => {
          const producto = await Producto.findById(item.productoId || item._id)
          // if (producto.cantidad - Number(item.cant) < 0) throw { http: 409, code: 200, message: 'Illegal acction' }
          producto.cantidad = producto.cantidad + Number(item.cant)
          await producto.save()
        })
      )
      const mappedPurchaseItem = purchaseItems.map(item => ({ sku: item.productoId || item._id, cantidad: Number(item.cant) }))
      const purchase = await Purchase.create({ items: mappedPurchaseItem, dateTime: Date.now().toString(), sellerName })
      res.status(200).json(purchase)
    } catch (error) {
      errorHandler({ code: error.code, massage: error.message, http: 500 }, res)
    }
  }
}

module.exports = new PurchaseController()