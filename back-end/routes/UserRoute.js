import express from "express"
import { ShowUser } from "../controllers/Users.js"

const router = express.Router()

router.post("/", ShowUser)

export default router