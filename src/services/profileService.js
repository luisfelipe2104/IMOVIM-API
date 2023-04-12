import db from '../database/connection.js'
import { ProfileView } from '../../database/views.js'

export async function createProfile(user_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Profile(user_id) VALUES(?)'
    await conn.query(sql, [user_id])
    conn.end()
}

async function updateProfile(user_id, image, background, localization, nickname) {
    const conn = await db.connect()
    const sql1 = 'UPDATE Profile SET profileImage =?, profileBackground =?, localization =? WHERE user_id =?;'
    const data = [image, background, localization, user_id]
    await conn.query(sql1, data)
    
    conn.end()
}

async function updateName(user_id, nickname) {
    const conn = await db.connect()
    const sql = 'Update Users SET nickname =? WHERE id =?'
    await conn.query(sql, [nickname, user_id])
    conn.end()
}

async function checkExistingNickname(name, user_id) {
    const conn = await db.connect()
    const sql = 'SELECT id FROM Users WHERE nickname =? AND id != ?'

    const row = await conn.query(sql, [name, user_id])
    conn.end()

    return row[0]
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

async function removeProfileImage(user_id) {
    const conn = await db.connect()
    const sql = 'UPDATE Profile SET profileImage =null WHERE user_id =?'
    await conn.query(sql, [user_id])
    conn.end()
}

async function removeProfileBackground(user_id) {
    const conn = await db.connect()
    const sql = 'UPDATE Profile SET profileBackground =null WHERE user_id =?'
    await conn.query(sql, [user_id])
    conn.end()
}

export async function getProfileImg(user_id) {
    const conn = await db.connect()
    const sql = `SELECT profileImage, nickname FROM Profile JOIN Users u ON user_id = u.id WHERE user_id =?`
    const results = await conn.query(sql, [user_id])
    conn.end()
    return results[0]
}

export async function getProfileInfo(user_id, userSeeingId) {
    const conn = await db.connect()
    const sql = `${ProfileView(userSeeingId)} WHERE user_id =?`
    const results = await conn.query(sql, [user_id])
    conn.end()
    return results[0]
}

export default { 
    createProfile, 
    updateProfileImage, 
    updateProfileBackground, 
    updateProfileDescription, 
    updateProfileLocation ,
    removeProfileImage, 
    removeProfileBackground,
    getProfileInfo,
    getProfileImg,
    updateProfile,
    updateName,
    checkExistingNickname
}