import mysql from 'mysql2/promise'

const connect = async () => {
    const connection = await mysql.createConnection({
        host: 'bwlxd3avicainricfhd5-mysql.services.clever-cloud.com',
        port: 3306,
        user: 'uxhc3zhysqlflsjr',
        password: 'uyEmB6pzfMpfx1FxJOdt',
        database: 'bwlxd3avicainricfhd5'
    })
    return connection
}

export default { connect }

        // host: 'localhost',
        // port: 3306,
        // user: 'root',
        // password: '',
        // database: 'Imovim'