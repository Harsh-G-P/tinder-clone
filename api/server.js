import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import {createServer} from 'http'

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

const httpServer = createServer(app)

const port = process.env.PORT || 3001

const __dirname = path.resolve()

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"/client/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    })
}


httpServer.listen(port,()=>{
    console.log('Server Started at this port 😸:' + ' ' + port)
    connectDB()
})