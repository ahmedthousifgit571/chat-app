import express from 'express'
const router = express.Router()

import { signUp,logIn,logout,updateProfile } from '../controllers/auth.controller.js'
import { protectedRoute } from '../middlewares/auth.middleware.js'

router.post("/signup",signUp)

router.post("/login",logIn)

router.post("/logout", logout) 

router.put("/updateprofile",protectedRoute,updateProfile)

export default router