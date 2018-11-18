const Sqlite3 = require('sqlite3').verbose()
const path = require('path')
const db = new Sqlite3.Database(path.join(__dirname, '/db.sql'))
let sql

exports.find = (a, b, c, d) => {
  sql = 'SELECT * FROM ' + a
  if (b && b.length >= 1) sql += ' WHERE '
  for (let i in b) {
    sql += b[i] + "='" + c[i] + "'"
    if (b.length !== Number(i) + 1) sql += ' AND '
  }
  return this.query(d)
}

exports.insert = (a, b, c, d) => {
  sql = 'INSERT INTO ' + a + ' ({A}) values ({B})'
  let f = ''
  let g = ''
  for (let i in b) {
    f += b[i]
    g += "'" + c[i] + "'"
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
    sql += d[i] + "='" + e[i] + "'"
    if (d.length !== Number(i) + 1) sql += ', '
  }
  sql += ' WHERE '
  for (let i in b) {
    sql += b[i] + "='" + c[i] + "'"
    if (b.length !== Number(i) + 1) sql += ' AND '
  }
  return this.query(f)
}

exports.delete = (a, b, c, d) => {
  sql = 'DELETE FROM ' + a
  if (b && b.length >= 1) sql += ' WHERE '
  for (let i in c) {
    sql += b[i] + "='" + c[i] + "'"
    if (b.length !== Number(i) + 1) sql += ' AND '
  }
  return this.query(d)
}

exports.resort = (res, id, up) => {
  //버블 소트를 이용한 키의 값을 기준으로 오른차순/내림차순 정렬
  for (i = 0; i < res.length - 2; i++) {
    for (i = 0; i < res.length; i++) {
      if (i - 1 >= 0 && res[i][id] < res[i - 1][id]) {
        var temp = up ? res[i - 1] : res[i]
        res[i] = up ? res[i] : res[i - 1]
        res[i-1] = temp
      } else if (i - 1 >= 0 && res[i][id] > res[i - 1][id]) {
        var temp = up ? res[i] : res[i - 1]
        res[i] = up ? res[i - 1] : res[i]
        res[i-1] = temp
      }
    }
  }
  return res
}

exports.query = (a) => {
  if (db.open) {
    if (!sql.startsWith('SELECT')) {
      if (!a) db.prepare(sql).run()
      else a(db.prepare(sql).run())
    } else {
      if (!a) return db.prepare(sql).all()
      else return a(db.prepare(sql).all())
    }
  }
}
