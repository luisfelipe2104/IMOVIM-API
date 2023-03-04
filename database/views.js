
export const ProfileView = `SELECT p.id, user_id, profileImage, profileBackground, description, localization, nickname 
    FROM Profile p JOIN Users u ON u.id = user_id`

export const PostView = (complement) => {
    const script = `SELECT p.id, nickname, caption, image, p.created_at, user_id, updated, 
    (SELECT COUNT(*) FROM UserLikesPost WHERE post_id = p.id) AS likes, 
    (SELECT COUNT(*) FROM Comments WHERE post_id = p.id) AS comments, 
    (SELECT profileImage FROM Profile profile WHERE profile.user_id = p.user_id) AS profileImage, 
    (SELECT COUNT(*) FROM UserLikesPost WHERE user_id = p.user_id AND post_id = p.id) AS userLikedPost 
    FROM Posts p JOIN Users u ON u.id = user_id ${complement} ORDER BY p.id DESC`
    return script
}
export const SportView = `SELECT nickname, sport_name, user_id, sport_id FROM UserPracticeSport 
    JOIN Users u ON u.id = user_id JOIN Sports s ON s.id = sport_id`

export const CommentView = `SELECT id, comment, created_at, post_id, updated, 
    (SELECT nickname FROM Users WHERE id = c.user_id) AS nickname, 
    (SELECT profileImage FROM Profile p WHERE p.user_id = c.user_id) profileImage FROM Comments c`