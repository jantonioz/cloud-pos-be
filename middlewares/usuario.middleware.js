const Joi = require('@hapi/joi')
const { errorHandler } = require('../utils/errorHandler')



const LoginValidator = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = {
  login: async (req, res, next) => {
    try {
      req.usuarioLogin = await LoginValidator.validateAsync(req.body)
      next()
    } catch (error) {
      errorHandler({ code: 400, message: 'Bad request' }, res)
    }
  }
}