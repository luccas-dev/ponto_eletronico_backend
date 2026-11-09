const pool = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const {cpf, senha} = req.body

        const [usuarios] = await pool.query("SELECT * FROM usuarios WHERE cpf = ?", [cpf])

        if(usuarios.length === 0){
            return res.status(401).json({erro: "CPF ou Senha incorreto!"})
        }

        const usuario = usuarios[0]

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash)
        if(!senhaValida) {
            return res.status(401).json({erro: "CPF ou senha incorreto!"})
        }

        const token = jwt.sign({
            id: usuario.id_usuario,
            empresa_id: usuario.empresa_id,
            cargo: usuario.cargo
        },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        )

        res.json({ token: token, cargo: usuario.cargo })
    } catch(erro) {
        console.error(erro)
        res.status(500).json({ erro: "Erro no servidor" })
    }
}

module.exports = { login }