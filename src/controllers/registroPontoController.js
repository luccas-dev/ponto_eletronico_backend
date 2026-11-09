const pool = require('../config/db')

const registrarPonto = async (req, res) => {
    try {
        const usuario = req.usuario.id
        const empresa = req.usuario.empresa_id
        const {tipo} = req.body

        await pool.query("INSERT INTO registros_ponto (empresa_id, usuario_id, data_hora, tipo) VALUES (?, ?, NOW(), ?)", [empresa, usuario, tipo])

        res.status(201).json({mensagem: "Ponto Registrado com sucesso!"})

    } catch(erro) {
        res.status(501).json({erro: "Erro ao registrar o Ponto"})
    }
}

module.exports = { registrarPonto }