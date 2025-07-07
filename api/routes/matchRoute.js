import express from 'express'
import { protectRoute } from '../middleware/auth.js'
import { getMatches, getUserProfiles, swipeLeft, swipeRight } from '../controllers/matchController.js'

const matchRoute = express.Router()

matchRoute.post('/swipe-right/:likedUserId',protectRoute,swipeRight)
matchRoute.post('/swipe-left/:dislikedUserId',protectRoute,swipeLeft)

matchRoute.get('/',protectRoute,getMatches)
matchRoute.get('/user-profiles',protectRoute,getUserProfiles)

export default  matchRoute

