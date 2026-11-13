const express = require('express')
const router = express.Router()
const {estaLogado, isAdmin, checkAssignature} = require('../middlewares/authMiddleware')

const { cadastrarUsuario, listarUsuarios, unicoUsuario } = require('../controllers/usuarioController')

router.post('/cadastro', estaLogado, isAdmin, checkAssignature, cadastrarUsuario)
router.get('/listar/:idEmpresa', estaLogado, isAdmin, checkAssignature, listarUsuarios)
router.get('/logado/:idUsuario', estaLogado, unicoUsuario)

module.exports = router