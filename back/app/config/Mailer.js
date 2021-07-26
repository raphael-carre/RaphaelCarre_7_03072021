const nodemailer = require('nodemailer')
const FetchErrorHandler = require('./FetchErrorHandler')

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 25,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    send = message => {
        try {
            this.transporter.sendMail(message)
        }
        catch (error) {
            throw new FetchErrorHandler(500)
        }
    }
}

module.exports = new Mailer