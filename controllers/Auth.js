import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) {
            return res.json(err)
        }

        if (data.length) {
            return res.status(409).json("User is exsisted!")
        }

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);


        const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
        db.query(q, [req.body.username, req.body.email, hash], (err, data) => {
            if (err) return res.json(err)

            return res.status(200).json("User has been created!")
        })
    })
}

export const Login = (req, res) => {
    const q = "SELECT * FROM USERS WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("User Not Found")

        if (!bcrypt.compareSync(req.body.password, data[0].password)) {
            return res.status(401).json("Wrong Password")
        }


        const token = jwt.sign({ id: data[0].id }, "kuncijwt")

        const { password, ...other } = data[0]

        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        }).status(200).json(other)
    })
    console.log("Token : " + req.cookies.access_token);
}

export const Logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out")
}
