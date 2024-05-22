import mongoose, { ObjectId } from 'mongoose'

interface IUser extends mongoose.Document {
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string,
    password?: string,
    otp?: { code: number, expiresIn: number },
    bascket?: Array<ObjectId>,
    listLikeBlog?: Array<ObjectId>,
    listLikeCourse?: Array<ObjectId>,
    isvalidateMobile?: boolean,
    isValidateEmail?: boolean
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
    isvalidateMobile: { type: Boolean, default: false }

});

const UserModel = mongoose.model<IUser>("user", userSchema)

export {
    UserModel,
    IUser
} 