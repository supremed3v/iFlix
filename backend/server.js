import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db.js'
import movieRoute from './routes/moviesRoute.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config()

const app = express()

connectDB()
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cookieParser())
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(express.static(__dirname + './public/videos'))




app.use('/api', movieRoute)


process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err)
    console.log('uncaughtException', err.stack)
    process.exit(1)
})
const port = process.env.PORT

const server = app.listen(port, () => {
    console.log('Server is running on port 3000')
})


process.on("unhandledRejection", (err) => {
    console.log('unhandledRejection', err)
    server.close(() => {
        process.exit(1)
    }
    )
})
