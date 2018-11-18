const render = require('../modules/render')

module.exports = (app, DB) => {
    app.get('/board', (req, res) => {
        res.end(JSON.stringify({code:200,value:'success'}))
    })
}