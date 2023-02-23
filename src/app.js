import express from "express"
import userRouter from "./routes/user"
import errorMiddleware from "./middleware/error.middleware"
const app = express()

const port = 8080
const path = "/api/v1"

app.use(express.json())
app.use(`${path}/user`, userRouter)
app.use(errorMiddleware)

app.listen(port, () => console.log(`🐉 server running of port ${port} 🐉`))