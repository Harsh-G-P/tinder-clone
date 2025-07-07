import express from 'express'
import { protectRoute } from '../middleware/auth.js'
import { getConversation, sendMessage } from '../controllers/messageController.js'

const messageRoute = express.Router()

messageRoute.use(protectRoute)

messageRoute.post('/send',sendMessage)
messageRoute.get('/conversation/:userId',getConversation)

export default messageRoute

