import mongoose, { ObjectId } from 'mongoose'

interface IUser extends mongoose.Document {
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string,
    password?: string,
    otp?: { code: string, expiresIn: number },
    bascket?: Array<ObjectId>,
    listLikeBlog?: Array<ObjectId>,
    listLikeCourse?: Array<ObjectId>,
    isvalidateMobile?: boolean,
    isValidateEmail?: boolean,
    Role: Array<string>
}

export type Tuser = {
    id: string
}

const userSchema = new mongoose.Schema<IUser>({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    otp: { type: Object },
    bascket: { type: [mongoose.Types.ObjectId] },
    listLikeBlog: { type: [mongoose.Types.ObjectId] },
    listLikeCourse: { type: [mongoose.Types.ObjectId] },
    isvalidateMobile: { type: Boolean, default: false },
    Role: { type: [String], default: ["USER"] }
});

const UserModel = mongoose.model<IUser>("user", userSchema)

export {
    UserModel,
    IUser
} 