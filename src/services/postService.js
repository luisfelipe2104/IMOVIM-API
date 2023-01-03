import db from '../database/connection.js'

export async function createPost(author, caption, image) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Post(author, caption, image) VALUES(?, ?, ?)'
    const data = [author, caption, image]
    await conn.query(sql, data)
    await conn.end()
}

export default { createPost }