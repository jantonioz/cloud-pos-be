const router = require('express').Router()
const SaleController = require('../controllers/sale.controller')

router.get('/sales', SaleController.get)
router.get('/Sales/:id', SaleController.getById)
router.post('/Sales', SaleController.add)

module.exports = router