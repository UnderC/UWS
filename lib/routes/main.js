const render = require('../modules/render')

module.exports = (app, DB) => {
    app.get('/', (req, res) => {
        res.render('index', render('index', req, {}))
    })
}