import db from "../database/connection.js"

async function createEvent(user_id, event_name, event_date, event_hour, localization, description, photo) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Events(user_id, event_name, event_date, event_hour, localization, description, photo) VALUES(?, ?, ?, ?, ?, ?, ?)'
    const data = [user_id, event_name, event_date, event_hour, localization, description, photo]
    await conn.query(sql, data)
    conn.end()
}

async function getEvents() {
    const conn = await db.connect()
    const sql = 'SELECT *, dayofweek(event_date) AS dayOfWeek FROM Events;'
    const results = await conn.query(sql)
    conn.end()
    return results[0]
}

async function getUserEvents(user_id) {
    const conn = await db.connect()
    const sql = 'SELECT *, dayofweek(event_date) AS dayOfWeek FROM Events WHERE user_id = ?;'
    const results = await conn.query(sql, [user_id])

    conn.end()
    return results[0]
}

async function checkUserGoesToEvent(event_id, user_id) {
    const conn = await db.connect()
    const sql = 'SELECT COUNT(*) as userGoes FROM UserGoesToEvent WHERE event_id = ? AND user_id = ?'
    const data = [event_id, user_id]

    const results = await conn.query(sql, data)
    conn.end()
    return results[0]
}

async function goToEvent(event_id, user_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO UserGoesToEvent(event_id, user_id) VALUES (?, ?)'
    const data = [event_id, user_id]

    await conn.query(sql, data)
    conn.end()
}

async function removeUserFromEvent(event_id, user_id) {
    const conn = await db.connect()
    const sql = 'DELETE FROM UserGoesToEvent WHERE event_id = ? AND user_id = ?'
    const data = [event_id, user_id]
    await conn.query(sql, data)
    conn.end()
}

async function checkUserSavedEvent(event_id, user_id) {
    const conn = await db.connect()
    const sql = 'SELECT COUNT(*) as userSaved FROM SavedEvent WHERE event_id = ? AND user_id = ?'
    const data = [event_id, user_id]

    const results = await conn.query(sql, data)
    conn.end()
    return results[0]
}

async function saveEvent(event_id, user_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO SavedEvent(event_id, user_id) VALUES (?, ?)'
    const data = [event_id, user_id]

    await conn.query(sql, data)
    conn.end()
}

async function unsaveEvent(event_id, user_id) {
    const conn = await db.connect()
    const sql = 'DELETE FROM SavedEvent WHERE event_id = ? AND user_id = ?'
    const data = [event_id, user_id]
    await conn.query(sql, data)
    conn.end()
}

export default { checkUserSavedEvent, saveEvent, unsaveEvent, removeUserFromEvent, createEvent, getEvents, getUserEvents, goToEvent, checkUserGoesToEvent }