import db from "../database/connection.js";
import { 
    checkExistingUser,
    getAllUsers, 
    getUserIdByName, 
    getUserIdByEmail, 
    getNicknameByEmail 
} from "./authService.js";

async function followUser(user_id, follower_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO UserFollowing(user_id, follower_id) VALUES(?, ?)'
    const data = [user_id, follower_id]
    await conn.query(sql, data)
    conn.end()
}

async function unfollowUser(user_id, follower_id) {
    const conn = await db.connect()
    const sql = 'DELETE FROM UserFollowing WHERE user_id =? AND follower_id =?'
    const data = [user_id, follower_id]
    await conn.query(sql, data)
    conn.end()
}

async function checkUserIsFollowing(user_id, follower_id) {
    const conn = await db.connect()
    const sql = 'SELECT * FROM UserFollowing WHERE user_id =? AND follower_id =?'

    const data = [user_id, follower_id]
    const [rows] = await conn.query(sql, data)
    conn.end()

    return rows.length > 0
}

async function getFollowersAmount(user_id) {
    const conn = await db.connect()
    const sql = 'SELECT count(*) followers FROM UserFollowing WHERE user_id =?'

    const [rows] = await conn.query(sql, [user_id])
    conn.end()
    return rows[0].followers
}

async function getFollowersList(user_id) {
    const conn = await db.connect()
    const sql = `SELECT follower.nickname, p.profileImage, follower.id as friend_id FROM UserFollowing t 
                JOIN Users follower ON t.follower_id = follower.id 
                JOIN Profile p ON p.user_id = t.follower_id
                WHERE t.user_id = ? 
                ORDER BY follower.nickname ASC`
    const [rows] = await conn.query(sql, [user_id])
    conn.end()
    return rows
}

async function getUsers(user_id) {
    const conn = await db.connect()
    const sql = 'SELECT nickname, u.id AS user_id, profileImage FROM Users u JOIN Profile p ON p.user_id = u.id WHERE p.user_id NOT IN (SELECT blocked_user_id FROM BlockedUser b WHERE b.user_id = ?)'
    const rows = await conn.query(sql, [user_id])
    conn.end()
    return rows[0]
}

export default { 
    getUsers,
    followUser, 
    unfollowUser, 
    checkUserIsFollowing ,
    getFollowersAmount,
    getFollowersList,
    getUserIdByName,
    getUserIdByEmail,
    getNicknameByEmail,
    getAllUsers,
    checkExistingUser
}