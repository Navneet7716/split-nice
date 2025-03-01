import { Router } from "express"
import { isLoggedIn, login } from "../controller/authController"

export const AuthRouter = Router()

AuthRouter.post("/login", login)
AuthRouter.get("/is-logged-in", isLoggedIn)
