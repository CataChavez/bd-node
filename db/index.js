const { Pool } = require('pg')

const config = {
    user: 'cata', 
    password: '1234',
    host: 'localhost',
    database:'am',
    port:5432
}

const pool = new Pool(config)

module.exports = {
    query: (text, args, callback) => {
        return pool.query(text, args, callback)
    }, 
    pool
}