export enum AuthMessageError {
    Confirm = "کابری با این مشخصات وجود دارد",
    NotFound = "کاربری یافت نشد",
    UnauthorizedPassword = "نام کاربری یا رمز ورود اشتباه می باشد",
    UnauthorizedEmailAndPhone = "اعتبار سنجی ایمیل یا شماره تماس را انجام نداده ایید",
    UnauthorizedCode = "کد وارد شده اشتباه میباشد",
    UnauthorizedExpires = "کد وارد شده منقضی شده است"
}

export enum GlobalMessageError {
<<<<<<< HEAD
    ServiceUnavailable = "سرور با مشکل مواجه شده است دوباره تلاش کنید"
}
=======
    InternalServerError = "سرور با مشکل مواجه شده است دوباره تلاش کنید",
}

export enum NotFoundError {
    NotFoundBlog = "مقاله ی مورد نظر یافت نشد",
    NotFoundCourse = "ویدیو ی آموزشی مورد نظر یافت نشد",
    NotFoundComment = "کامنت مورد نظر یافت نشد"
}
>>>>>>> b8722dcbd051716122d3670a41bb8ec241073f2c
