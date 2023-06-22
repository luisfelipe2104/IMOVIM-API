import db from "../database/connection.js";

async function createComplaint(post_id, user_id, motive) {
  const conn = await db.connect()

  const sql = 'INSERT INTO Report(post_id, user_id, motive, victim_id) VALUES(?, ?, ?, (SELECT p.user_id FROM Posts p WHERE p.id = ?))'
  const data = [post_id, user_id, motive, post_id]

  await conn.query(sql, data)
  conn.end()
}

async function getAllComplaints() {
  const conn = await db.connect()
  const sql = `SELECT pro.user_id, u.nickname, pro.profileImage, p.caption, p.image, p.id as post_id, motive, status, r.created_at, 
            (SELECT COUNT(*) FROM Report re WHERE re.victim_id = r.victim_id) AS qntd
            FROM Report r JOIN Posts p ON p.id = r.post_id JOIN Profile pro ON pro.user_id = p.user_id 
            JOIN Users u on u.id = p.user_id`

  const results = await conn.query(sql)

  conn.end()
  return results[0]
}

export default { createComplaint, getAllComplaints };