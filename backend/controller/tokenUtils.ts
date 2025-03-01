import type { User } from "../schema/user";
import * as jwt from "jsonwebtoken"

const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: "2d",
    });
};


export const createAndSendToken = async (user: User): Promise<string> => {
    const token = signToken(user._id!);

    return token

}