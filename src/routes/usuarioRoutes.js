const express = require('express')
const router = express.Router()
const {estaLogado, isAdmin} = require('../middlewares/authMiddleware')

const { cadastrarUsuario, listarUsuarios, unicoUsuario } = require('../controllers/usuarioController')

router.post('/cadastro', estaLogado, isAdmin, cadastrarUsuario)
router.get('/listar/:idEmpresa', estaLogado, isAdmin, listarUsuarios)
router.get('/logado/:idUsuario', estaLogado, unicoUsuario)

module.exports = router