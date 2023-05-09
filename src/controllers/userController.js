import express from "express";
import db from "../services/userService.js";

const routes = express.Router();

// user/get-all-users
routes.get('/get-all-users', async (req, res) => {
  try{
    const users = await db.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
})

// user/get-userId-by-email
routes.post("/get-userId-by-email", async (req, res) => {
  const { email } = req.body;
  try {
    const id = await db.getUserIdByEmail(email);
    return res.status(200).json(id[0]);
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
});

// user/get-nickname-by-email
routes.post("/get-nickname-by-email", async (req, res) => {
  const { email } = req.body;
  try {
    const username = await db.getNicknameIdByEmail(email);
    return res.status(200).json(username[0]);
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
});

// user/follow
routes.post("/follow", async (req, res) => {
  const { user_id, follower_id } = req.body;

  try{
    if (await db.checkUserIsFollowing(user_id, follower_id)) {
      await db.unfollowUser(user_id, follower_id);
      return res.status(200).json({ msg: `Você deixou de seguir` });
    } else {
      await db.followUser(user_id, follower_id);
      return res.status(200).json({ msg: `Você está seguindo` });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message})
  }
});

// user/get-followers-amount
routes.post("/get-followers-amount", async (req, res) => {
  const { user } = req.body;
  let user_id = await db.getUserIdByName(user);
  user_id = user_id[0].id;
  try {
    let followers = await db.getFollowersAmount(user_id);
    return res.status(200).json({ followers });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// user/get-followers-list
routes.get("/get-followers-list/:id", async (req, res) => {
  const user_id = req.params.id

  try {
    let followers = await db.getFollowersList(user_id);
    
    return res.status(200).json(followers);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// user/search-user
routes.get('/search-user/:id', async (req, res) => {
  const user_id = req.params.id
  try{
    const data = await db.getUsers(user_id)
    return res.status(200).json(data);
  } catch (err) {
      return res.status(500).json({ msg: err });
  }
})

export default routes;