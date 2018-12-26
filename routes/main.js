module.exports = (app, asset) => {
    app.get('/', (req, res) => {
        res.end('welcome to the UWS BETA!')
    })
}