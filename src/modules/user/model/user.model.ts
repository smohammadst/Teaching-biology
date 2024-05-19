import mongoose from 'mongoose'

interface IUser extends mongoose.Document {
    first_name: string,
    last_name: string,
    email?: string,
    phone: string
}

const userSchema = new mongoose.Schema<IUser>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("user", userSchema)

export {
    UserModel,
    IUser
} 