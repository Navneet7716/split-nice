import "dotenv"
import express, { type Request, type Response } from "express"
import cors from "cors"
import mongoose from "mongoose"
import { AuthRouter } from "./routes/auth.routes"
import cookieParser from 'cookie-parser';


const main = async () => {

    const app = express()

    app.use(express.json())
    app.use(cors())
    app.use(cookieParser());

    const PORT = process.env.PORT || 3000

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

    app.use("/api/auth", AuthRouter)

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



