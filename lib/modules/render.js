module.exports = (title, req, data) => {
    let res = {
        btns: [
            { title: 'HOME', href: '/' },
            { title: 'NOTICE', href: '/b/l/notice/0'}
        ]
    }
    if (data) res.data = data
    res.data.title = `[ UWS ] ${title}`
    return res
}