import express from "express";
import db from '../services/reportService.js';

const routes = express.Router();

routes.post("/create-complaint", async (req, res) => {
  const { post_id, user_id, motive } = req.body;

  try {
    await db.createComplaint(post_id, user_id, motive)
    return res.status(200).json({ msg: "Denuncia enviada com sucesso!" });

  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
})

routes.get("/get-all-complaints", async (req, res) => {
  try {
    const results = await db.getAllComplaints()
    return res.status(200).json(results);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
})

export default routes