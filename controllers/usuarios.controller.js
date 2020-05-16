const UsuarioModel = require('../models/usuario.model')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../utils/errorHandler')

class UsuarioController {
  async login(req, res) {
    try {
      const usuario = await UsuarioModel.findOne(req.usuarioLogin)
      if (!usuario) throw { code: 401, message: 'User not found' }
      usuario.lastLogin = new Date().toISOString()
      await usuario.save()
      usuario.password = undefined

      const token = jwt.sign(JSON.stringify(usuario), process.env.JWT_PASSWORD)

      res.status(200).json({ ok: true, token })
    } catch (error) {
      errorHandler({ http: 401, code: 1, message: error.message }, res)
    }
  }
}

module.exports = new UsuarioController()