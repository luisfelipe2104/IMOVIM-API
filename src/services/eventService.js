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

async function getUserEvents(user_id){
    const conn = await db.connect()
    const sql = 'SELECT *, dayofweek(event_date) AS dayOfWeek FROM Events WHERE user_id = ?;'
    const results = await conn.query(sql, [user_id])

    conn.end()
    return results[0]
}

export default { createEvent, getEvents, getUserEvents }