import { MulterFile } from "src/modules/fileupload";
import { UserModel } from "../../modules/user/model/user.model"

declare global {
    namespace Express {
        interface Request {
            user?: UserModel;
            file?: MulterFile[]
        }
    }
}