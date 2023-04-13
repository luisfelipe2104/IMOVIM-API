import db from "../database/connection.js"

async function makeFriends(user_id, friend_id) {
  const conn = await db.connect()
  const sql = 'INSERT INTO Friendship(friend1, friend2) VALUES(?, ?)'
  await conn.query(sql, [user_id, friend_id])
  conn.end()
}

async function checkFriendShipExists(user_id, friend_id) {
  const conn = await db.connect()
  const sql = 'SELECT * FROM Friendship WHERE friend1 = ? AND friend2 = ? OR friend2 = ? AND friend1 = ?'
  const data = [user_id, friend_id, friend_id, user_id]
  const results = await conn.query(sql, data)

  conn.end()
  return results[0]
}

async function acceptSolicitation(user_id, friend_id) {
  const conn = await db.connect()
  const sql = 'UPDATE Friendship SET pending = false WHERE friend1 = ? AND friend2 = ? OR friend2 = ? AND friend1 = ?'
  const data = [user_id, friend_id, friend_id, user_id]
  await conn.query(sql, data)

  conn.end()
}

async function removeFriendship(user_id, friend_id) {
  const conn = await db.connect()
  const sql = 'DELETE FROM Friendship WHERE friend1 = ? AND friend2 = ? OR friend2 = ? AND friend1 = ?'
  const data = [user_id, friend_id, friend_id, user_id]
  await conn.query(sql, data)

  conn.end()
}

export default {
  makeFriends,
  checkFriendShipExists,
  acceptSolicitation,
  removeFriendship
}