const SaleItem = require('../models/saleitem.model')
const Sale = require('../models/sale.model')
const Producto = require('../models/producto.model')
const { errorHandler } = require('../utils/errorHandler')


class SaleController {
  async get(req, res) {
    try {
      const sales = await Sale.find(req.query).populate('items').exec()
      res.status(200).json(sales)
    } catch (error) {
      errorHandler(error, res)
    }
  }

  async add(req, res) {
    try {
      if (!Array.isArray(req.body)) throw { http: 400, code: 91, message: 'body must be an array' }
      const saleItems = req.body
      await Promise.all(
        saleItems.map(async item => {
          const producto = await Producto.findById(item.productoId)
          producto.cantidad = producto.cantidad - item.cantidad
          await producto.save()
        })
      )
      const mapedSaleItems = saleItems.map(item => ({ sku: item.productoId, cantidad: item.cantidad }))
      const sale = await Sale.create({ items: mapedSaleItems, dateTime: Date.now().toString() })
      res.status(200).json(sale)
    } catch (error) {
      errorHandler(error, res)
    }
  }
}

module.exports = new SaleController()