USE imovim;
-- DROP VIEW PostView;
CREATE VIEW IF NOT EXISTS PostView AS
	SELECT p.id, nickname, caption, image, p.created_at, user_id, updated,
	(SELECT COUNT(*) FROM UserLikesPost WHERE post_id = p.id) AS likes,
    (SELECT COUNT(*) FROM Comments WHERE post_id = p.id) AS comments,
    (SELECT profileImage FROM Profile p WHERE p.user_id = user_id) AS profileImage
	FROM Posts p 
	JOIN Users u ON u.id = user_id 
	ORDER BY likes DESC;
    
CREATE VIEW IF NOT EXISTS CommentView AS
	SELECT id, comment, created_at, post_id, updated,
	(SELECT nickname FROM Users WHERE id = c.user_id) AS nickname, 
	(SELECT profileImage FROM Profile p WHERE p.user_id = c.user_id) profileImage 
	FROM Comments c;
    