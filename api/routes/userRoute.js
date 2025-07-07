import express from 'express'
import { protectRoute } from '../middleware/auth.js'
import { updateProfile } from '../controllers/userController.js'

const userRoute = express.Router()

userRoute.put('/update',protectRoute,updateProfile)

export default  userRoute

