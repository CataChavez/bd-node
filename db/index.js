const { Pool } = require('pg')

const config = {
    user: 'cata', 
    password: '1234',
    host: 'localhost',
    database:'am',
    port:5432, 
    max: 20, //cantidad maxima de clientes conectados que pueden contener el grupo
    idleTimeoutMillis: 50000, //cantidad de milisegundos que un cliente puede permanecer inactivo antes de que sea desconectado.
    connectionTimeoutMillis: 2000, // cantidad de milisegundos, que eben transcurrir antes que se agote el tiempo de espera para conectar a nuevo cliente.
    }

const pool = new Pool(config)

module.exports = {
    query: (text, args, callback) => {
        return pool.query(text, args, callback)
    }, 
    pool
}