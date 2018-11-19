const render = require('../modules/render')

module.exports = (app, DB) => {
    app.get('/b/v/:table/:no', (req, res) => {
        exist(req.params.table, (board) => {
            DB.find(`board_${board.table}`, ['id'], [req.params.no], undefined, (rows) => {
                if (rows[0]) rows[0].opts = JSON.parse(rows[0].opts)
                console.log(rows[0]);
                
                res.render('view', render(`${board.title} 게시판 | ${req.params.no} 번 게시글`, req, { board: board, data: rows[0] }))
            })
        }, () => {
            res.render('error', res.render('에러', req, { type: 'b', code: 405 }))
        })
    })

    app.get('/b/l/:table/:page', (req, res) => {
        exist(req.params.table, (board) => {
            DB.find(`board_${board.table}`, undefined, undefined, `ORDER BY id ASC LIMIT 10 OFFSET ${req.params.page}`, (rows) => {
                res.render('board', render(`${board.title} 게시판 | ${req.params.page} 페이지`, req, { board: board, list: rows }))
            })
        }, () => {
            res.render('error', res.render('에러', req, { type: 'b', code: 404 }))
        })
    })

    function exist (table, next, fail) {
        DB.find('opts', ['key'], ['boards'], undefined, (res) => {
            JSON.parse(res[0].val).val.forEach(item => {
                if (item.table == table) return next(item)
            })
            //fail()
        })
    }
}