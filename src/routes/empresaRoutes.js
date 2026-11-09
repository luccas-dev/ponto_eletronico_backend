const express = require('express')
const router = express.Router()
const {estaLogado, isHyperAdmin} = require('../middlewares/authMiddleware')

const empresaController = require('../controllers/empresaController')

router.post('/hyperAdmin-cadastro', estaLogado, isHyperAdmin, empresaController.cadastrarEmpresa)

module.exports = router