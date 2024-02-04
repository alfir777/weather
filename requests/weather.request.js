require('dotenv').config()
const rp = require('request-promise')

module.exports = async function (city = '') {
    if (!city) {
        throw new Error('City is required')
    }

    const options = {
        uri: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
            q: city,
            appid: process.env.OPENWEATHER_API_KEY,
            units: 'imperial'
        },
        json: true
    }

    try {
        const data = await rp(options)
        const celsius = (data.main.temp - 32) * 5 / 9

        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch (error) {
        return {
            weather: null,
            error: error.error.message
        }
    }
}
