import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

//routes
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import matchRoute from './routes/matchRoute.js'
import messageRoute from './routes/messageRoute.js'

//connection 
import { connectDB } from './config/db.js'

import { initializeSocket } from './socket/socket.server.js'

dotenv.config()

const app= express()


const port = process.env.PORT || 3001


initializeSocket(httpServer)

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true,
}))

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/matches',matchRoute)
app.use('/api/messages',messageRoute)


app.listen(port,()=>{
    console.log('Server Started at this port 😸:' + ' ' + port)
    connectDB()
})