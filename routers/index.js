const mainRouter = require('express').Router()

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
mainRouter.use(ProductoRouter)
mainRouter.use(PurchaseRouter)
mainRouter.use(SaleRouter)

module.exports = mainRouter