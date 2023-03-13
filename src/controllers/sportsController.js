import db from "../services/sportsService.js";
import express from "express";

const routes = express.Router()

routes.post('/insert', async (req, res) => {
    const { user_id, sport_id } = req.body;
    const checkExistingInfo = await db.checkUserPracticesSport(user_id, sport_id)
    try {
        if (checkExistingInfo.length) {
            await db.deleteSportPracticed(user_id, sport_id)
            return res.status(200).json({msg: 'Esporte removido'})
        }
        else {
            await db.insertSportPracticed(user_id, sport_id)
            return res.status(200).json({msg: 'Esporte adicionado'})
        }
    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
})

routes.get('/get-sports', async (req, res) => {
    try {
        const data = await db.getSports()
        return res.status(200).json(data)
    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
})

routes.get('/get-sports-practiced/:id', async (req, res) => {
    const user_id = req.params.id
    try {
        const results = await db.getSportsPracticed(user_id)
        return res.status(200).json(results)
    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
})

export default routes