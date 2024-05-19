import { IUser, UserModel } from "./model/user.model";
import { UserDto } from "./dto/user.dto";
class UserService {

    private readonly userModel = UserModel<IUser>

    async create(user: UserDto) {
        const newUser = new this.userModel
        newUser.first_name = user.first_name
        newUser.last_name = user.last_name
        newUser.phone = user.phone
        newUser.email = user.email
        await newUser.save()
        return this.userModel.find({})
    }
}
const UserServices = new UserService()
export {
    UserServices as UserService
}