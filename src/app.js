import express from "express"
import userRouter from "./routes/user.route"
import faqRouter from "./routes/faq.route"

import errorMiddleware from "./middleware/error.middleware"
import { connectDB } from "./config"

const app = express()

const port = 8080
const path = "/api/v1"
connectDB()

app.use(express.json())

// add routes here
app.use(`${path}/user`, userRouter)
app.use(`${path}/faq`, faqRouter)


app.use(errorMiddleware)

app.listen(port, () => console.log(`🐉 server running of port ${port} 🐉`))