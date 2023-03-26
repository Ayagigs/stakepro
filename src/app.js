import express from "express"
import userRouter from "./routes/user.route"
import errorMiddleware from "./middleware/error.middleware"
import { connectDB } from "./config"
import adminRouter from "./routes/admin.route"
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc"
// import path from 'path'


const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'StakePro API',
            version: '1.0.0'
        },
        servers: [
            {
             url: 'http://localhost:8080'
            } 
        ]
    },
    apis: ['app.js']
}

const swaggerSpec = swaggerJSDoc(options)

const app = express() 

const port = 8080
const pathUrl = "/api/v1"
connectDB()

app.use(express.json())
// app.use(express.static(path.join(__dirname, './public')))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// add routes here
app.use(`${pathUrl}/user`, userRouter)

/**
 * @swagger
 * /api/v1/admin
 * get:
 * 
 */
app.use(`${pathUrl}/admin`, adminRouter)



app.use(errorMiddleware)

app.listen(port, () => console.log(`🐉 server running of port ${port} 🐉`))