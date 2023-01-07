import db from '../database/connection.js'

export async function createProfile(user_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Profile(user_id) VALUES(?)'
    await conn.query(sql, [user_id])
    conn.end()
}

async function updateProfileImage(user_id, image) {
    const conn = await db.connect()
    const sql = 'UPDATE Profile SET profileImage =? WHERE user_id =?'
    const data = [image, user_id]
    await conn.query(sql, data)
    conn.end()
}

async function updateProfileBackground(user_id, background) {
    const conn = await db.connect()
    const sql = 'UPDATE Profile SET profileBackground =? WHERE user_id =?'
    const data = [background, user_id]
    await conn.query(sql, data)
    conn.end()
}

async function updateProfileDescription(user_id, description) {
    const conn = await db.connect()
    const sql = 'UPDATE Profile SET description =? WHERE user_id =?'
    const data = [description, user_id]
    await conn.query(sql, data)
    conn.end()
}

async function updateProfileLocation(user_id, location) {
    const conn = await db.connect()
    const sql = 'UPDATE Profile SET localization =? WHERE user_id =?'
    const data = [location, user_id]
    await conn.query(sql, data)
    conn.end()
}

export default { 
    createProfile, 
    updateProfileImage, 
    updateProfileBackground, 
    updateProfileDescription, 
    updateProfileLocation 
}