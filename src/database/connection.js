import mysql from 'mysql2/promise'

const connect = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '0262',
        database: 'Imovim'
    })
    return connection
}

export default { connect }