import express from 'express'
const router = express.Router()

import { signUp,logIn,logout } from '../controllers/auth.controller.js'

router.post("/signup",signUp)

router.post("/login",logIn)

router.post("/logout", logout) 

export default router