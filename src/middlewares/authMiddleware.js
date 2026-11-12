const pool = require('../config/db')
const jwt = require('jsonwebtoken')

const estaLogado = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(403).json({erro: "Você precisa estar logado"})

    try {
        const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = usuarioDecodificado
        next()
    } catch(erro) {
        console.error(erro)
        return res.status(401).json({erro: "Token inválido ou expirado"})
    }
}

const isAdmin = (req, res, next) => {
    if(req.usuario.cargo !== 'admin') {
        return res.status(403).json({erro: "Acesso negado! Apenas admin!"})
    }
    next()
}

const isFuncionario = (req, res, next) => {
    if(req.usuario.cargo !== 'funcionario') {
        return res.status(403).json({erro: "Acesso negado. Apenas Funcionarios"})
    }
    next()
}

const isHyperAdmin = (req, res, next) => {
    if(req.usuario.cargo !== 'hyper_admin') {
        return res.status(403).json({erro: "Acesso negado!"})
    }
    next()
}

const checkAssignature = async (req, res, next) => {
    const empresaId = req.usuario.empresa_id
    const [empresa] = await pool.query("SELECT status_assinatura FROM empresas WHERE id_empresa = ?", [empresaId])

    if(empresa.status_assinatura === 'bloqueada') {
        return res.status(403).json({erro: "Acesso bloqueado por falta de pagamento."})
    }

    if(empresa.status_assinatura === 'inadimplente') {
        res.status(200).json({erro: "Pagamento está em atraso, regularize para não sofrer bloqueios."})
    }
    next()
}

module.exports = {estaLogado, isAdmin, isFuncionario, isHyperAdmin, checkAssignature}