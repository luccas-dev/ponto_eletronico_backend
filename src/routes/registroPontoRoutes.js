const express = require('express')
const router = express.Router()
const {estaLogado} = require('../middlewares/authMiddleware')

const { registrarPonto } = require('../controllers/registroPontoController')

router.post('/registro', estaLogado, registrarPonto)

module.exports = router