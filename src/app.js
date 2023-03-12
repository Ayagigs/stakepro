import express from "express"
import userRouter from "./routes/user.route.js"
import errorMiddleware from "./middleware/error.middleware.js"
import postRouter from "./routes/postroute.js";
import newsRouter from "./routes/newsletterroute.js";
import supportRouter from "./routes/supportroute.js";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
dbConnect();
dotenv.config();

const app = express();
const port = 8080;
const path = "/api/v1";

app.use(express.json());

// add routes here
app.use(`${path}/user`, userRouter);
app.use (`${path}/post`, postRouter);
app.use (`${path}`, newsRouter)
app.use (`${path}/support`, supportRouter)


app.use(errorMiddleware)

app.listen(port, () => console.log(`🐉 server running of port ${port} 🐉`));