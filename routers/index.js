const mainRouter = require('express').Router()

// ------------- Routers -------------
const UsuarioRouter = require('./usuario.router')
const ProductoRouter = require('./producto.router')

mainRouter.use(UsuarioRouter)
mainRouter.use(ProductoRouter)

module.exports = mainRouter