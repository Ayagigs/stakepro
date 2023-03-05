import express from "express"
import userRouter from "./routes/user.route"
import errorMiddleware from "./middleware/error.middleware"
import { connectDB } from "./config"
import passport from "passport";

const app = express()

const port = 8080
const path = "/api/v1"
connectDB()

app.use(express.json())
app.use(passport.initialize());


// add routes here
app.use(`${path}/user`, userRouter)



app.use(errorMiddleware)

app.listen(port, () => console.log(`🐉 server running of port ${port} 🐉`))