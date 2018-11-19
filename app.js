const opts = require('./lib/sub/settings.json')
const Express = require('express')
const Session = require('express-session')
const Server = new Express()
const fs = require('fs')
const path = require('path')
const DB = require('./lib/modules/db')
const log = require('./lib/modules/logger')

Server.use(Session({
    secret: opts.ALL.SECRET,
    saveUninitialized: true,
    resave: false
}))

Server.set('view engine', 'pug')
Server.set('views', './lib/views')
Server.use(Express.static(path.join(__dirname, '/lib/public')))

Server.listen(opts.WEB.PORT, () => {
    log.log(`NEW WEB SERVER ON http://localhost:${opts.WEB.PORT}`, 'green')
    fs.readdir(path.join(__dirname, '/lib/routes'), (err, files) => {
        if (!err) {
            files.forEach(item => {
                log.log(`I FOUND ${item}`, 'yellow')
                require(path.join(__dirname, '/lib/routes/', item))(Server, DB)
            })
        } else log.log(`${err.toString()}`, 'red')
    })
})