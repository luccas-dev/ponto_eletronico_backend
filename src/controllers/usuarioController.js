const pool = require('../config/db')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    try {
        const { empresa, nome, sobrenome, senha, cpf } = req.body
        const senhaHash = await bcrypt.hash(senha, 10)

        await pool.query("INSERT INTO usuarios (empresa_id, nome, sobrenome, senha_hash, cpf) VALUES (?, ?, ?, ?, ?)", [empresa, nome, sobrenome, senhaHash, cpf])

        res.status(201).json({
            mensagem: "Usuario cadastrado com sucesso"
        })

    } catch(erro) {
        console.error(erro)
        res.status(500).json({
            erro: "Erro ao cadastrar usuário"
        })
    }
}

const listarUsuarios = async (req, res) => {
    try {
        const empresa = req.params.idEmpresa
        const users = await pool.query('SELECT * FROM usuarios WHERE empresa_id = ?', [empresa])
        res.status(200).json(users)
        
    } catch(erro) {
        res.status(500).json({erro: "Erro ao listar usuarios"})
    }
}

const unicoUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.idUsuario
        const usuario = await pool.query("SELECT nome, sobrenome FROM usuarios WHERE id_usuario = ?", [usuarioId])

        res.status(200).json(usuario)
    } catch(erro) {
        res.status(500).json({erro: "Erro ao listar usuário"})
    }
}

module.exports = { cadastrarUsuario, listarUsuarios, unicoUsuario }