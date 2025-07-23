import { Router } from 'express'
import { Signup } from '../Db/Controllers/Auth/Signup.js'
import { SignIn } from '../Db/Controllers/Auth/SignIn.js'
import { Signout } from '../Db/Controllers/Auth/Signout.js'

export const UserRouter = Router()
UserRouter.post('/Signup', Signup)
UserRouter.get('/Login', SignIn)
UserRouter.get('/Signout', Signout)
