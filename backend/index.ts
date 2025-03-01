import "dotenv"
import express, { type Request, type Response } from "express"
import cors from "cors"
import mongoose from "mongoose"
import { loginController } from "./controller/authController"



const main = async () => {

    const app = express()

    app.use(express.json())
    app.use(cors())

    const PORT = process.env.PORT || 3000


    app.post("/api/login", loginController)


    app.get("/health", async (req: Request, res: Response): Promise<any> => {
        try {

            return res.status(200).json({
                message: "Ok"
            })


        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: "Something went wrong"
            })
        }
    })

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })


}


const connectDB = async () => {

    mongoose.connect(process.env.DB ?? "")
        .then(() => console.log('DB Connected!'))
        .then(() => {
            main().catch(err => console.error(err))
        })
}

connectDB()



