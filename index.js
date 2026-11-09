const express = require('express')
const cors = require('cors')

const pool = require('./src/config/db')

const app = express()
const PORT = process.env.PORT || 3055

const empresaRoutes = require('./src/routes/empresaRoutes')
const usuarioRoutes = require('./src/routes/usuarioRoutes')
const authRoutes = require('./src/routes/authRoutes')
const pontoRoutes = require('./src/routes/registroPontoRoutes')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({mensagem: "API do Ponto Eletronico rodando!!" })
})

app.use('/empresas', empresaRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/auth', authRoutes)
app.use('/ponto', pontoRoutes)

async function startServer() {
    try {
        await pool.query('SELECT 1')
        console.log("Conexão estabelecida com sucesso")

        app.listen(PORT, () => {
            console.log("SERVIDOR LIGADO")
        })
    } catch(error) {
        console.error("Erro ao conectar com o Banco", error.message)
    }
}

startServer()