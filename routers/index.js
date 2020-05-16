"use strict"
const mainRouter = require('express').Router()
const jwt = require('jsonwebtoken')

// ------------- Routers -------------
const UsuarioRouter = require('./usuario.router')
const ProductoRouter = require('./producto.router')
const PurchaseRouter = require('./purchase.router')
const SaleRouter = require('./sale.router')

mainRouter.use((req, res, next) => {
  if (req.get('API-KEY') === process.env.API_KEY) next()
  else res.status(401).json({ error: { message: 'Invalid API Security Key', code: 401 } })
})

mainRouter.use(UsuarioRouter)

mainRouter.use((req, res, next) => {
  const coded = req.get('AUTH-TOKEN')
  if (coded) {
    const decoded = jwt.decode(coded)
    if (decoded && decoded.username && (require('../models/usuario.model').find({ username: decoded.username })))
      next()
  }
  else
    res.status(401).json({ error: { message: 'Invalid API Security Key', code: 401 } })
})

mainRouter.use(ProductoRouter)
mainRouter.use(PurchaseRouter)
mainRouter.use(SaleRouter)

module.exports = mainRouter