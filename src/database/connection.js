import mysql2 from 'mysql2/promise'

const connect = async () => {
    const connection = await mysql2.createConnection({
        host: 'localhost',
        port: 3006,
        user: 'root',
        password: '',
        database: 'Imovim'
    })
    return connection
}

export default { connect }