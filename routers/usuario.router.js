const router = require('express').Router()
const UsuarioMiddleware = require('../middlewares/usuario.middleware')
const UsuarioController = require('../controllers/usuarios.controller')

router.post('/login', UsuarioMiddleware.login, UsuarioController.login)


module.exports = router