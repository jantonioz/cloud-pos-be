const mainRouter = require('express').Router()
const UsuarioRouter = require('./usuario.router')

mainRouter.use(UsuarioRouter)

module.exports = mainRouter