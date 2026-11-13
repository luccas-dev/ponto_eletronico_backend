const express = require('express')
const router = express.Router()
const {estaLogado, isHyperAdmin} = require('../middlewares/authMiddleware')

const { cadastrarEmpresa } = require('../controllers/empresaController')

router.post('/hyperAdmin-cadastro', estaLogado, isHyperAdmin, cadastrarEmpresa)

module.exports = router