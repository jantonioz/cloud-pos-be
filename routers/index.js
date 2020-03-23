const mainRouter = require('express').Router()

// ------------- Routers -------------
const UsuarioRouter = require('./usuario.router')
const ProductoRouter = require('./producto.router')
const PurchaseRouter = require('./purchase.router')
const SaleRouter = require('./sale.router')

mainRouter.use(UsuarioRouter)
mainRouter.use(ProductoRouter)
mainRouter.use(PurchaseRouter)
mainRouter.use(SaleRouter)

module.exports = mainRouter