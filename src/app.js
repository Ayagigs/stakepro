import express from "express"
import userRouter from "./routes/user"
const app = express()

const port = 8080
const path = "/api/v1"

app.use(`${path}/user`, userRouter)
app.listen(port, () => console.log(`🐉 server running of port ${port} 🐉`))