import mongoose from "mongoose"
const Schema = mongoose.Schema;

export type User = {
    username: string,
    email: string,
    name: string
    profilePhoto: string,
    lastLogin: Date,
    _id?: string
}



const User = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    profilePhoto: String,
    lastLogin: "Date"
}, { timestamps: true });



export const UserModal = mongoose.model('User', User);