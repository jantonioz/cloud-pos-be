const moment = require('moment')
const SaleItem = require('../models/saleitem.model')
const Sale = require('../models/sale.model')
const Producto = require('../models/producto.model')
const { errorHandler } = require('../utils/errorHandler')

class SaleController {
  async get(req, res) {
    try {
      const sales = await Sale.find(req.query)
      // const result = {}
      // if (sales.length) {
      //   sales.forEach(sale => {
      //     const month = moment.utc(sale.dateTime).get('month')
      //     result[month] = !Array.isArray(result[month]) ? [] : result[month]
      //     result[month].push(sale)
      //   })
      // }
      res.status(200).json(sales/* .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)) */)
    } catch (error) {
      errorHandler(error, res)
    }
  }

  async getById(req, res) {
    try {
      const sale = await Sale.find(req.params.id).populate('items').exec()
      res.status(200).json(sale)
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
          const producto = await Producto.findById(item.productoId || item._id)
          producto.cantidad = producto.cantidad - Number(item.cant)
          await producto.save()
        })
      )
      const mapedSaleItems = saleItems.map(item => ({ sku: item.productoId, cantidad: Number(item.cant) }))
      const sale = await Sale.create({ items: mapedSaleItems, dateTime: Date.now().toString() })
      res.status(200).json(sale)
    } catch (error) {
      errorHandler(error, res)
    }
  }
}

module.exports = new SaleController()