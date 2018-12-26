const fs = require('fs')
const path = require('path')

module.exports = (_path, b, c) => {
    res = {}
    /*
     * _path = 파일을 불러올 경로
     * b = 찾아낼 파일의 확장자
     * c = 콜백
     */
    _path = path.resolve(_path)
    items = fs.readdirSync(_path)
    items.forEach(item => {
        if (item.endsWith(b)) {
            console.log(item)            
            if (item.replace(b, '') !== 'index') {
                delete require.cache[path.join(_path, item)]
                res[item.replace(b, '')] = require(path.join(_path, item))
            }
        }
    })
    if (!c) return res
    else return c(res)
}