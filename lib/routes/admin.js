const render = require('../modules/render')

module.exports = (app, DB) => {
    app.get('/adm', (req, res) => {
        res.end(JSON.stringify({code:200,value:'success'}))
    })
}