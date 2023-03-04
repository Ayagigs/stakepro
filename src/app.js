import express from "express"
import userRouter from "./routes/user.route"
import errorMiddleware from "./middleware/error.middleware"
import postRouter from "./routes/postroute.js";
const app = express();

const port = 8080;
const path = "/api/v1";

app.use(express.json());

// add routes here
app.use(`${path}/user`, userRouter);
app.use (`${path}/post`, postRouter);


app.use(errorMiddleware)

app.listen(port, () => console.log(`🐉 server running of port ${port} 🐉`))