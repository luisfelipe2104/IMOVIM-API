import db from '../database/connection.js'

export async function createPost(author, caption, image) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Posts(author, caption, image) VALUES(?, ?, ?)'
    const data = [author, caption, image]
    await conn.query(sql, data)
    await conn.end()
}

export async function getPost(id) {
    const conn = await db.connect()
    const sql = 'SELECT * FROM Posts WHERE id =?'
    const data = [id]
    const row = await conn.query(sql, data)
    conn.end()
    return row[0]
}

export async function allPosts() {
    const conn = await db.connect()
    const sql = 'SELECT * FROM Posts'
    const rows = await conn.query(sql)
    conn.end()
    return rows
}

export async function deletePost(id) {
    const conn = await db.connect()
    const sql = 'DELETE FROM Posts WHERE id =?'
    const data = [id]
    await conn.query(sql, data)
    await conn.end()
}

export async function updatePost(id, caption, image) {
    const conn = await db.connect()
    const sql = 'UPDATE Posts SET caption =?, image =? WHERE id =?'
    const data = [caption, image, id]
    await conn.query(sql, data)
    await conn.end()
}

export async function getPostsByAuthor(author) {
    const conn = await db.connect()
    const sql = 'SELECT * FROM Posts WHERE author =?'
    const data = [author]
    const rows = await conn.query(sql, data)
    conn.end()
    return rows
}

export async function getNumOfLikes(){
    pass
}

export default { createPost, getPost, allPosts, updatePost, getPostsByAuthor }