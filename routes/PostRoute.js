import express from "express"
import { publishPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/Posts.js"
import { authMiddleware } from "../middleware/AuthMiddleware.js"

const router = express.Router()

router.get("/", getAllPosts)
router.get("/:id", getPostById)
router.post("/", authMiddleware, publishPost)
router.delete("/delete/:id", authMiddleware, deletePost)
router.put("/update/:id", authMiddleware, updatePost)

export default router