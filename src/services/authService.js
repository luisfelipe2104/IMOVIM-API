import db from "../database/connection.js";

export async function checkExistingUser(nickname, email) {
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

async function changePassword(email, password) {
    const conn = await db.connect()
    const sql = 'UPDATE Users SET password = ? WHERE email = ?'
    const data = [password, email]

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

export async function getAllUsers() {
    const conn = await db.connect()
    const sql = 'SELECT * FROM Users'

    const row = await conn.query(sql)
    conn.end()

    return row[0]
}

export async function getUserIdByName(name) {
    const conn = await db.connect()
    const sql = 'SELECT id FROM Users WHERE nickname =?'

    const row = await conn.query(sql, [name])
    conn.end()

    return row[0]
}

export async function getUserIdByEmail(email) {
    const conn = await db.connect()
    const sql = 'SELECT id FROM Users WHERE email =?'

    const row = await conn.query(sql, [email])
    conn.end()

    return row[0]
}

export async function getNicknameByEmail(email) {
    const conn = await db.connect()
    const sql = 'SELECT nickname FROM Users WHERE email =?'

    const row = await conn.query(sql, [email])
    conn.end()

    return row[0]
}

export default {
    createUser, 
    changePassword,
    checkExistingUser, 
    login, 
    getUserIdByName, 
    getUserIdByEmail,
    getNicknameByEmail,
    getAllUsers
}