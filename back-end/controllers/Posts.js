import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getAllPosts = (req, res) => {
    const category = req.query.category || ""
    const limit = parseInt(req.query.limit) || 10
    const page = req.query.page || 1

    const offset = (page - 1) * limit

    let q = "SELECT * FROM posts "

    if (category) {
        q += "WHERE category = ? LIMIT ? OFFSET ?"

        db.query(q, [category, limit, offset], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.length < 1) return res.status(404).json("Category Is Not Available")

            return res.status(200).json(data)
        })

    } else {
        q += "LIMIT ? OFFSET ? "
        db.query(q, [limit, offset], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.length < 1) return res.status(404).json("No Post Available")

            return res.status(200).json(data)
        })
    }
}

export const getPostById = (req, res) => {
    const q = "SELECT u.username, p.* FROM `posts` p JOIN `users` u ON u.id = p.uid WHERE p.id = ?"

    db.query(q, [parseInt(req.params.id)], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length < 1) return res.status(404).json("Post not found")

        return res.status(200).json(data)
    })
}

export const publishPost = (req, res) => {
    const q = "INSERT INTO posts (title, description, category, img, date, uid) VALUES (?, ?, ?, ?, ?, ?)"

    let currentTime = new Date();

    let year = currentTime.getFullYear();
    let month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    let day = currentTime.getDate().toString().padStart(2, '0');

    let hours = currentTime.getHours().toString().padStart(2, '0');
    let minutes = currentTime.getMinutes().toString().padStart(2, '0');
    let seconds = currentTime.getSeconds().toString().padStart(2, '0');

    let mysqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    db.query(q, [req.body.title, req.body.description, req.body.category, req.body.img, mysqlDatetime, req.data.id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json({ msg: "Post has been published", id: data.insertId })
    })
}

export const deletePost = (req, res) => {
    const q = "DELETE FROM posts WHERE id = ? AND uid = ?"

    db.query(q, [req.params.id, req.data.id], (err, data) => {
        if (err) return res.status(500).json(err)

        if (data.affectedRows > 0) {
            return res.status(200).json("Post has been deleted");
        } else {
            return res.status(404).json({ error: "Post not found or id does not match" });
        }
    })
}

export const updatePost = (req, res) => {
    const q = "UPDATE posts SET title = ?, description = ?, category = ?, img = ?, date = ? WHERE id = ?"

    let currentTime = new Date();

    let year = currentTime.getFullYear();
    let month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    let day = currentTime.getDate().toString().padStart(2, '0');

    let hours = currentTime.getHours().toString().padStart(2, '0');
    let minutes = currentTime.getMinutes().toString().padStart(2, '0');
    let seconds = currentTime.getSeconds().toString().padStart(2, '0');

    let mysqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    db.query(q, [req.body.title, req.body.description, req.body.category, req.body.img, mysqlDatetime, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Post has been updated")
    })
}