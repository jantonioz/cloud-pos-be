const router = require('express').Router()
const ProductoMiddleware = require('../middlewares/producto.middleware')
const ProductoController = require('../controllers/producto.controller')

router.post('/productos', /* ProductoMiddleware.add, */ ProductoController.add)
router.get('/productos', /* ProductoMiddleware.get, */ ProductoController.get)
router.get('/productos/:id', /* ProductoMiddleware.getById, */ ProductoController.getById)
router.put('/productos/:id', /* ProductoMiddleware.update, */ ProductoController.update)
router.delete('/productos/:id', /* ProductoMiddleware.delete, */ ProductoController.delete)

module.exports = router