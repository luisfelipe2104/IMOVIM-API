import mysql from 'mysql2/promise'

const connect = async () => {
    const connection = await mysql.createConnection(process.env.DATABASE_URL)
    return connection
}

export default { connect }