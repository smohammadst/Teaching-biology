import { UserModel } from "../../modules/user/model/user.model"

declare global {
    namespace Express {
        interface Request {
            user?: UserModel;
        }
    }
}