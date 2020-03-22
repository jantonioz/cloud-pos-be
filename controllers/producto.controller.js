const ProductoModel = require('../models/producto.model')
const { errorHandler } = require('../utils/errorHandler')

class ProductoController {
  async add(req, res) {
    try {
      if (Array.isArray(req.body)) {
        const productos = await ProductoModel.insertMany(req.body)
        return res.status(200).json(productos)
      }
      const producto = await ProductoModel.create({ ...req.body, isActive: 1 })
      res.status(200).json(producto)
    } catch (error) {
      errorHandler({ code: error.code, http: 500, message: error.message }, res)
    }
  }

  async get(req, res) {
    try {
      const productos = await ProductoModel.find(req.query).populate('Usuario').exec()
      res.status(200).json(productos)
    } catch (error) {
      errorHandler({ code: 31, http: 500, message: error.message }, res)
    }
  }

  async getById(req, res) {
    try {
      const producto = await ProductoModel.findById(req.params.id).populate().exec()
      res.status(200).json(producto)
    } catch (error) {
      errorHandler({ code: 41, http: 500, message: error.message }, res)
    }
  }

  async update(req, res) {
    try {
      const producto = await ProductoModel.updateOne({ _id: req.params.id, isActive: 1 }, req.body)
      res.status(200).json(producto)
    } catch (error) {
      errorHandler({ code: 51, http: 500, message: error.message }, res)
    }
  }

  async delete(req, res) {
    try {
      const producto = await ProductoModel.findById(req.params.id)
      producto.isActive = false
      producto.save()
      // await ProductoModel.deleteOne({ id: req.productoId })
      res.status(200).json(producto)
    } catch (error) {
      errorHandler({ code: 61, http: 500, message: error.message }, res)
    }
  }
}

module.exports = new ProductoController()