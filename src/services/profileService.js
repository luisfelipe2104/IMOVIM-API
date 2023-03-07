import db from '../database/connection.js'
import { ProfileView } from '../../database/views.js'

export async function createProfile(user_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Profile(user_id) VALUES(?)'
    await conn.query(sql, [user_id])
    conn.end()
}

async function updateProfile(user_id, image, background, localization) {
    const conn = await db.connect()
    const sql = 'UPDATE Profile SET profileImage =?, profileBackground =?, localization =? WHERE user_id =?'
    const data = [image, background, localization, user_id]
    await conn.query(sql, data)
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
    const sql = 'SELECT profileImage FROM Profile where user_id =?'
    const results = await conn.query(sql, [user_id])
    conn.end()
    return results[0]
}

export async function getProfileInfo(user_id) {
    const conn = await db.connect()
    const sql = `${ProfileView} WHERE user_id =?`
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
    updateProfile
}