import db from "../database/connection.js";

async function checkExistingUser(nickname, email) {
    const conn = await db.connect()
    const sql = 'SELECT * FROM Users WHERE nickname =? OR email =?'

    const [rows] = await conn.query(sql, [nickname, email])
    conn.end()

    return rows // return rows.length > 0
}

async function createUser(nickname, email, password, birthday, phoneNumber) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Users(nickname, email, password, birthday, phoneNumber) VALUES(?, ?, ?, ?, ?)'
    const data = [nickname, email, password, birthday, phoneNumber]

    await conn.query(sql, data)
    conn.end()
}

async function login(email) {
    const conn = await db.connect()
    const sql = 'SELECT * FROM Users WHERE email =?'

    const row = await conn.query(sql, [email])
    conn.end()

    return row[0]
}

async function getAllUsers() {
    const conn = await db.connect()
    const sql = 'SELECT * FROM Users'

    const row = await conn.query(sql)
    conn.end()

    return row[0]
}

async function getUserIdByName(name) {
    const conn = await db.connect()
    const sql = 'SELECT id FROM Users WHERE nickname =?'

    const row = await conn.query(sql, [name])
    conn.end()

    return row[0]
}

async function getUserIdByEmail(email) {
    const conn = await db.connect()
    const sql = 'SELECT id FROM Users WHERE email =?'

    const row = await conn.query(sql, [email])
    conn.end()

    return row[0]
}

async function getNicknameByEmail(email) {
    const conn = await db.connect()
    const sql = 'SELECT nickname FROM Users WHERE email =?'

    const row = await conn.query(sql, [email])
    conn.end()

    return row[0]
}

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
    const sql = 'SELECT follower.nickname FROM UserFollowing t JOIN Users follower ON t.follower_id = follower.id WHERE user_id = ? ORDER BY follower.nickname ASC'
    const [rows] = await conn.query(sql, [user_id])
    conn.end()
    return rows
}

export default { 
    createUser, 
    checkExistingUser, 
    login, 
    getUserIdByName, 
    followUser, 
    unfollowUser, 
    checkUserIsFollowing ,
    getFollowersAmount,
    getFollowersList,
    getUserIdByEmail,
    getNicknameByEmail,
    getAllUsers
}