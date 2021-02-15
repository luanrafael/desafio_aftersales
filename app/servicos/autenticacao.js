const jwt = require('jsonwebtoken')
const config = require('../config')

const ERROR_MESSAGE_NO_TOKEN_PROVIDED = 'Token não encontrado'
const ERROR_MESSAGE_FAILED_AUTH = 'Falha na autenticação'

const validarToken = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(403).send({ auth: false, message: ERROR_MESSAGE_NO_TOKEN_PROVIDED })
  
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return res.status(403).send({ auth: false, message: ERROR_MESSAGE_FAILED_AUTH })

        req.id_usuario = decoded.id_usuario
        req.sessao = decoded
        next()
    })
}

module.exports = {
    validarToken
  }
  