const opts = require('./options.json')

const Express = require('express')
const Session = require('express-session')

const Server = new Express()
Server.set('view engine', 'pug')
Server.set('views', './views')
Server.use(Session({
    secret: opts.WEB.secret,
    saveUninitialized: true,
    resave: false
}))

const loader = require('./plugins/loader')
const load = () => {
    return {
        plugins : loader('./plugins', '.js'),
        routes : loader('./routes', '.js')
    }
}

const port = opts.GLOBAL.debug ? opts.WEB.ports.test : opts.WEB.ports.release
Server.listen(port, () => {
    let assets = load()
    let ver = opts.GLOBAL.version
    console.log(`[UWS ${ver.title} ${ver.big}.${ver.middle}.${ver.small} ${ver.build}] SERVER ONLINE AT 'http://localhost:${port}'`)
    for (item in assets.routes) {
        assets.routes[item](Server, assets)
    }
})