import db from "../database/connection.js"

async function createEvent(user_id, event_name, event_date, event_hour, localization, description, photo) {
    const conn = await db.connect()
    const sql = 'INSERT INTO Events(user_id, event_name, event_date, event_hour, localization, description, photo) VALUES(?, ?, ?, ?, ?, ?, ?)'
    const data = [user_id, event_name, event_date, event_hour, localization, description, photo]
    await conn.query(sql, data)
    conn.end()
}

export default { createEvent }