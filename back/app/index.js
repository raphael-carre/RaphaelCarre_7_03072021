const express = require('express')
const helmet = require('helmet')
const dotenv = require('dotenv').config({ path: './.env' })
const loggerMiddleware = require('./middlewares/logger-middleware')
const { swaggerUi, swaggerConfig } = require('./middlewares/swagger')
const { db, dbConnection } = require('./config/database')
const router = require('./router')

const app = express()

const jsDocHelmetOptions = {
    useDefaults: true,
    directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"]
    }
}

dbConnection(db)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json())
app.use(helmet())
app.use(loggerMiddleware)

app.use('/api', router)

if (process.env.NODE_ENV === 'development') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
    app.use('/jsdoc', helmet.contentSecurityPolicy(jsDocHelmetOptions), express.static('./docs/jsdoc'))

    app.get('/', (req, res) => {
        res.status(301).redirect('/api-docs')
    })
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Test message from backend service...' })
    })
}

module.exports = app