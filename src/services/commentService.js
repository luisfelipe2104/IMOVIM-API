import db from '../database/connection.js'
import { CommentView } from '../../database/views.js'

async function createComment(comment, user_id, post_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Comments(comment, user_id, post_id) VALUES(?, ?, ?)'
    const data = [comment, user_id, post_id]
    await conn.query(sql, data)
    conn.end()
}

async function getCommentsOfPost(post_id) {
    const conn = await db.connect()
    // const sql = 'SELECT id, comment, created_at, (SELECT nickname FROM Users WHERE id = c.user_id) AS nickname, (SELECT profileImage FROM Profile p WHERE p.user_id = c.user_id) profileImage FROM Comments c WHERE post_id = ?'
    const sql = `${CommentView} WHERE post_id = ?`
    const data = [post_id]
    const results = await conn.query(sql, data)
    conn.end()
    return results[0]
}

async function deleteComment(comment_id, user_id) {
    const conn = await db.connect()
    const sql = 'DELETE FROM Comments WHERE id = ? AND user_id = ?'
    const data = [comment_id, user_id]
    await conn.query(sql, data)
    conn.end()
}

async function updateComment(comment, comment_id, user_id) {
    const conn = await db.connect()
    const sql = 'UPDATE Comments SET comment = ?, updated = true WHERE id = ? AND user_id = ?'
    const data = [comment, comment_id, user_id]
    await conn.query(sql, data)
    conn.end()
}

async function getWhoCommentedOnPost(user_id) {
    const conn = await db.connect()
    const sql = `SELECT nickname, c.user_id as commentOwnerId, 
            profileImage, p.id as postId
            FROM Comments c
            JOIN Posts p ON p.id = post_id
            JOIN Users u ON u.id = c.user_id
            JOIN Profile pro ON pro.user_id = c.user_id
            WHERE p.user_id = ?
    `
    const results = await conn.query(sql, [user_id])
    conn.end()
    return results[0]
}

export default { 
    createComment, 
    getCommentsOfPost, 
    deleteComment,
    updateComment,
    getWhoCommentedOnPost
}