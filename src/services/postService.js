import db from '../database/connection.js'
import { PostView } from '../../database/views.js'

export async function createPost(user_id, caption, image) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Posts(user_id, caption, image) VALUES(?, ?, ?)'
    const data = [user_id, caption, image]
    await conn.query(sql, data)
    await conn.end()
}

export async function getPost(post_id, user_id) {
    const conn = await db.connect()
    const sql = `${PostView('WHERE p.id =?', user_id)}`
    const data = [post_id]
    const row = await conn.query(sql, data)
    conn.end()
    return row[0]
}

async function getWhoLikedPost(user_id) {
    const conn = await db.connect()
    const sql = `SELECT nickname, c.user_id as user_id, 
            profileImage, p.id as postId, c.created_at
            FROM UserLikesPost c
            JOIN Posts p ON p.id = post_id
            JOIN Users u ON u.id = c.user_id
            JOIN Profile pro ON pro.user_id = c.user_id
            WHERE p.user_id = ? AND c.user_id != ?
    `
    const results = await conn.query(sql, [user_id, user_id])
    conn.end()
    return results[0]
}

async function getLikeList(post_id) {
    const conn = await db.connect()
    const sql = `SELECT nickname, c.user_id as user_id, 
            profileImage, p.id as postId, c.created_at
            FROM UserLikesPost c
            JOIN Posts p ON p.id = post_id
            JOIN Users u ON u.id = c.user_id
            JOIN Profile pro ON pro.user_id = c.user_id
            WHERE p.id = ?
    `
    const results = await conn.query(sql, [post_id])
    conn.end()
    return results[0]
}

export async function getAllPosts(ammount, user_id) {
    const conn = await db.connect()
    // const sql = 'SELECT p.id, nickname, caption, image, p.created_at, (SELECT COUNT(*) FROM UserLikesPost WHERE post_id = p.id) AS likes FROM Posts p JOIN Users u ON u.id = user_id ORDER BY likes DESC'
    const sql = `${PostView(`WHERE p.user_id NOT IN (SELECT blocked_user_id FROM BlockedUser b WHERE b.user_id = ${user_id}) AND p.user_id NOT IN (SELECT b.user_id FROM BlockedUser b WHERE blocked_user_id = ${user_id})`, user_id)}`
    const rows = await conn.query(sql, [ammount])
    conn.end()
    return rows[0]
}

export async function getPostsOfFriends(user_id) {
    const conn = await db.connect()
    // const sql = 'SELECT p.id, nickname, caption, image, p.created_at, (SELECT COUNT(*) FROM UserLikesPost WHERE post_id = p.id) AS likes FROM Posts p JOIN Users u ON u.id = user_id WHERE user_id IN (SELECT user_id FROM UserFollowing WHERE follower_id = ?) ORDER BY likes DESC'
    const sql = `${PostView(`WHERE p.user_id IN (SELECT friend1 FROM Friendship WHERE friend1 = ${user_id}
                    OR friend2 = ${user_id} AND pending = false) OR p.user_id IN
                    (SELECT friend2 FROM Friendship WHERE friend1 = ${user_id}
                        OR friend2 = ${user_id} AND pending = false)`, user_id)}`
    const rows = await conn.query(sql, [user_id])
    conn.end()
    return rows[0]
}

export async function deletePost(post_id, user_id) {
    const conn = await db.connect()
    const sql = 'DELETE FROM Posts WHERE id =? AND user_id =?'
    const data = [post_id, user_id]
    await conn.query(sql, data)
    await conn.end()
}

export async function updatePost(post_id, user_id, caption, image) {
    const conn = await db.connect()
    const sql = 'UPDATE Posts SET caption =?, image =?, updated =true WHERE id =? AND user_id =?'
    const data = [caption, image, post_id, user_id]
    await conn.query(sql, data)
    await conn.end()
}

export async function updateCaption(post_id, user_id, caption) {
    const conn = await db.connect()
    const sql = 'UPDATE Posts SET caption =?, updated = true WHERE id =? AND user_id =?'
    const data = [caption, post_id, user_id]
    await conn.query(sql, data)
    await conn.end()
}

export async function getPostsOfUser(user_id, userSeeingId) {
    const conn = await db.connect()
    const sql = `${PostView('WHERE user_id =?', userSeeingId)}`
    const data = [user_id]
    const rows = await conn.query(sql, data)
    conn.end()
    return rows[0]
}

export async function likePost(user_id, post_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO UserLikesPost(user_id, post_id) VALUES (?, ?)'
    const data = [user_id, post_id]
    await conn.query(sql, data)
    conn.end()
}

export async function unlikePost(nickname, post_id) {
    const conn = await db.connect()
    const sql = 'DELETE FROM UserLikesPost WHERE user_id =? AND post_id =?'
    const data = [nickname, post_id]
    await conn.query(sql, data)
    conn.end()
}

export async function checkUserLikedPost(user_id, post_id) {
    const conn = await db.connect()
    const sql = 'SELECT * FROM UserLikesPost WHERE user_id =? AND post_id =?'
    const data = [user_id, post_id]
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

export default { 
    createPost, 
    getPost, 
    getAllPosts, 
    updatePost, 
    updateCaption,
    deletePost,
    getPostsOfUser, 
    likePost, 
    unlikePost, 
    checkUserLikedPost, 
    getNumOfLikes, 
    getPostsOfFriends,
    getWhoLikedPost,
    getLikeList
}