/**
 * DateHandler Class
 */
class DateHandler {
    constructor () {
        this.oneMinute = 60 * 1000
        this.oneHour = 60 * this.oneMinute
        this.oneDay = 24 * this.oneHour
        this.oneWeek = 7 * this.oneDay
    }

    /**
     * Returns elapsed time or precise date for a given timestamp and returns a comprehensive string.
     * @param {Date} date Unix Timestamp
     * @param {Boolean} prefixed 
     * @returns {String} Formated date
     */
    formatDate (date, prefixed = true) {
        const dateVar = new Date(date)

        const elapsed = this.getElapsedTime(dateVar)

        if (elapsed.diff < this.oneMinute) {
            return `${prefixed ? 'il y a ' : ''}moins d'une minute`
        }
        if (elapsed.diff >= this.oneMinute && elapsed.diff < this.oneHour) {
            return `${prefixed ? 'il y a ' : ''}${elapsed.minutes} minute${elapsed.minutes > 1 ? 's' : ''}`
        }
        if (elapsed.diff >= this.oneHour && elapsed.diff < this.oneDay) {
            return `${prefixed ? 'il y a ' : ''}${elapsed.hours} heure${elapsed.hours > 1 ? 's' : ''}`
        }
        if (elapsed.diff >= this.oneDay && elapsed.diff < this.oneWeek) {
            return elapsed.days === 1 ? 'hier' : `${prefixed ? 'il y a ' : ''}${elapsed.days} jour${elapsed.days > 1 ? 's' : ''}`
        }
        if (elapsed.diff >= this.oneWeek) {
            return `le ${dateVar.getDate()} ${this.getMonth(dateVar.getMonth())} ${dateVar.getFullYear()}`
        }
    }

    /**
     * Returns HH:MM for a given timestamp.
     * @param {Date} date Unix Timestamp
     * @returns {String} Formated time
     */
    formatTime (date) {
        const dateVar = new Date(date)
        const hours = `${dateVar.getHours() < 10 ? '0' : ''}${dateVar.getHours()}`
        const minutes = `${dateVar.getMinutes() < 10 ? '0' : ''}${dateVar.getMinutes()}`
        
        return `${hours}:${minutes}`
    }

    /**
     * Returns full elapsed time, or date and time for a given timestamp, in a comprehensive string.
     * @param {Date} date Unix Timestamp
     * @returns {String} Formated date and time
     */
    formatDateTime (date) {
        const dateVar = new Date(date)
        const elapsed = this.getElapsedTime(dateVar)

        return this.formatDate(date).toString() + (elapsed.diff >= this.oneWeek ? ` à ${this.formatTime(date).toString()}` : '')
    }

    /**
     * Returns a month name.
     * @param {Number} month 
     * @returns {String} Month name
     */
    getMonth (month) {
        const monthName = [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ]

        return monthName[month]
    }

    /**
     * Calculate elapsed time for a given date.
     * @param {Date} date 
     * @returns {Object} Object
     */
    getElapsedTime (date) {
        const actualDate = Date.now()

        const milliseconds = actualDate - date
        const minutes = Math.floor((milliseconds / 1000) / 60)
        const hours = Math.floor(((milliseconds / 1000) / 60) / 60)
        const days = Math.floor((((milliseconds / 1000) / 60) / 60) / 24)

        return {
            diff: milliseconds,
            minutes,
            hours,
            days
        }
    }
}

export default new DateHandler()