const UsuarioModel = require('../models/usuario.model')
const { errorHandler } = require('../utils/errorHandler')
// const moment = require('moment')

class UsuarioController {
  async login(req, res) {
    try {
      const usuario = await UsuarioModel.findOne(req.usuarioLogin)
      if (!usuario) throw { code: 401, message: 'User not found' }
      usuario.lastLogin = moment.utc().format()
      await usuario.save()
      res.status(200).json(usuario)
    } catch (error) {
      errorHandler({ http: 401, code: 1, message: error.message }, res)
    }
  }
}

module.exports = new UsuarioController()