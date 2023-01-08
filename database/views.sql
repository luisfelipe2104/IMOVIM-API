USE imovim;

CREATE VIEW IF NOT EXISTS PostView AS
	SELECT p.id, nickname, caption, image, p.created_at, user_id,
	(SELECT COUNT(*) FROM UserLikesPost WHERE post_id = p.id) AS likes 
	FROM Posts p 
	JOIN Users u ON u.id = user_id 
	ORDER BY likes DESC;
    
CREATE VIEW IF NOT EXISTS CommentView AS
	SELECT id, comment, created_at, post_id,
	(SELECT nickname FROM Users WHERE id = c.user_id) AS nickname, 
	(SELECT profileImage FROM Profile p WHERE p.user_id = c.user_id) profileImage 
	FROM Comments c;
    
SELECT * FROM CommentView WHERE post_id = 2;

SELECT * FROM PostView WHERE id = 2;

SELECT * FROM PostView WHERE user_id IN (SELECT user_id FROM UserFollowing WHERE follower_id = 4);