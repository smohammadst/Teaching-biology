import mongoose, { ObjectId } from 'mongoose'

interface IUser extends mongoose.Document {
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string,
    otp?: { code: string, expiresIn: number },
    bought?: Array<ObjectId>,
    listLikeBlog?: Array<ObjectId>,
    listLikeCourse?: Array<ObjectId>,
    isvalidateMobile?: boolean,
    isValidateEmail?: boolean,
    Role: Array<string>
}


const userSchema = new mongoose.Schema<IUser>({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
    otp: { type: Object },
    bought: { type: [mongoose.Types.ObjectId] },
    listLikeBlog: { type: [mongoose.Types.ObjectId], ref: "blog" },
    listLikeCourse: { type: [mongoose.Types.ObjectId], ref: "course" },
    isvalidateMobile: { type: Boolean, default: false },
    Role: { type: [String], default: ["USER"] }
});

const UserModel = mongoose.model<IUser>("user", userSchema)

export {
    UserModel,
    IUser
} 