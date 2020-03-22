const Joi = require('@hapi/joi')
const { errorHandler } = require('../utils/errorHandler')

const addValidator = Joi.object().keys({
  nombre: Joi.string().required(),
  precio: Joi.number().positive().required(),
  peso: Joi.number().positive().required(),
  categoria: Joi.string().required(),
  usuarioId: Joi.string().required(),
  iconId: Joi.number()
})

const updateValidator = Joi.object().keys({
  id: Joi.string().required(),
  nombre: Joi.string().required(),
  precio: Joi.number().positive().required(),
  peso: Joi.number().positive().required(),
  categoria: Joi.string().required(),
  usuarioId: Joi.string().required(),
  iconId: Joi.number()
})

const getValidator = Joi.object().keys({
  nombre: Joi.string().optional(),
  precio: Joi.number().positive().optional(),
  peso: Joi.number().positive().optional(),
  categoria: Joi.string().optional(),
  iconId: Joi.number().optional(),
  usuarioId: Joi.string().optional(),
  active: Joi.boolean().optional(),
})

const idValidator = Joi.string().required()

module.exports = {
  add: async (req, res, next) => {
    try {
      req.producto = await addValidator.validateAsync(req.body)
      next()
    } catch (error) {
      errorHandler({ code: 2, http: 400, message: error.message }, res)
    }
  },
  get: async (req, res, next) => {
    try {
      req.productoFind = await getValidator.validateAsync(req.params)
      next()
    } catch (error) {
      errorHandler({ code: 3, http: 400, message: error.message }, res)
    }
  },
  getById: async (req, res, next) => {
    try {
      req.productoId = await idValidator.validateAsync(req.params.id)
      next()
    } catch (error) {
      errorHandler({ code: 4, http: 400, message: error.message }, res)
    }
  },
  update: async (req, res, next) => {
    try {
      req.producto = await updateValidator.validateAsync({ ...req.body, id: req.params.id })
      next()
    } catch (error) {
      errorHandler({ code: 5, http: 400, message: error.message }, res)
    }
  },
  delete: async (req, res, next) => {
    try {
      req.productoId = await idValidator.validateAsync(req.params.id)
      next()
    } catch (error) {
      errorHandler({ code: 6, http: 400, message: error.message }, res)
    }
  }
}