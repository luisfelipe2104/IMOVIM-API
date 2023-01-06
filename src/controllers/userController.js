import express from "express";
import bcrypt from "bcrypt";
import db from "../services/userService.js";

const routes = express.Router();

// user/create-user
routes.post("/create-user", async (req, res) => {
  const { nickname, email, password, birthday, phoneNumber } = req.body;

  if (!nickname || !email || !password || !birthday)
    return res.status(400).json({ msg: "Insira todos os dados!" });

  // checks if the user already exists
  const checkUser = await db.checkExistingUser(nickname, email);
  let invalid = false;
  if (checkUser.length) {
    checkUser.forEach((user) => {
      if (user.email === email && user.nickname === nickname) {
        invalid = true;
        return res.status(409).json({ msg: "Usuario já existe" });
      } else if (user.email === email) {
        invalid = true;
        return res.status(409).json({ msg: "Email já está sendo utilizado" });
      } else if (user.nickname === nickname) {
        invalid = true;
        return res
          .status(409)
          .json({ msg: "Nickname já está sendo utilizado" });
      }
    });
  }

  if (!invalid) {
    // crypts the password
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salt);

    try {
      // creates the user
      await db.createUser(nickname, email, hash, birthday, phoneNumber);

      return res.status(201).json({
        msg: "Usuario cadastrado com sucesso",
      });
    } catch (err) {
      res.status(500).json({
        msg: err,
      });
    }
  }
});

// user/login
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Insira todos os dados!" });

  // search for the user in the database
  const user = await db.login(email);

  // case the user is not found in the database
  if (!user.length)
    return res.status(404).json({ msg: "Usuario não encontrado" });

  // checks the password
  const userPassword = user[0].password;
  const isPasswordCorrect = bcrypt.compareSync(password, userPassword);
  if (!isPasswordCorrect)
    return res.status(400).json({ msg: "Senha ou email incorretos" });

  return res.status(200).json({
    msg: "Usuario logado com sucesso",
  });
});

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
  const { user, follower } = req.body;

  let user_id = await db.getUserIdByName(user);
  user_id = user_id[0].id;

  let follower_id = await db.getUserIdByName(follower);
  follower_id = follower_id[0].id;

  if (await db.checkUserIsFollowing(user_id, follower_id)) {
    await db.unfollowUser(user_id, follower_id);
    return res.status(200).json({ msg: `Você deixou de seguir ${user}` });
  } else {
    await db.followUser(user_id, follower_id);
    return res.status(200).json({ msg: `Você está seguindo ${user}` });
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
routes.post("/get-followers-list", async (req, res) => {
  const { user } = req.body;
  let user_id = await db.getUserIdByName(user);
  user_id = user_id[0].id;
  try {
    let followers = await db.getFollowersList(user_id);
    followers = followers.map((follower) => {
      return follower.nickname;
    });
    return res.status(200).json(followers);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

export default routes;