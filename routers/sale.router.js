const router = require('express').Router()
const SaleController = require('../controllers/sale.controller')

router.get('/sales', SaleController.get)
router.post('/Sales', SaleController.add)

module.exports = router