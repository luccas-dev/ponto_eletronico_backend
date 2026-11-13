const express = require('express')
const router = express.Router()
const {estaLogado} = require('../middlewares/authMiddleware')

const { registrarPonto, checkAssignature } = require('../controllers/registroPontoController')

router.post('/registro', estaLogado, checkAssignature, registrarPonto)

module.exports = router