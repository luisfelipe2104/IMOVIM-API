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
  const sql = 'UPDATE Friendship SET pending = false WHERE friend1 = ? AND friend2 = ? OR friend1 = ? AND friend2 = ?'
  const data = [user_id, friend_id, friend_id, user_id]
  await conn.query(sql, data)

  conn.end()
}

async function removeFriendship(user_id, friend_id) {
  const conn = await db.connect()
  const sql = 'DELETE FROM Friendship WHERE friend1 = ? AND friend2 = ? OR friend1 = ? AND friend2 = ?'
  const data = [user_id, friend_id, friend_id, user_id]
  await conn.query(sql, data)

  conn.end()
}

async function getSolicitations(user_id) {
  const conn = await db.connect()
  const sql = `SELECT nickname, localization, profileImage, friend1,
  (SELECT COUNT(*) FROM 
  (SELECT sport_name, COUNT(sport_id) FROM UserPracticeSport
  JOIN Sports s ON s.id = sport_id WHERE user_id = ? OR user_id = friend1
  GROUP BY sport_name HAVING COUNT(sport_id) > 1) a) AS sportsInCommon
  FROM Friendship 
    JOIN Users u ON friend1 = u.id
    JOIN Profile p ON friend1 = p.user_id
    WHERE friend2 = ? AND pending = 1
    `
  let results = await conn.query(sql, [user_id, user_id])
  conn.end()
  return results[0]
}

async function getSportsInCommon(user_id, friend_id) {
  const conn = await db.connect()
  const sql = `
  SELECT COUNT(*) AS sportsInCommon FROM 
  (SELECT sport_name, COUNT(sport_id) FROM UserPracticeSport
  JOIN Sports s ON s.id = sport_id WHERE user_id = ? OR user_id = ?
  GROUP BY sport_name HAVING COUNT(sport_id) > 1) a;
    `
  const results = await conn.query(sql, [user_id, friend_id])
  
  conn.end()
  return results[0]
}

export default {
  makeFriends,
  checkFriendShipExists,
  acceptSolicitation,
  removeFriendship,
  getSolicitations,
  getSportsInCommon
}