import type { CookieOptions, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library"
import { UserModal } from "../schema/user";

import { uniqueNamesGenerator, NumberDictionary, animals } from 'unique-names-generator';
import { createAndSendToken } from "./tokenUtils";

const auth = new OAuth2Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    projectId: process.env.PROJECT_ID,
})



export const loginController = async (req: Request, res: Response): Promise<any> => {
    try {

        const { token } = req.body

        if (!token) {
            return res.status(400).json({
                message: "Token is required"
            })
        }

        const parsedToken = await auth.verifyIdToken({
            audience: process.env.CLIENT_ID,
            idToken: token
        })

        const userData = parsedToken.getPayload()

        if (!userData!.email_verified) {
            return res.status(400).json({
                message: "Email not verified from google, Kindly get it verified or use a different email id"
            })
        }

        const email = userData!.email

        const user = await UserModal.findOne({ email })

        if (!user) {
            // new user found!!.
            const numberDictionary = NumberDictionary.generate({ min: 0, max: 99999 });
            const username: string = uniqueNamesGenerator({
                dictionaries: [[email!.split("@")[0]], animals, numberDictionary],
                length: 3,
                separator: '',
                style: 'capital'
            });

            const newUser = new UserModal({ email, lastLogin: new Date(), name: userData!.name, profilePhoto: userData!.picture, username })

            await newUser.save()

            const token = await createAndSendToken(newUser.toObject())

            const cookieOptions: CookieOptions = {
                expires: new Date(
                    Date.now() + 100 * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
            };

            if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

            res.cookie("bete", token, cookieOptions);

            return res.status(201).json({
                token,
                user: newUser
            })
        } else {
            const token = await createAndSendToken(user.toObject())

            const cookieOptions: CookieOptions = {
                expires: new Date(
                    Date.now() + 100 * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
            };

            if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

            res.cookie("bete", token, cookieOptions);

            return res.status(200).json({
                token,
                user
            })
        }


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

