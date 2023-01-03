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


export async function likePost(nickname, post_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO UserLikesPost(user_nickname, post_id) VALUES (?, ?)'
    const data = [nickname, post_id]
    await conn.query(sql, data)
    conn.end()
}

export async function unlikePost(nickname, post_id) {
    const conn = await db.connect()
    const sql = 'DELETE FROM UserLikesPost WHERE user_nickname =? AND post_id =?'
    const data = [nickname, post_id]
    await conn.query(sql, data)
    conn.end()
}

export async function checkUserLikedPost(nickname, post_id) {
    const conn = await db.connect()
    const sql = 'SELECT * FROM UserLikesPost WHERE user_nickname =? AND post_id =?'
    const data = [nickname, post_id]
    const rows = await conn.query(sql, data)
    conn.end()
    return rows[0]
}

export async function getNumOfLikes(id){
    const conn = await db.connect()
    const sql = 'SELECT COUNT(*) likes FROM UserLikesPost WHERE post_id = ?'
    const data = [id]
    const row = await conn.query(sql, data)
    conn.end()
    return row[0]
}

export default { createPost, getPost, allPosts, updatePost, getPostsByAuthor, likePost, unlikePost, checkUserLikedPost, getNumOfLikes }