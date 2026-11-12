const pool = require('../config/db')
const bcrypt = require('bcrypt')

const cadastrarEmpresa = async (req, res) => {
    try {
        const {nome_fantasia, cnpj, nome_admin, sobrenome_admin, senha, cpf, email, telefone} = req.body
        const senhaHash = await bcrypt.hash(senha, 10)
        const dataVencimento = new Date()
        dataVencimento.setDate(dataVencimento.getDate() + 7)

        const [empresa] = await pool.query('INSERT INTO empresas (nome_fantasia, cnpj, email, telefone, data_vencimento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nome_fantasia, cnpj, email, telefone, dataVencimento])
        
        const empresa_id = empresa.insertId

        await pool.query("INSERT INTO usuarios (empresa_id, nome, sobrenome, senha_hash, cpf, cargo) VALUES (?, ?, ?, ?, ?, 'admin')", [empresa_id, nome_admin, sobrenome_admin, senhaHash, cpf])

        res.status(201).json({
            mensagem: "Empresa e Administrador cadastrados com sucesso!",
            empresa_id: empresa_id
        })

    } catch(erro) {
        console.error(erro)
        res.status(500).json({
            erro: "Erro ao cadastrar empresa. Verifique os dados"
        })
    }
}

module.exports = { cadastrarEmpresa }