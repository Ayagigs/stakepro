import express from 'express';
import userRouter from "./routes/user.route"
import faqRouter from "./routes/faq.route"
import errorMiddleware from "./middleware/error.middleware"
import { connectDB, PORT } from "./config"
import passport from "passport";
import adminRouter from "./routes/admin.route"
import postRouter from "./routes/post.route";
// import newsRouter from "./routes/newsletter.route.js";
import supportRouter from "./routes/support.route.js";


const app = express()

const port = PORT || 8080
const path = "/api/v1"
connectDB()

app.use(express.json())
app.use(passport.initialize());


// add routes here
app.use(`${path}/user`, userRouter)
app.use(`${path}/admin`, adminRouter)
app.use (`${path}/post`, postRouter);
// app.use (`${path}/newsletter`, newsRouter)
app.use (`${path}/support`, supportRouter)
app.use(`${path}/faq`, faqRouter)


app.use(errorMiddleware)

app.listen(port, () => console.log(`🐉 server running of port ${port} 🐉`));