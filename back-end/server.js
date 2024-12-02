import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

import userRoutes from "./routes/UserRoute.js"
import postRoutes from "./routes/PostRoute.js"
import authRoutes from "./routes/AuthRoute.js"


const app = express();
app.use(express.json())

app.use(cors(
    {
        // Domain front-end
        origin: "http://127.0.0.1:5173",
        credentials: true,
    }
))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(8800, () => {
    console.log("Connected in port 8800");
})

