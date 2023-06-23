import db from "../database/connection.js";

async function createRoom(id) {
    const conn = await db.connect()
    const sql = `INSERT INTO Room(id) VALUES(?)`
    await conn.query(sql, [id])
    conn.end()
}

async function createGroupRoom(id, room_name, description, photo) {
    const conn = await db.connect()
    const sql = `INSERT INTO Room(id, room_name, description, photo, room_type) VALUES(?, ?, ?, ?, 'public')`
    const data = [id, room_name, description, photo]
    await conn.query(sql, data)
    conn.end()
}

async function findUsersRoom(userId) {
    const conn = await db.connect()
    const sql = `SELECT room_id, user_id FROM UserInTheRoom WHERE user_id = ?`
    const results = await conn.query(sql, [userId])
    conn.end()
    return results[0]
}

async function insertUserInRoom(roomId, userId) {
    const conn = await db.connect()
    const sql = `INSERT INTO UserInTheRoom(room_id, user_id) VALUES(?, ?)`
    const data = [roomId, userId]
    await conn.query(sql, data)
    conn.end()
}

export async function getGroupMembers(room_id) {
    const conn = await db.connect()
    const sql = `SELECT nickname, profileImage, p.user_id FROM UserInTheRoom r 
                    JOIN Profile p ON p.user_id = r.user_id 
                    JOIN Users u ON u.id = r.user_id
                    WHERE room_id = ?`
    const results = await conn.query(sql, [room_id])
    conn.end()
    return results[0]
}

async function deleteMessages(room_id) {
    const conn = await db.connect()
    const sql1 = 'DELETE FROM Room WHERE id = ?'
    const sql2 = 'DELETE FROM UserInTheRoom WHERE room_id = ?'
    await conn.query(sql1, [room_id])
    await conn.query(sql2, [room_id])
    conn.end()
}

async function exitRoom(room_id, user_id) {
    const conn = await db.connect()
    const sql = `DELETE FROM UserInTheRoom WHERE room_id = ? AND user_id = ?`
    await conn.query(sql, [room_id, user_id])
    conn.end()
}

async function getUsersRoom(user_id) {
    const conn = await db.connect()
    const sql = `
    SELECT room_id, nickname, description, room_type, room_name, photo AS roomPhoto,
    (SELECT nickname FROM UserInTheRoom 
    JOIN Users u ON u.id = user_id
    WHERE room_id = r.id AND user_id != ? AND room_type = 'private') AS friend,
    (SELECT u.id FROM UserInTheRoom 
    JOIN Users u ON u.id = user_id
    WHERE room_id = r.id AND user_id != ? AND room_type = 'private') AS friend_id,
    (SELECT profileImage FROM UserInTheRoom userRoom2
    JOIN Profile p ON p.user_id = userRoom2.user_id
    WHERE room_id = r.id AND userRoom2.user_id != ? AND room_type = 'private') AS friendPhoto 
    FROM UserInTheRoom userRoom
    JOIN Room r ON r.id = room_id 
    JOIN Users u ON u.id = user_id
    WHERE user_id = ?;
    `
    const data = [user_id, user_id, user_id, user_id]
    const result = await conn.query(sql, data)
    conn.end()

    return result[0]
}

export default { exitRoom, getGroupMembers, createRoom, findUsersRoom, insertUserInRoom, getUsersRoom, deleteMessages, createGroupRoom }