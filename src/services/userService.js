import db from "../database/connection.js";

async function createUser(nickname, email, password, birthday) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Users(nickname, email, password, birthday) VALUES(?, ?, ?, ?)'
    const data = [nickname, email, password, birthday]

    conn.query(sql, data)
    conn.end()
}

export { createUser }