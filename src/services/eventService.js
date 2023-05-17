import db from "../database/connection.js"

async function createEvent(user_id, event_name, event_date, event_hour, description, photo, address, latitude, longitude) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Events(user_id, event_name, event_date, event_hour, description, photo, address, latitude, longitude) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const data = [user_id, event_name, event_date, event_hour, description, photo, address, latitude, longitude]
    await conn.query(sql, data)
    conn.end()
}

async function getEvents(user_id) {
    const conn = await db.connect()
    const sql = `SELECT e.id, e.user_id, latitude, longitude, event_name, event_date, 
    event_hour, address AS localization, description, photo, 
    (SELECT COUNT(*) FROM UserGoesToEvent WHERE event_id = e.id) AS participants,
    (SELECT COUNT(*) FROM UserGoesToEvent WHERE user_id = ? AND event_id = e.id) AS userGoesToEvent,
    (SELECT COUNT(*) FROM SavedEvent WHERE user_id = ? AND event_id = e.id) AS userSavedEvent,
    dayofweek(event_date) AS dayOfWeek FROM Events e`
    const results = await conn.query(sql, [user_id, user_id])
    conn.end()
    return results[0]
}

async function getUserEvents(user_id) {
    const conn = await db.connect()
    const sql = `SELECT e.id, e.user_id, latitude, longitude, event_name, event_date, 
    event_hour, address AS localization, description, photo, 
    (SELECT COUNT(*) FROM UserGoesToEvent WHERE event_id = e.id) AS participants,
    (SELECT COUNT(*) FROM UserGoesToEvent WHERE user_id = ? AND event_id = e.id) AS userGoesToEvent,
    (SELECT COUNT(*) FROM SavedEvent WHERE user_id = ? AND event_id = e.id) AS userSavedEvent,
    dayofweek(event_date) AS dayOfWeek FROM Events e WHERE user_id = ?`
    const results = await conn.query(sql, [user_id, user_id, user_id])

    conn.end()
    return results[0]
}

async function getSavedEvents(user_id) {
    const conn = await db.connect()
    const sql = `SELECT e.id, e.user_id, latitude, longitude, event_name, event_date, 
    event_hour, address AS localization, description, photo, 
    (SELECT COUNT(*) FROM UserGoesToEvent WHERE event_id = e.id) AS participants,
    (SELECT COUNT(*) FROM UserGoesToEvent WHERE user_id = ? AND event_id = e.id) AS userGoesToEvent,
    (SELECT COUNT(*) FROM SavedEvent WHERE user_id = ? AND event_id = e.id) AS userSavedEvent,
    dayofweek(event_date) AS dayOfWeek FROM SavedEvent s JOIN Events e ON event_id = e.id WHERE s.user_id = ?`
    const data = [user_id, user_id, user_id]
    const results = await conn.query(sql, data)

    conn.end()
    return results[0]
}

async function getEvent(user_id, event_id) {
    const conn = await db.connect()
    const sql = `SELECT e.id, e.user_id, latitude, longitude, event_name, event_date, 
    event_hour, address AS localization, description, photo, 
    (SELECT COUNT(*) FROM UserGoesToEvent WHERE event_id = e.id) AS participants,
    (SELECT COUNT(*) FROM UserGoesToEvent WHERE user_id = ? AND event_id = e.id) AS userGoesToEvent,
    (SELECT COUNT(*) FROM SavedEvent WHERE user_id = ? AND event_id = e.id) AS userSavedEvent,
    dayofweek(event_date) AS dayOfWeek FROM Events e WHERE e.id = ?`
    const results = await conn.query(sql, [user_id, user_id, event_id])

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

export default { getSavedEvents, getEvent, checkUserSavedEvent, saveEvent, unsaveEvent, removeUserFromEvent, createEvent, getEvents, getUserEvents, goToEvent, checkUserGoesToEvent }