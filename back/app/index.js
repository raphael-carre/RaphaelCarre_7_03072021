const express = require('express')
const dotenv = require('dotenv')
const db = require('./config/database')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')

dotenv.config({ path: './.env' })

db.authenticate()
    .then(() => console.log('Connection to MySQL successful !'))
    .catch(error => {
        console.error('Connection to MySQL failed !')
        setTimeout(() => {
            db.authenticate()
        }, 5000)
    })

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json())

app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Test message from backend service...' })
})

module.exports = app