import express from 'express'
import moment from 'moment';
import db from '../services/authService.js'
import { createProfile } from "../services/profileService.js";
import bcrypt from "bcrypt";
import { getProfileImg } from '../services/profileService.js';
import { getProfileInfo } from '../services/profileService.js';

const routes = express.Router();

// user/create-user
routes.post("/create-user", async (req, res) => {
  const { nickname, email, password, birthday, phoneNumber } = req.body;

  if (!nickname || !email || !password || !birthday) return res.status(400).json({ msg: "Insira todos os dados!" });

  let isDateValid = moment(birthday).isValid()

  if (!isDateValid) return res.status(400).json({ msg: 'Data inválida' })

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

      let user_id = await db.getUserIdByEmail(email);
      user_id = user_id.map((i) => {return i.id})[0]

      await createProfile(user_id)

      return res.status(201).json({
        msg: "Usuario cadastrado com sucesso"
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

  if (!email || !password) return res.status(401).json({ msg: "Insira todos os dados!" });

  // search for the user in the database
  const user = await db.login(email);

  // case the user is not found in the database
  if (!user.length) return res.status(401).json({ msg: "Usuario não encontrado" });

  // checks the password
  const userPassword = user[0].password;
  const isPasswordCorrect = bcrypt.compareSync(password, userPassword);
  if (!isPasswordCorrect) return res.status(401).json({ msg: "Senha ou email incorretos" });
  let profileData = await getProfileInfo(user[0].id)
  // let nickname = await db.getNicknameByEmail(email)
  // nickname = nickname.map((i) => {return i.nickname})[0]

  // let user_id = await db.getUserIdByEmail(email)
  // user_id = user_id.map((i) => {return i.id})[0]

  // let profileImage = await getProfileImg(user_id)
  // profileImage = profileImage.map((i) => {return i.profileImage})[0]

  profileData = profileData.map((i) => {
    return {
      user_id: i.user_id,
      nickname: i.nickname,
      profileImage: i.profileImage
    }
  })
  let user_id = profileData[0].user_id
  let nickname = profileData[0].nickname
  let profileImage = profileData[0].profileImage
  return res.status(200).json({
    msg: "Usuario logado com sucesso",
    user_id,
    nickname,
    profileImage
  });
});

export default routes;
