const http = require('http')
const app = require('./app')

const normalizePort = val => {
    const port = parseInt(val, 10)
    if (isNaN(val)) return val
    return port >= 0 ? port : false
}

const port = normalizePort(process.env.SERVER_PORT || '3000')

const errorHandler = error => {
    if (error.syscall !== 'listen') throw error

    const address = server.address()
    const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`

    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges.`);
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use.`)
            process.exit(1)
            break
        default:
            throw error
    }
}

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
    console.log(`Server started on http://localhost:${port || 3000}`)
})

server.listen(port)