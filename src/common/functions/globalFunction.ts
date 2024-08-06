import { UserDto } from './../../modules/user/dto/user.dto';
import { NotFound, BadRequest, Unauthorized } from "http-errors";
import { IUser, UserModel } from "./../../modules/user/model/user.model";
import { AuthMessageError, NotFoundError } from "../enums/message.enum";
import { Request, Response, NextFunction } from "express";
import moment from "moment-jalali"
import * as Jwt from "jsonwebtoken";
import { isMongoId } from "class-validator";
import { BlogModel, IBlog } from "./../../modules/blog/model/blog.model";
import { CourseModel, ICourse } from "./../../modules/course/model/course.model";
import { ServiceUnavailable } from "http-errors"
import { TypeLike } from "../enums/global.enum";

async function checkRole(req: Request & { user: string }, role: Array<string>) {
    const userID = req?.user
    const userRepository = UserModel<IUser>
    const findUser: IUser = await userRepository.findOne({ _id: userID })
    if (!findUser) throw NotFound(AuthMessageError.NotFound);
    const Role = findUser.Role;
    for (var i = 0; i < role.length; i++) {
        if (!Role.includes(role[i])) {
            throw Unauthorized("شما به این آدرس دسترسی ندارید")
        }
    }
}

function randomNumber() {
    return "" + Math.floor(Math.random() * 90000 + 10000);
}

function invoiceNumberGenerator(): string {
    return (
        moment().format("jYYYYjMMjDDHHmmssSSS") +
        String(process.hrtime()[1]).padStart(9)
    );
}

// async function VerifyRefreshToken(token : string) {
//     const verifyUser: TTokenPayload = Jwt.verify(token, process.env.SECRET_KEY_TOKEN) as TTokenPayload;
//     const user: IUser = await UserModel.findOne({ _id: verifyUser.userId }, { _id: 1 })
//     return user._id
// }

function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        Jwt.verify(token, process.env.SECRET_KEY_TOKEN, async (err, payload) => {
            if (err)
                reject(Unauthorized("وارد حساب کاربری خود شوید"));
            const { userId } = payload || {};
            const user = await UserModel.findOne({ _id: userId }, { password: 0, otp: 0 });
            if (!user) reject(Unauthorized("حساب کاربری یافت نشد"));
            resolve(userId);
        });
    });
}

async function verifyToken(req: Request & { user: IUser }, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) return next(Unauthorized("دوباره تلاش کنید"));
    const authorization: string = req.headers["authorization"];
    console.log(`authorization ${authorization}`);
    const token = authorization.split(" ")[1];
    console.log(`token ${token}`);
    if (token) {
        const userId = await VerifyRefreshToken(token)
        console.log(`userID: ${userId}`);
        const user: IUser = await UserModel.findOne({ _id: userId }, { _id: 1 })
        if (!user) return Unauthorized("کاربری یافت نشد");
        req.user = user._id
        return next();
    } else {
        throw Unauthorized("لاگین کنید")
    }

}

async function relatedFunc(model, id: string) {
    let allBlog = await model.find({ category: model.category });
    let relates = [];
    for (let i = 0; i < allBlog.length; i++) {
        const oneblog = allBlog[i]
        if (!(oneblog['_id'] == id)) {
            relates.push(allBlog[i])
        }
    }
    return relates
}

function copyObject(object: object) {
    return JSON.parse(JSON.stringify(object));
}

function validateObjectID(id: string) {
    if (!isMongoId(id)) throw BadRequest("شناسه ی کاربر اشتباه میباشد")
}

async function like(ID: string, userID: string, type: TypeLike) {
    validateObjectID(ID)
    validateObjectID(userID)
    const findUser = await UserModel.findOne({ _id: userID })
    if (!findUser) throw NotFound("کاربری یافت نشد")
    let findCourseOrBlog: IBlog | ICourse
    switch (type) {
        case TypeLike.blog:
            findCourseOrBlog = await BlogModel.findOne({ _id: ID, like: userID })
            break;
        case TypeLike.course:
            findCourseOrBlog = await CourseModel.findOne({ _id: ID, like: userID })
            break;
    }
    let optionCourseOrBlog: object = findCourseOrBlog
        ? { $pull: { likes: findUser._id } }
        : { $push: { likes: findUser._id } };
    let message: string
    if (!findCourseOrBlog) {
        message = "به علاقه مندی شما اضافه کردید";
    } else message = "از علاقه مندی های شما حذف گردید"
    const update = await findCourseOrBlog.updateOne({ _id: ID }, optionCourseOrBlog)
    if (update.modifiedCount == 0) throw ServiceUnavailable("سرور با مشکل مواجه شده است دوباره تلاش کنید")
    return { message }
}

async function matchLikeUser(user: IUser) {
    let copyUser = copyObject(user)
    copyUser["likes"] = { blog: copyUser.listLikeBlog, course: copyUser.listLikeCourse }
    delete copyUser.listLikeCourse
    delete copyUser.listLikeBlog
    return copyUser
}


export {
    invoiceNumberGenerator,
    checkRole,
    verifyToken,
    randomNumber,
    relatedFunc,
    copyObject,
    validateObjectID,
    VerifyRefreshToken,
    like,
    matchLikeUser
}