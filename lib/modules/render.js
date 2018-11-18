module.exports = (title, data) => {
    let res = {
        btns: [
            { title: 'HOME', href: '/' },
            /*{ title: 'BOARDS', list: [
                { title: 'FREE', href: '/b/l/free' },
                { title: 'NOTICE', href: '/b/l/notice'}
            ]}*/
            { title: 'BOARDS', href: '/b' }
        ]
    }
    if (data) res.data = data
    res.data.title = `[ UWS ] ${title}`
    return res
}