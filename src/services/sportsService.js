import db from "../database/connection.js";
import { SportView } from "../../database/views.js";

async function getSports() {
    const conn = await db.connect()
    const sql = 'SELECT * FROM Sports'
    const results = await conn.query(sql)
    conn.end()
    return results[0]
}

async function checkUserPracticesSport(user_id, sport_id) {
    const conn = await db.connect()
    const sql = `${SportView} WHERE user_id = ? AND sport_id = ?`
    const data = [user_id, sport_id]
    const results = await conn.query(sql, data)
    conn.end()
    return results[0]
}

async function insertSportPracticed(user_id, sport_id) {
    const conn = await db.connect()
    const sql = 'INSERT INTO UserPracticeSport(user_id, sport_id) VALUES (?, ?)'
    const data = [user_id, sport_id]
    await conn.query(sql, data)
    conn.end()
}

async function deleteSportPracticed(user_id, sport_id) {
    const conn = await db.connect()
    const sql = 'DELETE FROM UserPracticeSport WHERE user_id = ? AND sport_id = ?'
    const data = [user_id, sport_id]
    await conn.query(sql, data)
    conn.end()
}

export async function getSportsPracticed(user_id) {
    const conn = await db.connect()
    const sql = `${SportView} WHERE user_id = ?`
    const results = await conn.query(sql, [user_id])
    conn.end()
    return results[0]
}

export default { getSports, getSportsPracticed, insertSportPracticed, checkUserPracticesSport, deleteSportPracticed }