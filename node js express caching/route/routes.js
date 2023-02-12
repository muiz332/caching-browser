import express from 'express'
import { notif } from '../controllers/controllers.js'

const router = express.Router()

router.get("/notif",notif)
router.post("/notif",notif)

export default router