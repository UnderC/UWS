const Sqlite3 = require('sqlite3').verbose()
const path = require('path')
const db = new Sqlite3.Database(path.join(__dirname, '/db.sql'))
let sql

exports.find = (a, b, c, d, e) => {
  sql = 'SELECT * FROM ' + a
  if (b && b.length >= 1) sql += ' WHERE '
  for (let i in b) {
    sql += b[i] + '="' + c[i] + '"'
    if (b.length !== Number(i) + 1) sql += ' AND '
  }
  if (d) sql += ` ${d}`
  return this.query(e)
}

exports.insert = (a, b, c, d) => {
  sql = 'INSERT INTO ' + a + ' ({A}) values ({B})'
  let f = ''
  let g = ''
  for (let i in b) {
    f += b[i]
    g += '"' + c[i] + '"'
    if (b.length !== Number(i) + 1) {
      f += ', '
      g += ', '
    }
  }
  sql = sql.replace('{A}', f).replace('{B}', g)
  return this.query(d)
}

exports.update = (a, b, c, d, e, f) => {
  sql = 'UPDATE ' + a + ' SET '
  for (let i in d) {
    sql += d[i] + '="' + e[i] + '"'
    if (d.length !== Number(i) + 1) sql += ', '
  }
  sql += ' WHERE '
  for (let i in b) {
    sql += b[i] + '="' + c[i] + '"'
    if (b.length !== Number(i) + 1) sql += ' AND '
  }
  return this.query(f)
}

exports.delete = (a, b, c, d) => {
  sql = 'DELETE FROM ' + a
  if (b && b.length >= 1) sql += ' WHERE '
  for (let i in c) {
    sql += b[i] + '="' + c[i] + '"'
    if (b.length !== Number(i) + 1) sql += ' AND '
  }
  return this.query(d)
}

exports.query = (a) => {
  if (db.open) {
    db.serialize(() => {
      if (!sql.startsWith('SELECT')) {
        db.run(sql, [])
        if (a) a()
      } else {
        if(a) return db.all(sql, [], (err, rows) => { a(rows) })
      }
    })
  }
}
