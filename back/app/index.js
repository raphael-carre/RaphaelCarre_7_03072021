const express = require('express')
const dotenv = require('dotenv')
const { db, dbConnection } = require('./config/database')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')

dotenv.config({ path: './.env' })

dbConnection(db)

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
app.use('/api/posts/:postId/comments', commentRoute)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Test message from backend service...' })
})

module.exports = app