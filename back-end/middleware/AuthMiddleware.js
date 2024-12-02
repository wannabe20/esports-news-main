import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not Authenticated")

    jwt.verify(token, "kuncijwt", (err, data) => {
        if (err) return res.status(403).json("Token is not valid!")
        req.data = data

        next()
    })
}