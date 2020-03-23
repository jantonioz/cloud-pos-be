const router = require('express').Router()
const PurchaseController = require('../controllers/purchase.controller')

router.get('/purchases', PurchaseController.get)
router.post('/purchases', PurchaseController.add)

module.exports = router