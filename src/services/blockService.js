import db from "../database/connection.js";

async function checkUserIsBlocked(user_id, blocked_user_id) {
    const conn = await db.connect()
    const sql = `SELECT * FROM BlockedUser WHERE user_id = ? AND blocked_user_id = ?`
    const data = await conn.query(sql, [user_id, blocked_user_id])
    conn.end()
    return data[0].length
}

async function blockUser(user_id, blocked_user_id) {
    const conn = await db.connect()
    const sql = `INSERT INTO BlockedUser(user_id, blocked_user_id) VALUES (?, ?)`
    await conn.query(sql, [user_id, blocked_user_id])
    conn.end()
}

async function unblockUser(user_id, blocked_user_id) {
    const conn = await db.connect()
    const sql = `DELETE FROM BlockedUser WHERE user_id = ? AND blocked_user_id = ?`
    await conn.query(sql, [user_id, blocked_user_id])
    conn.end()
}

export default {
    blockUser,
    unblockUser,
    checkUserIsBlocked
}