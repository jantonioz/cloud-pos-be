const moment = require('moment')
const SaleItem = require('../models/saleitem.model')
const Sale = require('../models/sale.model')
const Producto = require('../models/producto.model')
const { errorHandler } = require('../utils/errorHandler')

class SaleController {
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

      const sales = await Sale.find({
        ...filters,
        // ...req.query
      }).populate('items.sku').exec()

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
      let clientName = ""
      if (!Array.isArray(req.body)) {
        clientName = req.body.clientName
        req.body = req.body.items
      }
      if (!Array.isArray(req.body)) throw { http: 400, code: 91, message: 'body must be an array' }
      const saleItems = req.body

      // saleItems.forEach(item => {
      //   if (!item.cant || !Number.isNaN(item.cant) || Number(item.cant) === 0)
      //     throw { http: 409, code: 101, message: { text: 'Item quantity not allowed', details: item } }
      // })

      await Promise.all(
        saleItems.map(async item => {
          const producto = await Producto.findById(item.productoId || item._id)
          // if (producto.cantidad - Number(item.cant) < 0) throw { http: 409, code: 100, message: 'Illegal acction' }
          producto.cantidad = producto.cantidad - Number(item.cant)
          await producto.save()
        })
      )
      const mapedSaleItems = saleItems.map(item => ({ sku: item.productoId || item._id, cantidad: Number(item.cant) }))
      const sale = await Sale.create({ items: mapedSaleItems, dateTime: Date.now().toString(), clientName })
      res.status(200).json(sale)
    } catch (error) {
      errorHandler(error, res)
    }
  }
}

module.exports = new SaleController()